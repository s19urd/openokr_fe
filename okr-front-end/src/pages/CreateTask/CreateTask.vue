<template>
  <div class="createTaskWapper positionAbsolute">
    <div class="header clearfix">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>OKR管理系统</el-breadcrumb-item>
        <el-breadcrumb-item>创建任务</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form class="searchForm">
          <el-form-item label="关键字:">
            <el-input placeholder="请输入" v-model="searchForm.searchKey"></el-input>
          </el-form-item>

          <el-form-item label="所属团队: ">
            <el-select v-model="searchForm.teamId" placeholder="请选择团队名称">
              <el-option
                v-for="item in teamList"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item >

          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              range-separator="到"
              palceholder="请选择时间"
              prefix-icon="el-icon-date"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
            ></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" icon="el-icon-search" @click="search(searchForm)">搜索</el-button>
          </el-form-item>
    
          <el-form-item>
            <el-button type="primary" @click="createTask">+ 创建任务</el-button>
          </el-form-item>
      </el-form>
    </div>

    <ul class="taskList">
      <li class="taskItem" v-for="(item, index) in taskList" :key="index">
        <div class="collapseHeader_left">
          <span class="taskName" v-text="item.taskName"></span>
          <span style="margin-left: 16px" v-if="item.estimateTime">该任务预计耗时：<span class="timeColor">{{ (item.estimateTime/8).toFixed(2) }} 天</span></span>
          <span style="margin-left: 20px" v-if="item.totalWorkingHours">该任务目前累计耗时：<span class="timeColor">{{ (item.totalWorkingHours/8).toFixed(2) }} 天</span></span>
          <div class="text">
            <div class="timeRange" v-if="item.taskStartTime && item.taskEndTime">
              <el-tag>{{ item.taskStartTime }} ~ {{ item.taskEndTime }}</el-tag>
            </div>
            <el-tag>Jira编码:<a class="link" v-if="item.jiraLabel" :href="item.jiraLabel">{{ item.jiraLabel }}</a></el-tag>由
            <span class="person">{{ item.createUserName || '系统导入' }} </span> <template v-if="item.createUserName"> 创建</template>
          </div>
        </div>
        <div class="collapseHeader_right">
          <el-button class="el-icon-delete" @click="deleteItem(item)"> 删除</el-button>
          <el-button class="el-icon-edit" @click="editItem(item)"> 编辑</el-button>
          <el-button class="el-icon-more" @click="openDetailPage(item.id)"> 查看详情</el-button>
          <p class="text">所属团队：
            <span class="belongTeam">{{ item.belongTeamName }}</span>
            <span class="count">{{ item.count }}</span>条关联的kr
          </p>
        </div>
      </li>
    </ul>

     <el-dialog
        title="提示"
        :visible.sync="tipDialogVisible"
        class="warning"
        width="30%">
        <span><i class="el-icon-warning"></i>删除后将无法恢复，确认删除吗？</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="tipDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm(item)">确 定</el-button>
        </span>
      </el-dialog>

    <el-pagination
      ref="pagination"
      @size-change="handleSizeChange"
      :page-size="searchForm.pageSize"
      :page-sizes="[3, 5, 7, 10]"
      layout="total, sizes, prev, pager, next"
      :total="totalRecord"
      @current-change="fetchData"
      class="alginCenter">  
    </el-pagination>

    <template v-if ="isShow">
      <create-task-form
        :dialog-visible.sync="isShow"
        :task-form-edit.sync="itemFormInfo"
        @update="search(searchForm)"></create-task-form>
    </template>
  </div>
