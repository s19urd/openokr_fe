<template>
  <d2-container>    
    <el-form class="">
      <div class="tip"><img src="../../../public/image/okr/icon-happy.png"/>今天又完成工作了鸭！可以在备注信息里唠叨唠叨今天的收获呢！明天也要加油哦～</div>
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
          <el-button type="default" >上移</el-button>
          <!-- moveDown -->
          <el-button type="default" >下移</el-button>
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
          prop="name"
          label="项目/产品名称"
          >
          <template slot-scope="scope">
            <el-select v-model="scope.row.taskName" placeholder="请选择">
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
        <el-button type="primary" @click="submit">完成今日报工</el-button>
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
          taskName: '',
          duration: '',
          remark: '',
          reportDay: ''
        },
        projectList: [
          { value: '项目/产品名称1', label: '项目/产品名称1' },
          { value: '项目/产品名称2', label: '项目/产品名称2' },
          { value: '项目/产品名称3', label: '项目/产品名称3' },
          { value: '项目/产品名称4', label: '项目/产品名称4' },
          { value: '项目/产品名称5', label: '项目/产品名称5' },
          { value: '项目/产品名称6', label: '项目/产品名称6' },
          { value: '项目/产品名称7', label: '项目/产品名称7' },
          { value: '项目/产品名称8', label: '项目/产品名称8' }
        ],
        multipleSelection: [],
        sumWorkingHour: 0,
        maxLength: 0
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

      submit () {
        this.tableData.forEach(item => {
          item.reportDay = this.date
        })
        this.$api.okr.dailyWork.submitDailyWork(this.tableData).then(res=> {
          console.log(this.tableData)
          console.log(res.data)
        })
      }
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

  .time {
    margin-left: .2rem;
    margin-right: .2rem;
  }
</style>


