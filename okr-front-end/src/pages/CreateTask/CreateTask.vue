<template>
  <div class="createTaskWapper positionAbsolute">
    <div class="header clearfix">
      <p>
        <a class="link">OKR管理系统</a>
        <i class="el-icon-arrow-right gray"></i>
        <a class="link">创建任务</a>
      </p>
      <el-form class="searchForm">
          <el-form-item label="关键字:">
            <el-input placeholder="请输入" v-model="searchForm.searchKey"></el-input>
          </el-form-item>

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
            <el-button type="primary" icon="el-icon-search" @click="serach(searchForm)">搜索</el-button>
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
          <div class="text">
            <div class="timeRange" v-if="item.taskStartTime && item.taskEndTime">
              <el-tag>{{ item.taskStartTime }}</el-tag> ~ <el-tag>{{ item.taskEndTime }}</el-tag>
            </div>
            <el-tag>jira编码:{{ item.jiraLabel }}</el-tag>由
            <span class="person">{{ item.createUserName || 'XX' }} </span>创建
          </div>
        </div>
        <div class="collapseHeader_right">
          <el-button class="el-icon-delete" @click="deleteItem(item)"> 删除</el-button>
          <el-button class="el-icon-edit" @click="editItem(item)"> 编辑</el-button>
          <el-button class="el-icon-more" @click="openDetailPage(item.id)"> 查看详情</el-button>
          <p class="text">共
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
      :page-size="searchForm.pageSize"
      layout="prev, pager, next"
      :total="totalPage"
      @current-change="fetchData"
      class="alginCenter">  
    </el-pagination>

    <template v-if ="isShow">
      <create-task-form
        :dialog-visible.sync="isShow"
        :task-form-edit.sync="itemFormInfo"></create-task-form>
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
        currentPage: 1
      },

      totalPage: 0,
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
          this.serach(this.searchForm)
        }
      })
    },

    serach (searchForm) {
      this.$api.okr.task.getTaskListByPage(searchForm).then(res =>{
        this.taskList = res.data.data
        this.totalPage = res.data.totalPage
        this.taskList.forEach((item, index) => {
          item.taskStartTime = timestampsToDate(item.taskStartTime) 
          item.taskEndTime = timestampsToDate(item.taskEndTime) 
        })

      })
    },
    
    fetchData (pageIndex) {
      this.searchForm.currentPage = pageIndex || this.searchForm.currentPage || 1
      this.serach(this.searchForm)
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
    this.serach(this.searchForm)
  }
};
</script>

<style lang="scss">
.createTaskWapper {
  padding: 8px 30px 30px;
  
   .el-dialog {
     box-shadow: none;
   }

  .header {
    padding-right: 42px;
  }
}

.header {
  .link,
  .arrow {
    display: inline-block;
    font-size: 12px;
    color: #b7b8bd;
    vertical-align: top;
  }

  .link {
    &:hover {
      color: rgb(76, 132, 255)
    }
  }
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

  .person {
    color: #4c84ff;
  }

  .text {
    margin-bottom: 0;
    margin-top: 12px;

    .timeRange {
      display: inline;
    }
  }

  ul {
    margin-left: -40px;
  }
}

.taskItem {
  + .taskItem {
    margin-top: 20px;
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
  margin-right: 40px;
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
}
</style>