</template>
<script>
import createTaskForm from "./Components/CreateTaskForm"
import { timestampsToDate } from  '../../libs/helper'
export default {
  name: "create-task",

  components: {
    createTaskForm
  },

  data() {
    return {
      tipDialogVisible: false,
      dateRange: "",

      searchForm: {
        searchKey: "",
        queryStartDate: '',
        queryEndDate: '',
        pageSize: 3,
        currentPage: 1,
        teamId: ''
      },

      teamList: [],

      totalRecord: 0,
      taskList: [],

      isShow: false,
      itemFormInfo: {}
    };
  },

  methods: {
    createTask() {
      this.isShow = true;
    },

    deleteItem (item) {
      this.tipDialogVisible = true
      this.confirm(item)
    },

    editItem (item) {
      this.$api.okr.task.getTaskDetailInfo(item.id).then(res=> {
        this.itemFormInfo = res.data
        this.itemFormInfo.isEdit = true
        this.itemFormInfo.taskVO.taskStartTime = new Date(this.itemFormInfo.taskVO.taskStartTime)
        this.itemFormInfo.taskVO.taskEndTime = new Date(this.itemFormInfo.taskVO.taskEndTime)
        this.itemFormInfo.userIds = []
        this.itemFormInfo.krIds = []
        this.itemFormInfo.userInfoVOS.forEach(item=>{
          (this.itemFormInfo.userIds).push(item.id)
        })
        this.itemFormInfo.keys.forEach(item=> {
          (this.itemFormInfo.krIds).push(item.id)
        })
        this.isShow = true
      })
    },

    openDetailPage (id) {
      this.$router.push({ name : 'TaskDetailPage', params: { id: id } })
    },
    
    confirm (item) {
      this.tipDialogVisible = false
      this.$api.okr.task.deleteTask(item.id).then(res => {
        if(res.code === 0) {
          this.$message.success('删除成功')
          this.search(this.searchForm)
        }
      })
    },

    search (searchForm) {
      this.$api.okr.task.getTaskListByPage(searchForm).then(res =>{
        this.taskList = res.data && res.data.data || []
        this.totalRecord = res.data && res.data.totalRecord
        this.taskList.forEach((item, index) => {
          item.taskStartTime = timestampsToDate(item.taskStartTime)
          item.taskEndTime = timestampsToDate(item.taskEndTime) 
        })

      })
    },

    handleSizeChange (val) {
      this.searchForm.pageSize = val
      this.fetchData()
    },
    
    fetchData (pageIndex) {
      this.searchForm.currentPage = pageIndex || this.searchForm.currentPage || 1
      this.search(this.searchForm)
    }
  },

  watch: {
    dateRange () {
      if (this.dateRange.length && this.dateRange.length > 0) {
        this.searchForm['queryStartDate'] = this.dateRange[0],
        this.searchForm['queryEndDate'] = this.dateRange[1]
      }
    }
  },

  mounted () {
    this.$api.okr.task.queryTeamList().then(res => {
      this.teamList = res.data
    })

    this.search(this.searchForm)
  }
};
</script>

<style lang="scss">
.createTaskWapper {
  padding: 8px 20px 30px;
  font-size: 14px;
  
   .el-dialog {
     box-shadow: none;
   }

   .el-button {
     padding: 8px 14px;
   }

  .el-breadcrumb {
    margin: 20px 0;
    font-size: 12px;

     &__inner {
      &:hover {
        color: rgb(76, 132, 255)
      }
     }
  }

  .header {
    padding-right: 42px;
  }
}

.header {
  .gray {
    font-size: 14px;
    color: #b7b8bd;
  }
}

.searchForm {
  display: flex;
  justify-content: space-between;

  .el-form-item {
    &__content {
      display: inline-block;
    }

    &__label {
      float: none;
    }
  }
}

.taskItem {
  display: flex;
  justify-content: space-between;
  height: auto;
  padding: 20px;
  background: white;

  .el-tag {
    margin-right: 10px;
  }

  .person {
    color: #4c84ff;
  }

  .text {
    margin-bottom: 0;
    margin-top: 12px;

    .timeRange {
      display: inline;
    }

    .belongTeam {
      margin-right: 58px;
      color: #4c84ff;
      font-size: 14px;
    }

    .link {
      text-decoration: underline !important;
      margin-left: 4px;
    }
  }

  ul {
    margin-left: -40px;
  }

  .timeColor {
    color: #ff0000;
  }
}

.taskItem {
  + .taskItem {
    margin-top: 10px;
  }
}

.collapseHeader {
  &_left {
    flex: 6;

    .taskName {
      display: inline-block;
      max-width: 100%;
      font-size: 18px;
      font-weight: bold;
      line-height: 32px;
      color: #212121;
    }
  }

  &_right {
    flex: 3;
    text-align: right;
    padding-right: 20px;
    .count {
      color: #4c84ff;
      font-size: 18px;
      margin-left: 2px;
      margin-right: 2px;
    }
  }
}

.taskList {
  margin-left: -40px;
  margin-top: 0;
}

.warning {
  span {
    font-size: 16px;
  }

  .el-icon-warning {
    color: rgb(253, 180, 77);
  }
}

.el-pagination {
  span:not([class*=suffix]),
  button,
  li {
    height: 42px;
    line-height: 42px;
  }

  .el-pager {
    li.btn-quicknext,
    li.btn-quickprev {
      height: 42px;
      line-height: 42px;
    }
  }

  .el-select,
  .el-input {
    width: auto
  }

  .el-input__inner {
    padding-top: 20px;
    padding-bottom: 20px;
    border: none;
  }
}
</style>

