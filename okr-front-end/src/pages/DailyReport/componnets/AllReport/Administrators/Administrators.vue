<template>
  <transition name="edit">
    <d2-container class="edit-panel" v-show="isVisible" v-loading="loading">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        <!--全部报工-管理者-->
        历史报工
      </template>
      <div class="numall-area admin-area">
        <el-row>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">耗费总工时</p>
              <p class="value">{{totalData.costTimeNum||0}}<em>h</em></p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">任务总数</p>
              <p class="value">{{totalData.taskNum||0}}<em>个</em></p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">产品总数</p>
              <p class="value">{{totalData.productNum||0}}<em>项</em></p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">人员总数</p>
              <p class="value">{{totalData.personnelNum||0}}<em>个</em></p>
            </div>
          </el-col>
        </el-row>
        <!---->
        <div class="mt20">
          <template>
            <el-tabs v-model="activeTabName"  @tab-click="handleClick">
              <el-tab-pane label="我的报工" name="first">
                <table-comb
                  name="管理者历史报工列表"
                  ref="tableMain1"
                  :search-model-base="tableMainSearchModelBase"
                  :get-action="$api.okr.dailyWork.allDailyWork"
                  :get-action-where="getActionWhere1"
                  :auto-fetch="false"
                  :afterFetchData="afterFetchData1"

                >
                  <!--基础查询-->
                  <template slot="baseSearchForm" slot-scope="scope">
                    <div class="inline-block">
                      <span class="lab"> 选择时间区间：</span>
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

                    <div class="inline-block">
                      <span class="lab"> 任务名称：</span>
                      <el-select
                        filterable
                        clearable
                        v-model="scope.form.taskId"
                        placeholder="请选择"
                        class="w70off"
                      >
                        <el-option
                          v-for="item in taskList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="inline-block">
                      <span class="lab">团队：</span>
                      <el-select
                        filterable
                        clearable
                        v-model="scope.form.teamId"
                        placeholder="请选择"
                        class="w70off"
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
                      width="80"
                    >
                      <template slot-scope="props">
                        <el-tag size="mini" v-if="props.row.auditStatus==='00'">待审核</el-tag>
                        <el-tag size="mini" type="success" v-if="props.row.auditStatus==='01'">已确认</el-tag>
                        <el-tag size="mini" type="danger" v-if="props.row.auditStatus==='02'">已驳回</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column width="150" label="操作" fixed="right">
                      <template slot-scope="props">
                        <el-button type="danger" size="mini" v-if="props.row.auditStatus==='00'" @click="openConfirm(props.row)"> 确认</el-button>
                        <el-button size="mini" v-if="props.row.auditStatus==='00'" @click="openReject(props.row)"> 驳回</el-button>
                      </template>
                    </el-table-column>
                  </template>
                </table-comb>
                <template slot="footer"></template>
              </el-tab-pane>
              <el-tab-pane label="团队报工" name="second" >
                <table-comb
                  name="团队报工列表"
                  ref="tableMain2"
                  :search-model-base="tableMainSearchModelBase"
                  :get-action="$api.okr.dailyWork.allDailyWork"
                  :get-action-where="getActionWhere2"
                  :auto-fetch="false"
                  :afterFetchData="afterFetchData2"

                >
                  <!--基础查询-->
                  <template slot="baseSearchForm" slot-scope="scope">
                    <div class="inline-block">
                      <span class="lab"> 选择时间区间：</span>
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

                    <div class="inline-block">
                      <span class="lab"> 任务名称：</span>
                      <el-select
                        filterable
                        clearable
                        v-model="scope.form.taskId"
                        placeholder="请选择"
                        class="w70off"
                      >
                        <el-option
                          v-for="item in taskList"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </div>
                    <div class="inline-block">
                      <span class="lab">团队：</span>
                      <el-select
                        filterable
                        clearable
                        v-model="scope.form.teamId"
                        placeholder="请选择"
                        class="w70off"
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
                      fixed="right"
                    >
                      <template slot-scope="props">
                        <el-tag size="mini" v-if="props.row.auditStatus==='00'">待审核</el-tag>
                        <el-tag size="mini" type="success" v-if="props.row.auditStatus==='01'">已确认</el-tag>
                        <el-tag size="mini" type="danger" v-if="props.row.auditStatus==='02'">已驳回</el-tag>
                      </template>
                    </el-table-column>
                    <el-table-column width="150" label="操作" fixed="right">
                      <template slot-scope="props">
                        <el-button type="danger" size="mini" v-if="props.row.auditStatus==='00'" @click="openConfirm(props.row)"> 确认</el-button>
                        <el-button size="mini" v-if="props.row.auditStatus==='00'" @click="openReject(props.row)"> 驳回</el-button>
                      </template>
                    </el-table-column>
                  </template>
                </table-comb>
                <template slot="footer"></template>
              </el-tab-pane>
            </el-tabs>
          </template>
        </div>
      </div>
    </d2-container>
  </transition>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "Administrators",
    mixins: [
      listMixin
    ],
    data() {
      return {
        isManage:0,
        isVisible:false,
        totalData:{
          costTimeNum:0,
          taskNum:0,
          productNum:0,
          personnelNum:0
        },
        tableMainSearchModelBase:{
          searchStartEndDate: [],
          taskId:'',
          productId:'',
          categoryId:'',
          teamId:'',
          okrId:''
        },
        taskList: [],
        teamList:[],
        activeTabName: "first",
        tabIndex:0
      };
    },
    computed: {
      getActionWhere1(){
        return {
        }
      },
      getActionWhere2(){
        return {
          isAdmin:1
        }
      },
    },
    methods: {
      open(vo) {
        this.isVisible = true;
        this.loading = false;
        this. activeTabName= "first";

        setTimeout(()=>{
          if(this.tabIndex===0){
            this.$refs.tableMain1.fetchData();
          }
          if(this.tabIndex===1){
            this.$refs.tableMain2.fetchData();
          }
          let searchVo={};
          let allDaily={
            reportStartDayStr:'',
            reportEndDayStr:'',
          }
          this.$api.okr.dailyWork.allDailyWork(allDaily).then(res => {
            this.tableMain1 = res.data.data;
            this.tableMain2 = res.data.data;
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
        },0);
      },
      back() {
//        this.isVisible = false
//        this.$emit("ok");
        let NewPage = '_empty' + '?time=' + new Date().getTime()/500;
        this.$router.push(NewPage);
        this.$router.go(-1);
      },

      afterFetchData1(){
        let vo = this.$refs.tableMain1.getPageVo();
        this.$api.okr.dailyWork.getDailyStastics(vo).then(res => {
          this.totalData = res.data;
        });
      },
      afterFetchData2(){
        let vo = this.$refs.tableMain2.getPageVo();
        this.$api.okr.dailyWork.getDailyStastics(vo).then(res => {
          this.totalData = res.data;
        });
      },
      handleClick(tab){
        this.tabIndex=tab.index
        console.log(tab.index);
      },
      //确认
      openConfirm(item){
        const _this = this;
        this.$msgbox({
          title: '提示',
          message: `是否确定该任务？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            let vo={
              auditStatus:item.auditStatus='01'
            }
            this.$api.okr.dailyWork.allDailyWork(vo).then(res => {
              if (res.code === 0) {
                this.$message.success(`确认成功！`)
                this.$refs.tableMain1.fetchData()
                this.$refs.tableMain2.fetchData()
              } else {
                this.$message.error(res.message);
              }
            });
          }
        })
      },
      //驳回
      openReject(item){
        this.$msgbox({
          title: '提示',
          message: `是否确定驳回？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            let vo={
              auditStatus:item.auditStatus='02'
            }
            this.$api.okr.dailyWork.allDailyWork(vo).then(res => {
              if (res.code === 0) {
                this.$message.success(`驳回成功！`)
                this.$refs.tableMain1.fetchData()
                this.$refs.tableMain2.fetchData()
              } else {
                this.$message.error(res.message);
              }
            });
          }
        })
      },
    },
    mounted() {
      this.$api.okr.dailyWork.getCurrentUserRole().then(res => {
        let resData = res.data;
        let roleTypeList=[];
        let roleTypeData=[];
        resData.map(item => {
          if(roleTypeList.indexOf(item.roleType)==-1) {
            roleTypeData.push(item.roleType)
          }
        })
        roleTypeData.map(item => {
          let strData=item;
          if (strData[0] == '0') {
            this.isManage  = 1;
            console.log(this.isManage)
          }
        })

      });
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
      display: inline-block;min-width: 100px;text-align: right;
    }
    .w70off{
      width: 70%;
      box-sizing: border-box;
    }
  }
</style>

<style>
  .admin-area .el-tabs__content .m-table-comb{padding-top:5px}
  .admin-area .m-table-comb .table-filter{padding-bottom:15px}
  .daily-report .el-tabs__active-bar{  display:none;}
  .daily-report .el-tabs__item{margin:0 20px;padding:0;font-size: 15px;
    font-weight: bold;}
  .daily-report .el-tabs__item.is-top:nth-child(2){margin-left: 0}
  .daily-report  .el-tabs__item.is-active{border-bottom: 2px solid #409eff;}
</style>
