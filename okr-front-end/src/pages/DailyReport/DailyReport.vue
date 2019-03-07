<template>
  <d2-container>    
    <el-form class="">
      <div class="tip"><img :src="imageUrl"/>今天又完成工作了鸭！可以在备注信息里唠叨唠叨今天的收获呢！明天也要加油哦～</div>
      <div class="baseOperationWrap">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="请选择时间">
        </el-date-picker>
        <div class="buttonWrap">
          <!-- add -->
          <el-button type="default" icon="el-icon-circle-plus" @click="add">新增KR</el-button>
          <!-- delete -->
          <el-button type="default" icon="el-icon-remove" @click="remove">删除</el-button>
          <!-- moveUp -->
          <!-- <el-button type="default" @click="moveUp">上移</el-button> -->
          <!-- moveDown -->
          <!-- <el-button type="default" >下移</el-button> -->
        </div>
      </div>
      <el-table
        ref="multipleSelectionTable"
        class="fillTable"
        @selection-change="handleSelectionChange"
        :data="tableData">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="taskId"
          label="项目/产品名称"
          width="250"
          >
          <template slot-scope="scope">
            <el-select
              filterable
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
          width="300"
          >
          <template slot-scope="scope">
              <el-input v-model="scope.row.duration" type="number" placeholder="请输入" @change="changeTime"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="备注信息"
          >
          <template slot-scope="scope">
            <el-input v-model="scope.row.remark" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>
      </el-table>

      <div class="formFooter">
        <div class="sumWorkingHour">
          <label>今日汇总工时</label>
          <span class="time">{{ sumWorkingHour }}</span>
          <label>h</label>
        </div>
        <el-button type="primary" @click="dialogVisible = true">完成今日报工</el-button>
        <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          width="40%">
          <span><i class="el-icon-warning"></i>每日仅能提交一次报工且提交后不可修改</span>
          <span slot="footer" class="dialog-footer">
            <el-checkbox class="checked" v-model="checked">不再提示</el-checkbox>
            <div class="buttonWrap">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="submit">确 定</el-button>
            </div>
          </span>
        </el-dialog>
      </div>
    </el-form>
  </d2-container>
</template>
<script>
  import { difference } from 'lodash'
  export default {
    name: 'report-working-hour',
    
    data () {
      return {
        date: '',
        tableData: [],
        initItemData: {
          id: '',
          taskId: '',
          duration: '',
          remark: '',
          reportDay: ''
        },
        projectList: [],
        multipleSelection: [],
        sumWorkingHour: 0,
        maxLength: 0,
        dialogVisible: false,
        checked: '',
        flag: '',
        publicPath: process.env.BASE_URL,
        imageUrl: require('@/assets/okr/icon-happy.png')
      }
    },

    methods:{
      add () {
        let taskItem = Object.assign({}, this.initItemData)
        taskItem.id = ++(this.maxLength)
        this.tableData.push(taskItem)
      },

      handleSelectionChange (selection) {
        this.multipleSelection = selection
      },

      remove () {
        this.tableData = difference(this.tableData, this.multipleSelection)
      },

      changeTime () {
        let sumTemp = 0
        this.tableData.forEach(item => {
          sumTemp = sumTemp + Number(item.duration)
        })
        this.sumWorkingHour = sumTemp
      },

      // moveUp () {
      //   if (this.tableData.length === 0) {
      //     this.$message.warning('请先添加数据')
      //     return
      //   }
      //   if (this.multipleSelection.length === 0) {
      //     this.$message.warning('请先勾选数据')
      //     return
      //   }

      //   let tempMaxIndex = 0,
      //       tempMinIndex = 0
      //   console.log(this.multipleSelection)
      //   this.multipleSelection.forEach(item => {
      //     console.log(item)
      //     if (item.id === 1) {
      //       this.$message.warning('已经是第一行了')
      //       return
      //     }
      //     tempMaxIndex = (item.id - 1) > tempMaxIndex ? (item.id - 1): tempMaxIndex
      //     tempMinIndex = (item.id - 1) < tempMinIndex ? (item.id - 1): tempMinIndex
      //   })
      //   let temData = this.tableData[tempMinIndex]
      //   this.tableData.splice(tempMinIndex, 1)
      //   this.tableData.splice(tempMaxIndex, 0, temData)
      // },

      //验证formData
      validate () {
        this.flag = true
        if (!this.date) {
          this.$message.warning('日期不能为空！')
          this.dialogVisible = false
          this.flag = false
          return
        }
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
      },

      submit () {
        this.validate ()
        if (this.flag) {
          //每条task添加日期
          this.tableData.forEach(item => {
            item.reportDay = this.date
          })
          //提交数据，关闭弹窗
          this.$api.okr.dailyWork.submitDailyWork(this.tableData).then(res=> {
            this.dialogVisible = false
            if (res.code == 6000) {
              this.$message.success('保存成功！')
            }
          })
        }
      }
    },

    mounted () {
      this.$api.okr.login.isLogin().then(res => {
        if (!res.success) {
          this.$router.replace({
            name: 'Unauthorized'
          })
        }
      })
      this.$api.okr.dailyWork.queryTaskListByPage().then(res => {
        let resData = res.data.data
        resData.forEach(item => {
          this.projectList.push({ value: item.taskCode, label: item.taskName })
        })
      })
    }
  }
</script>
<style lang="scss">
  .tip {
    display: flex;
    align-items: center;
    padding: 22px 0px;
    border-bottom: 1px solid rgb(243, 243, 243);
    font-size: 14px;
    font-weight: bold;
    color: #4c84ff;

    img {
      margin-right: 10px;
    }
  }

  .sumWorkingHour {
    color: #545454;
    font-size: 14px;
  }

  .baseOperationWrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
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

  .dialog-footer {
    display: flex;
    justify-content: space-between;
  }

  .time {
    margin-left: .2rem;
    margin-right: .2rem;
    color:#4c84ff;
    font-size: 18px;
  }

  .el-icon-warning {
    margin-right: 12px;
  }
</style>


