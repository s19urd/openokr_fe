<template>
  <div class="dailyDashboard">
    <div class="tab-wrap text-center">
      <el-radio-group v-model="pageType" change="changePage">
        <el-radio-button
          v-for="item in pageTypeOptions"
          :label="item.type"
          :key="item.type">{{item.name}}</el-radio-button>
      </el-radio-group>
    </div>
    <div class="tab-wrap">
      <div class="releatedTeam">
        <span>关联团队：</span>
        <el-select v-model="selectedTeamId">
          <el-option
            v-for="item in teamList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </div>
    
      <el-radio-group v-model="searchType" size="small">
        <el-radio-button
          class="radio-sty2"
          v-for="item in searchTypeOptions"
          :label="item.type"
          :key="item.type">
          {{item.name}}
        </el-radio-button>
      </el-radio-group>

      <span class="d2-ml-20">
         当前统计周期：
        <el-select v-model="reportStartDateStr" @change="changeStartDate">
          <el-option
            v-for="item in reportStartDateStrOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </span>
    </div>
    <div class="tab-content-wrap" v-loading="tabLoading"  element-loading-text="加载中">
      <statistic-by-member ref="statisticByMember" v-show="pageType==='1'"></statistic-by-member>
      <statistic-by-product ref="statisticByProduct" v-show="pageType==='2'" :search-keys="searchKeys"></statistic-by-product>
    </div>
  </div>
