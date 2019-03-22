<template>
  <d2-container>
    <div class="daily-report">
      <el-form class="">
        <div class="tip flex">
          <div class="flex1">
            <img class="fl" :src="imageUrl"/>今天又完成工作了鸭！可以在备注信息里唠叨唠叨今天的收获呢！明天也要加油哦～
          </div>
          <div class="fr">
            <!--&lt;!&ndash;管理员&ndash;&gt;-->
            <!--<template v-if="role.roleType==='00' || role.roleType==='01' || role.roleType==='02'">-->
              <!--<el-button type="default" @click="toMyTeam">我的团队</el-button>-->
              <!--<el-button type="default" @click="toDataAggregation">数据汇总</el-button>-->
              <!--<el-button type="default" @click="openAdminDialog">全部报工</el-button>-->
              <!--<el-button type="default" @click="toMyTasks">我的任务</el-button>-->
            <!--</template>-->
            <!--<template v-else="">-->
              <!--<el-button type="default" @click="openTeamDialog">全部报工</el-button>-->
              <!--<el-button type="default" @click="toMyTasks">我的任务</el-button>-->
            <!--</template>-->
          </div>
        </div>
        <!--历史报工-表格-->
        <el-table
          name="本周报工详情列表"
          ref="tableMain"
          class="fillTable"
          :data="tableMain">
          <el-table-column prop="reportDay" width="180" label="报工日期">
            <template slot-scope="props">
              {{props.row.reportDay | dateFormat('yyyy-MM-dd') }}
            </template>
          </el-table-column>
          <el-table-column prop="taskName" width="300" label="任务名称"></el-table-column>
          <el-table-column prop="duration" width="150" label="报工时长(h)"></el-table-column>
          <el-table-column prop="remark" label="备注"></el-table-column>
          <el-table-column prop="auditStatus" width="150" label="状态">
            <template slot-scope="props">
              <el-tag size="mini" v-if="props.row.auditStatus==='00'">待审核</el-tag>
              <el-tag size="mini" type="success" v-if="props.row.auditStatus==='01'">已确认</el-tag>
              <el-tag size="mini" type="danger" v-if="props.row.auditStatus==='02'">已驳回</el-tag>
            </template>
          </el-table-column>
          <el-table-column width="150" label="操作">
            <template slot-scope="props" v-if="props.row.auditStatus==='00' || props.row.auditStatus==='02' ">
              <el-button type="danger" size="mini" @click="removeItem(props.row)"> 删除</el-button>
              <el-button size="mini" @click="openEditDialog(props.row)"> 编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--新增列表-->
        <div class="hanle-table-noth">
          <el-table
            ref="multipleSelectionTable"
            class="fillTable"
            :data="tableData">
            <el-table-column
              label="报工日期"
              width="180">
              <template slot-scope="scope">
                <el-date-picker
                  v-model="scope.row.reportDay"
                  type="date"
                  :clearable="false"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </template>
            </el-table-column>

            <el-table-column
              label="任务名称"
              width="300"
            >
              <template slot-scope="scope">
                <el-select
                  filterable
                  clearable
                  v-model="scope.row.taskId"
                  placeholder="请选择">
                  <el-option
                    v-for="item in projectList"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="报工时长"
              width="150"
            >
              <template slot-scope="scope">
                <el-input-number v-model="scope.row.duration" :precision="1" :min="0" :max="24"  placeholder="请输入" @change="changeTime"></el-input-number>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="备注信息"
            >
              <template slot-scope="scope">
                <el-input v-model="scope.row.remark" maxlength="200" placeholder="请输入"></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="name"
              label="状态"
              width="10"
            >
              <template slot-scope="scope">
                <el-input  class="hide" v-model="scope.row.duration" type="number" placeholder="请输入" @change="changeTime"></el-input>
              </template>
            </el-table-column>

            <el-table-column width="150" label="操作">
              <template slot-scope="props">
                <el-button type="danger" size="mini" @click="removeTableDate(props.$index, props.row)"> 删除</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>
        <div class="formFooter">
          <div class="sumWorkingHour">
            <el-button type="default" icon="el-icon-circle-plus" @click="add">添加任务</el-button>
          </div>
          <el-button type="primary" @click="validate" >提交今日报工</el-button>
          <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="40%">
          <span class="warning-popup">
            <i class="el-icon-warning"></i>您此次总工时为<em class="c-blue">{{ sumWorkingHour }}</em>小时，确认提交此次报告么？
          </span>
            <span slot="footer" class="dialog-footer">
            <div class="buttonWrap">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit"  v-loading.fullscreen.lock="fullscreenLoading">确 定</el-button>
            </div>
          </span>
          </el-dialog>
        </div>
      </el-form>
      <!--编辑弹窗-->
      <el-dialog title="编辑报工" :visible.sync="showSaveDialog" width="600px">
        <el-form label-width="100px" :model="editWork" ref="saveForm">
          <el-form-item label="报工日期">
            <el-date-picker  class="w430"
                             v-model="editWork.reportDay"
                             type="date"
                             format="yyyy-MM-dd"
                             :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="任务名称">
            <el-select class="w430"
                       filterable
                       clearable
                       v-model="editWork.taskId"
                       placeholder="请选择">
              <el-option
                v-for="item in projectList"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="报工时长(h)">
            <el-input-number v-model="editWork.duration" :precision="1" :min="0" :max="24"  placeholder="请输入" @change="changeTime"></el-input-number>
          </el-form-item>
          <el-form-item label="状态" class="hide">
            <el-input class="w430" v-model="editWork.auditStatus" placeholder="请输入" :disabled="false"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input class="w430" v-model="editWork.remark" type="textarea" :rows="3" placeholder="请输入"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer tr">
          <el-button @click="showSaveDialog = false">取 消</el-button>
          <el-button type="primary"  @click="saveEditWork">确 定</el-button>
        </div>
      </el-dialog>
      <administrators ref="Administrators"></administrators>
      <team-members ref="TeamMembers"></team-members>
    </div>
  </d2-container>
