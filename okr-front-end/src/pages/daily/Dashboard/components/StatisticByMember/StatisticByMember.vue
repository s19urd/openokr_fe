<template>
  <div>
    <div class="tab-content">
      <el-row>
        <el-col :span="12"  style="padding: 20px">
          <el-table
            header-row-class-name="gray"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="orgName"
              label="部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="orgUserNum"
              label="人数">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="工时">
            </el-table-column>
            <el-table-column
              prop="percentage"
              label="工时占比">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" style="position: relative;">
          <div class="echart-pie-total">
            <span class="s-title">总工时</span>
            <span class="title">{{totalDuration}}h</span>
          </div>
          <div class="echart-sty1" id="echart-pie"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import util from '@/libs/util.js'
  import echarts from 'echarts'
  Vue.prototype.$echarts = echarts;
  export default {
    name: "statisticByMember",

    components: {
    },

    data() {
      return {
        searchParam:{},
        categoryId:'',
        pageData:[],
        myChart:null,
        totalDuration:0,
      };
    },
    computed:{
      tableData(){
        if(this.pageData.length==0){
          this.totalDuration = 0;
          return [];
        }
        let totalDuration = 0;
        this.pageData.map(item=>{
          totalDuration += item.duration;
        });
        this.totalDuration = totalDuration;
        return this.pageData.map(item=>{
          return {
            ...item,
            percentage:Math.round((item.duration/totalDuration)*100)+'%'
          }
        });
      },
    },
    watch:{

    },
    methods: {
      //获取数据
      getData(vo){
        console.log(vo);
        this.searchParam = vo;
        let promise = this.$api.daily.weekly.getStatisticByOrg(this.searchParam);
        promise.then(res=> {
          if (res.code === 0) {
            this.pageData = res.data;
            //渲染统计图表
            this.drawPie();
          }
        })
        return promise;
      },
      //渲染表1
      drawPie(){
        let names = [];
        let colors = ['#409EFF','#67C23A','#E6A23C','#F56C6C','#909399','##FFEF40'];
        let data = this.pageData.map((item,index)=>{
          names.push(item.orgName);
          return {
            value:item.duration,
            name:item.orgName,
          }
        });
        // 绘制图表
        this.myChart.setOption({
          title: { text: '按照人员所属部门统计 '+ this.searchParam.reportStartDateShow,textStyle:{fontWeight:400,fontSize:'14px'} },
          tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            orient: 'vertical',
            left: '350px',
            top:'middle',
            data:names
          },
          color:colors,
          series : [
            {
              x: 'center',
              name: '工时',
              type: 'pie',
              label: {
                show:false
              },
              radius : [80, 100],
              center: ['150px', '160px'],
              data:data,
            }
          ]
        });
      }
    },
    mounted () {
      this.myChart = this.$echarts.init(document.getElementById('echart-pie'));
    }
  };
</script>

<style lang="scss">
  .gray{
    background: #eee;
  }
  .echart-sty1{
    width: 100%;
    height: 320px;
  }
  .echart-pie-total{
    position: absolute;
    left: 115px;
    top:150px;
    width: 110px;
    text-align: center;
    span{ display:block;}
    .s-title{
      font-size: 12px;
      color: #aaa;
      line-height: 25px;
    }
    .title{
      font-size: 30px;
      font-family: "Arial",sans-serif;
      line-height: 30px;
    }
  }
</style>

