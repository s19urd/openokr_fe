<template>
  <div class="createTaskWapper positionAbsolute">
    <div class="header clearfix">
      <p>
        <a class="link">OKR管理系统</a>
        <i class="el-icon-arrow-right gray"></i>
        <a class="link">创建任务</a>
      </p>
      <el-form class="searchForm">
        <el-row>
          <el-col :span="5">
            <el-form-item label="关键字:">
              <el-input placeholder="请输入" v-model="searchForm.searchKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
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
          </el-col>
          <el-col :span="4" class="alginRight">
            <el-button type="primary" icon="el-icon-search" @click="serach(searchForm)">搜索</el-button>
          </el-col>
          <el-col :span="4" class="alginRight">
            <el-button type="primary" @click="createTask">+ 创建任务</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <ul class="taskList">
      <li class="taskItem" v-for="(item, index) in taskList" :key="index">
        <div class="collapseHeader_left">
          <span class="taskName" v-text="item.taskName"></span>
          <div class="text">
            <el-tag>{{ item.taskStartTime }}</el-tag> ~ <el-tag>{{ item.taskEndTime }}</el-tag>
            <el-tag>jira编码:{{ item.jiraLabel }}</el-tag>由
            <span class="person">{{ item.createUserName }}</span>创建
          </div>
        </div>
        <div class="collapseHeader_right">
          <el-button class="el-icon-delete" @click="deleteItem(item, index)"> 删除</el-button>
          <el-button class="el-icon-more" @click="openDetailPage(item.taskCode)"> 查看详情</el-button>
          <p class="text">共
            <span class="count">{{ item.count }}</span>条关联的kr
          </p>
        </div>

        <el-dialog
          title="提示"
          :visible.sync="tipDialogVisible"
          class="warning"
          width="30%">
          <span><i class="el-icon-warning"></i>删除后将无法恢复，确认删除吗？</span>
          <span slot="footer" class="dialog-footer">
            <el-button @click="tipDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="confirm(item, index)">确 定</el-button>
          </span>
        </el-dialog>
      </li>
    </ul>

    <el-pagination
      ref="pagination"
      :page-size="searchForm.pageSize"
      layout="prev, pager, next"
      :total="totalPage"
      @current-change="fetchData"
      class="alginCenter">  
    </el-pagination>

    <create-task-form :dialog-visible.sync="isShow"></create-task-form>
  </div>
</template>
<script>
import createTaskForm from "./Components/CreateTaskForm";
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

      isShow: false
    };
  },

  methods: {
    createTask() {
      this.isShow = true;
    },

    deleteItem () {
      this.tipDialogVisible = true
    },

    openDetailPage (taskCode) {
      this.$router.push({ name : 'TaskDetailPage', params: { id: taskCode } })
    },
    
    confirm (item, index) {
      this.tipDialogVisible = false
      this.taskList.splice(index, 1)
    },

    serach (searchForm) {
      this.$api.okr.task.getTaskListByPage(searchForm).then(res =>{
        this.taskList = res.data.data
        this.totalPage = res.data.totalPage
      })
    },
    
    fetchData (pageIndex) {
      console.log(pageIndex)
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
</style>

