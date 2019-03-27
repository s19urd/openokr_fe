<template>
  <transition name="edit">
    <d2-container class="edit-panel" v-show="isVisible" v-loading="loading">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        <!--全部报工-团队成员-->
        历史报工
      </template>
      <div class="numall-area">
        <el-row>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">耗费总工时</p>
              <p class="value">{{totalData.costTimeNum||0}}<em>h</em></p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">任务总数</p>
              <p class="value">{{totalData.taskNum||0}}<em>个</em></p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">产品总数</p>
              <p class="value">{{totalData.productNum||0}}<em>项</em></p>
            </div>
          </el-col>
        </el-row>
        <!---->
        <table-comb
          name="团队成员历史报工列表"
          ref="tableMain"
          :search-model-base="tableMainSearchModelBase"
          :get-action="$api.okr.dailyWork.allDailyWork"
          :get-action-where="getActionWhere"
          :auto-fetch="false"
          :afterFetchData="afterFetchData"

        >
          <!--基础查询-->
          <template slot="baseSearchForm" slot-scope="scope">
            <div class="inline-block">
              <span class="lab"> 当前统计周期：</span>
              <el-date-picker
                v-model="scope.form.searchStartEndDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="w70off"
              >
              </el-date-picker>
            </div>
            <div class="inline-block ml20">
              <span class="lab"> 任务名称：</span>
              <el-select
                filterable
                clearable
                v-model="scope.form.taskId"
                placeholder="请选择"
                class="w80off"
              >
                <el-option
                  v-for="item in taskList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>
            <div class="inline-block ml20">
              <span class="lab">团队：</span>
              <el-select
                filterable
                clearable
                v-model="scope.form.teamId"
                placeholder="请选择"
                class="w80off"
              >
                <el-option
                  v-for="item in teamList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </div>

          </template>
          <!--表格-->
          <template slot="tableColumns">
            <el-table-column
              prop="reportDay"
              label="报工日期"
              width="150px"
              fixed
            >
              <template slot-scope="props">
                {{props.row.reportDay | dateFormat('yyyy-MM-dd') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="taskName"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="reportUserName"
              label="填报人"
              width="150">
            </el-table-column>
            <el-table-column
              prop="teamName"
              label="所属团队">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="耗费工时（h）"
              width="150">
            </el-table-column>
            <el-table-column
              prop="auditStatus"
              label="当前状态"
              width="150"
            >
              <template slot-scope="props">
                <el-tag size="mini" v-if="props.row.auditStatus==='00'">待审核</el-tag>
                <el-tag size="mini" type="success" v-if="props.row.auditStatus==='01'">已确认</el-tag>
                <el-tag size="mini" type="danger" v-if="props.row.auditStatus==='02'">已驳回</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="150" label="操作" fixed="right">
              <template slot-scope="props" v-if="props.row.auditStatus==='00' || props.row.auditStatus==='02' ">
                <el-button type="danger" size="mini" @click="removeItem(props.row)"> 删除</el-button>
              </template>
            </el-table-column>

          </template>
        </table-comb>
        <template slot="footer"></template>
      </div>
    </d2-container>
  </transition>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    inject:['reload'],
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "TeamMembers",
    mixins: [
      listMixin
    ],
    data() {
      return {
        isVisible:false,
        totalData:{
          costTimeNum:0,
          taskNum:0,
          productNum:0
        },
        tableMainSearchModelBase:{
          searchStartEndDate: [],
          taskId:'',
          teamId:'',
        },
        taskList: [],
        teamList:[],
      };
    },
    computed: {
      getActionWhere(){
        return {
          reportStartDayStr:'',
          reportEndDayStr:'',
        }
      },
    },
    methods: {
      open(vo) {
        this.isVisible = true;
        this.loading = false;
        setTimeout(()=>{
          this.$refs.tableMain.fetchData();
          let searchVo={};
          let allDaily={
            reportStartDayStr:'',
            reportEndDayStr:'',
          }
          this.$api.okr.dailyWork.allDailyWork(allDaily).then(res => {
            this.tableMain = res.data.data;
          });
          this.$api.okr.dailyWork.getSearchConditionList(searchVo).then(res => {
            //任务名称-下拉
            let resData = res.data;
            this.taskList=[]
            let taskId=[]
            resData.map(item => {
              if(item.taskId!==null || item.taskName!==null){
                if(taskId.indexOf(item.taskId)==-1){
                  taskId.push(item.taskId)
                  this.taskList.push({ value: item.taskId, label: item.taskName })
                }
              }
              //团队-下拉
              this.teamList=[]
              let teamId=[]
              if(item.teamId!==null || item.teamName!==null){
                if(teamId.indexOf(item.teamId)==-1){
                  teamId.push(item.teamId)
                  this.teamList.push({ value: item.teamId, label: item.teamName })
                }
              }
            })
          })
        },0)
      },
      back() {
//        this.isVisible = false
//        this.$emit("ok");

//        let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
//        this.$router.push(NewPage);
//        this.$router.go(-1);

//        this.$router.replace({
//          path: '/dailyReport.vhtml',
//          name:'DailyReport'
//        });
        this.reload()
      },
      searchCondition(){
        let vo = this.$refs.tableMain.getPageVo();
        this.$api.okr.dailyWork.getDailyStastics(vo).then(res => {
          this.totalData = res.data;
        });
      },
      afterFetchData(){
        this.searchCondition()
      },

      //删除历史报工
      removeItem(vo){
        this.$msgbox({
          title: '提示',
          type: 'warning',
          message: `确定要删除该数据？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.$api.okr.dailyWork.deleteDailyList(vo).then(res => {
              if (res.code === 0) {
                this.$message.success(`删除数据成功`);
                //刷新列表
                this.$refs.tableMain.fetchData();
                this.searchCondition()
              } else {
                this.$message.error(res.message)
              }
            });
          }
        });
      },
    },
    mounted() {

    }
  };
</script>


<style type="text/scss" lang="scss" scoped>
  .grid-content-top{
    text-align: center;
    margin-bottom: 20px;
    .key{
      font-size: 14px;
      margin: 0;
      color:#aaa;
    }
    .value{
      margin:10px 0;
      font-size: 24px;
      font-weight: 700;
      color: #409eff;
      em{    font-size: 20px;
        margin-left: 5px;
        vertical-align: 1px;
      }
    }
  }
  .el-col+.el-col .grid-content-top{border-left: 1px solid #e5e5e5;}
  .inline-block{
    display:inline-block;width: 370px;margin:5px 0;
    .lab{
      display: inline-block;text-align: right;min-width: 58px;
    }
    .w70off{
      width: 70%;
      box-sizing: border-box;
    }
    .w80off{
      width: 80%;
      box-sizing: border-box;
    }
  }
  .ml20{margin-left:20px}
</style>

<style>
  .mr30{margin-right: 30px}
  .mr40{margin-right: 60px}
  .numall-area .table-filter .fl{line-height: 40px}
  .numall-area .table-filter .fwb{font-weight: bold}
  .numall-area .el-row{  background-color: #f2f9ff;
    border-radius: 3px;
    padding: 20px 0 0 0;}
  .numall-area .m-table-comb{padding:20px 0 0 0}
  .numall-area .el-table th {
    color: #333;
    background-color: #f9f9f9;
  }
</style>