</template>
<script>
  import listMixin from "@/mixins/list.mixin";
  import Administrators from "./componnets/AllReport/Administrators";
  import TeamMembers from "./componnets/AllReport/TeamMembers";
  import { difference, findIndex, max, min } from 'lodash'
  export default {
    name: 'DailyReport',
    components: {Administrators,TeamMembers},
    data () {
      return {
        role:{},
        tableMain: [],
        tableData: [],
        initItemData:{
          id:'',
          reportDay: new Date(),
          taskId: '',
          duration: '',
          auditStatus: '00',
          remark: '',
        },
        projectList: [],
        firstDataList:[],
        multipleSelection: [],
        sumWorkingHour: 0,
        maxLength: -1,
        dialogVisible: false,
        flag: '',
        publicPath: process.env.BASE_URL,
        imageUrl: require('@/assets/okr/icon-happy.png'),
        tempMaxIndex: '',
        tempMinIndex: '',
        editWork:{},
        showSaveDialog:false,
        fullscreenLoading: false,
        weakData:{// 获取周一周天的时间
          mondayData : new Date(new Date().getTime() - (new Date().getDay()-1)*(24*60*60*1000)),
          sundayData : new Date(new Date().getTime()+ (7-new Date().getDay())*(24*60*60*1000)),
        },
        pickerOptions: { // 日期设置对象
          disabledDate: (time) => {
            return this.dealDisabledDate(time)
          }
        },
      }
    },
    computed:{
      teamId(){
        this.$route.params.teamId
      }
    },
    methods:{
      //历史报工
      formatDate(date) {
        let d = new Date(date),
          month = '' + (d.getMonth() + 1),
          day = '' + d.getDate(),
          year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [year, month, day].join('-');
      },
      historyData(){
        // 获取周一周天的时间
        console.log(this.formatDate(this.weakData.mondayData));
        console.log(this.formatDate(this.weakData.sundayData));
        let historyList={
          currentPage:'',
          pageSize:'',
          reportStartDayStr:this.formatDate(this.weakData.mondayData),
          reportEndDayStr:this.formatDate(this.weakData.sundayData),
        }
        this.$api.okr.dailyWork.historyDailyWork(historyList).then(res => {
          this.tableMain = res.data.data;
        });

      },
      //添加任务
      add () {
        let taskItem = Object.assign({}, this.initItemData)
        taskItem.index= this.tableData.length;
        this.tableData.push(taskItem)
//        console.log(taskItem.index)
      },
      changeTime () {
        let sumTemp = 0
        this.tableData.forEach(item => {
          sumTemp = sumTemp + Number(item.duration)
        })
        this.sumWorkingHour = sumTemp
      },
      //验证formData
      validate () {
        this.flag = true
        if (this.tableData.length === 0) {
          this.$message.warning('请添加条数！')
          this.dialogVisible = false
          this.flag = false
          return
        } else {
          this.tableData.forEach(item => {
            if(item.taskId === "") {
              this.$message.warning('项目类型不能为空！')
              this.dialogVisible = false
              this.flag = false
              return
            }
            if(item.duration === '') {
              this.$message.warning('报工时长不能为空！')
              this.dialogVisible = false
              this.flag = false
              return
            }
          })
        }
        if (this.flag) {
          this.dialogVisible = true
        }
      },
      //提交数据，关闭弹窗
      submit () {
        this.$api.okr.dailyWork.submitDailyWork(this.tableData).then(res=> {
          this.dialogVisible = false
          if (res.code === 0) {
            this.$message.success('您的报工已提交成功，耐心等待审核结果～')
          }
          this.historyData();
          this.tableData=[]
        })
      },
      //打开编辑历史报工弹窗
      openEditDialog(detail){
        if(detail.id){
          this.editWork = {
            id:detail.id,
            reportDay:detail.reportDay,
            taskId:detail.taskId,
            duration:detail.duration,
            auditStatus:detail.auditStatus,
            remark:detail.remark,
          }
        }
        this.showSaveDialog =true;
      },
      //保存编辑的历史报工
      saveEditWork(){
        const _this = this;
        this.$api.okr.dailyWork.submitDailyWork([this.editWork]).then(res => {
          this.showSaveDialog = false
          if(res.code==0){
            _this.$message({
              message: '修改成功!',
              type: 'success'
            });
            this.historyData();
          }else{
            _this.$message.error(res.message);
          }
        });
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
                this.historyData();
              } else {
                this.$message.error(res.message)
              }
            });
          }
        });
      },
      //删除输入框里的报工
      removeTableDate(index){
        this.tableData.splice(index, 1)
      },
      // 跳转页面
      toMyTeam(){
        this.$router.push({path: '/MyTeam.vhtml'})
      },
      toDataAggregation(){
        this.$router.push({path: '/daily/dashboard/'+this.teamId})
      },
      toMyTasks(){
        this.$router.push({path: '/CreateTask.vhtml'})
      },
      // 全部报工-管理者
      openAdminDialog() {
        this.$refs.Administrators.open();
      },
      // 全部报工-团队成员
      openTeamDialog() {
        this.$refs.TeamMembers.open();
      },
      // 设置本周时间可选范围
      dealDisabledDate (time) {
        let time1=new Date(new Date().getTime() - (new Date().getDay()+7)*(24*60*60*1000));
        let time2=new Date(new Date().getTime()- (new Date().getDay()-7)*(24*60*60*1000));
        return  time2<time.getTime() || time.getTime() < time1
      }
    },
    mounted () {
      this.$api.okr.dailyWork.getCurrentUserRole().then(res => {
        this.role = res.data;

      });
      this.$api.okr.login.isLogin().then(res => {
        if (!res.success) {
          this.$router.replace({
            name: 'Unauthorized'
          })
        }
      });
      this.historyData()
      //任务名称
      let projectVo={
        isFilterTime:'1',
        currentPage:'',
        pageSize:'',
      }
      this.$api.okr.dailyWork.queryTaskListByPage(projectVo).then(res => {
        let resData = res.data.data
        resData.forEach(item => {
          this.projectList.push({ value: item.id, label: item.taskName })
        })
      })
    },

  }