</template>
<script>
  import util from '@/libs/util.js'
  import StatisticByProduct from "./components/StatisticByProduct";
  import StatisticByMember from "./components/StatisticByMember";

  export default {
    name: "Dashboard",

    components: {
      StatisticByProduct,
      StatisticByMember,
    },

    data() {
      return {
        //页面类型
        pageTypeOptions:[
          {name:'按人员所属', type:'1',show:true},
          {name:'按产品类别', type:'2',show:true},
          // {name:'按项目任务', type:'3',show:false},
          // {name:'按客户规模', type:'4',show:false}
        ],
        pageType:'1',
        searchTypeOptions:[
          {name:'周', type:'0'},
          {name:'月', type:'1'},
          {name:'年度', type:'2'},
        ],
        searchType:'0',
        reportStartDateStr:'',
        reportStartDateShow:'',
        weekSearchType:'1',
        tabLoading:false,
        searchKeys: {},
        selectedTeamId: '',
        teamList: [{ id: '4ef00cb7ad60418ba02a5ddc16abb74b', name: 'test team'}]
      };
    },
    computed:{
      reportStartDateStrOptions(){
        let _options = [];
        let _optionsCount = 5;
        let {monday,monthStart,yearStart} = this.weekInfo();
        switch (this.searchType) {
          case "0":
            //按周
            function getLabelName(date){
              let _date = new Date(util.dateFormat(date,'yyyy-MM-dd'));
              let number_CN = ['一','二','三','四','五','六','七'];
              let month = _date.getMonth();
              let weekIndex = -1;
              while (_date.getMonth()==month){
                _date.setDate(_date.getDate()-7);
                weekIndex++;
              }
              return (month+1)+'月份第'+ number_CN[weekIndex] +'周';

            };
            let labelName = '';
            for(let i=0;i<_optionsCount;i++){
              let _mondayStr = util.dateFormat(monday,'yyyy-MM-dd');
              let dataregenStr =' (' + util.dateFormat(monday,'MM/dd') +'-'+ util.dateFormat(new Date(monday).setDate(monday.getDate()+6),'MM/dd') + ')'
              if(i==0){
                labelName = '本周'+ dataregenStr;
              }else if(i==1){
                labelName = '上周'+ dataregenStr;
              }else {
                labelName = getLabelName(monday) + dataregenStr;
              }
              _options.push({
                label:labelName,
                value: _mondayStr
              });
              monday.setDate(monday.getDate()-7);
            }
            break;
          case "1":
            //按月份
            let year = monthStart.getFullYear();
            for(let i=0;i<_optionsCount;i++){
              let yearItem = monthStart.getFullYear();
              let monthItem = monthStart.getMonth()+1;
              let labelName = year===yearItem ? (monthItem+'月份'):(yearItem+'年'+monthItem+'月份');
              _options.push({
                label:labelName,
                value:  util.dateFormat(monthStart,'yyyy-MM-dd')
              });
              monthStart.setMonth(monthStart.getMonth()-1);
            }
            break;
          case "2":
            for(let i=0;i<_optionsCount;i++){
              let year = yearStart.getFullYear();
              _options.push({
                label:year+'年',
                value:  util.dateFormat(yearStart,'yyyy-MM-dd')
              });
              yearStart.setFullYear(year-1);
            }

        }
        //切换之后设置默认选择第一个
        if(this.searchType==='0'){
          this.reportStartDateStr =_options.length>0 ? (_options[1].value||''):'';
          this.reportStartDateShow = _options.length>0 ? (_options[1].label||''):''
        }else{
          this.reportStartDateStr =_options.length>0 ? (_options[0].value||''):'';
          this.reportStartDateShow = _options.length>0 ? (_options[0].label||''):''
        }

        return _options;
      }
    },
    watch:{
      pageType (){
        this.getData()
      },
      reportStartDateStr(){
        this.getData()
      }
    },
    methods: {
      weekInfo() {
        let today = new Date();
        let monday = new Date();
        let sunday = new Date();
        let monthStart = new Date(today.getFullYear()+'/'+ (today.getMonth()+1)+'/1');
        let yearStart = new Date(today.getFullYear()+'/1/1');
        monday.setDate(today.getDate() - (today.getDay()-1));
        sunday.setDate(today.getDate() + (7- today.getDay()));
        return {
          today,
          monday,
          sunday,
          monthStart,
          yearStart
        }
      },
      getSearchParam(){
        this.searchKeys = {
          teamId: this.selectedTeamId,
          searchType: this.searchType,
          reportStartDateStr: this.reportStartDateStr,
          reportStartDateShow: this.reportStartDateShow
        }
        return {
          teamId: this.selectedTeamId,
          searchType:this.searchType,
          reportStartDateStr:this.reportStartDateStr,
          reportStartDateShow:this.reportStartDateShow
        }
      },
      //切换区间
      changeStartDate(val){
        this.reportStartDateStrOptions.map(item=>{
          if(val === item.value){
            this.reportStartDateShow = item.label;
          }
        })
      },
      //获取数据
      getData(){
        this.$nextTick(()=>{
          this.tabLoading = true; 
          let vo = this.getSearchParam();
          if(this.pageType==='1'){
            this.$refs.statisticByMember.getData(vo).then(res=>{
              this.tabLoading = false;
            }).catch(e=>{
              this.tabLoading = false;
              this.$message.error(`数据获取失败！`)
            });
          }else if(this.pageType==='2'){
            this.$refs.statisticByProduct.getData(vo).then(res=>{
              this.tabLoading = false;
            }).catch(res=>{
              this.tabLoading = false;
              this.$message.error(`数据获取失败！`)
            });
          }
        })
      },
    },
    mounted () {
      this.selectedTeamId = this.teamList[0].id
    }
  };
</script>

<style lang="scss">
  .dailyDashboard{
    background: #fff;
    min-height: 500px;
    padding: 0 10px;
  }
  .tab-wrap{
    padding: 20px 0;
    font-size: 14px;

    .el-radio-button__inner {
      padding-top: 12px;
      padding-bottom: 12px;
    }
  }
  .text-center{
    text-align: center;
  }
  .radio-sty2{
    width: 80px;
    input{
      width: 100%;
    }
    span{
      width: 100%;
    }
  }
  .tab-content-wrap{
    min-height: 400px
  }
  .change-btn{
    font-size: 12px;
    font-weight: normal;
    display: inline-block;
    background: #409EFF;
    color: #fff;
    border-radius: 6px;
    margin-left: 10px;
    padding: 0 8px;
    line-height: 20px;
  }
  .echart-sty1{
    border: #ccc solid 1px;
    padding: 20px;
    margin-right: 20px;
  }
  .releatedTeam {
    display: inline-block;
    margin-right: 20px;
  }

</style>