</script>
<style lang="scss">
  .flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
  .flex>.flex1{-webkit-box-flex:1;-ms-flex:1;flex:1;display:block;-webkit-flex-grow:1;-webkit-flex-shrink:1;-webkit-flex-basis:0;}
  .flex>.flex2{-webkit-box-flex:2;-webkit-flex:2;-ms-flex:2;flex:2;display:block;-webkit-flex-grow:2;-webkit-flex-shrink:2;-webkit-flex-basis:0;}
  .flex>.flex3{-webkit-box-flex:3;-webkit-flex:3;-ms-flex:3;flex:3;display:block;-webkit-flex-grow:3;-webkit-flex-shrink:3;-webkit-flex-basis:0;}
  .tip {
    align-items: center;
    padding: 22px 0px;
    border-bottom: 1px solid rgb(243, 243, 243);
    font-size: 14px;
    font-weight: bold;
    color: #4c84ff;line-height: 50px;
    img {
      margin-right: 10px;
    }
  }
  .sumWorkingHour {
    color: #545454;
    font-size: 14px;
  }
  .fillTable {
    margin-top: .2rem;
  }
  .formFooter {
    display: flex;
    justify-content: space-between;
    padding: 15px 0;
    border-top: 1px solid #f3f3f3;
    margin: 10px 0 0;
  }
  .el-dialog__footer {
    margin-top: 3rem;
  }
  .time {
    margin-left: .2rem;
    margin-right: .2rem;
    color:#4c84ff;
    font-size: 18px;
  }
  .el-icon-warning { margin-right: 12px;  }
  .mb10{margin-bottom: 10px}
  .pr0.el-input input{padding-right:0}
  .c-blue{color:#4c84ff}
  .fs16{font-size: 16px}
  .tr{text-align: right}
  .hide{ display: none;}
  em,i{font-style: normal}
  .hanle-table-noth {
    thead.has-gutter{
      display: none;
    }
    .el-input-number{
      width: 135px;
    }
    .el-select{
      width: 280px;
    }
    .el-date-editor.el-input{
      &.el-input{
        width:150px;
        input{
          padding-right: 10px
        }
      }
    }
    .el-table__empty-text{display: none;}
    .el-table__empty-block{min-height:0;}
  }
  .hanle-table-noth+.formFooter{border-top:none}
  .hanle-table-noth .el-table__header-wrapper{display: none;}
  .warning-popup{
    font-size:18px;
    .el-icon-warning{color: #e6a23c}
  }
  .el-tag--success {
    background-color: rgba(103,194,58,.1);
    border-color: rgba(103,194,58,.2);
    color: #67c23a;
  }
  .el-button--danger:active,.el-button--danger:focus{
    background-color: #f56c6c;
    border-color: #f56c6c;
  }
  .w180.el-date-editor.el-input{
    width: 180px;
  }
  .w430,
  .w430.el-date-editor.el-input{
    width: 430px;
  }

  .daily-report{
    .el-table th, .el-table td{padding-top:10px;padding-bottom: 10px}
    .el-table th {
      color: #333;
      background-color: #f9f9f9;
    }
  }
</style>

