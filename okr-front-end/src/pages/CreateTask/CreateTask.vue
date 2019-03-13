<template>
  <div class="createTaskWapper">
    <div class="header clearfix">
      <p>
        <a class="link">OKR管理系统</a>
        <i class="el-icon-arrow-right gray"></i>
        <a class="link">创建任务</a>
      </p>
      <el-form class="searchForm">
        <el-col :span="6">
          <el-form-item label="关键字:">
            <el-input placeholder="请输入" v-model="searchForm.keyWord"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-form-item label="创建日期:">
            <el-date-picker
              v-model="searchForm.time"
              type="date"
              palceholder="请选择时间"
              prefix-icon="el-icon-date"
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="createTask">+ 创建任务</el-button>
        </el-col>
      </el-form>
    </div>

    <ul class="taskList">
      <li class="taskItem" v-for="(item, index) in taskList" :key="index">
        <div class="collapseHeader_left">
          <span class="taskName">任务名称或描述</span>
          <div class="text">
            <el-tag>{{ item.timeRange }}</el-tag>
            <el-tag>jira编码:{{ item.jiraNubmer }}</el-tag>由
            <span class="person">{{ item.person }}</span>创建
          </div>
        </div>
        <div class="collapseHeader_right">
          <el-button class="el-icon-delete">删除</el-button>
          <el-button class="el-icon-more">查看详情</el-button>
          <p class="text">共
            <span class="count">{{ item.count }}</span>条关联的kr
          </p>
        </div>
      </li>
    </ul>

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
      searchForm: {
        keyWord: "",
        time: ""
      },

      taskList: [
        {
          timeRange: "2019.01.12～2019.02.19",
          jiraNubmer: "XXXXXXXXXXX",
          person: "张明烽",
          count: "4",
          personKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上",
              count: 3
            }
          ],
          teamKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上",
              count: 3
            }
          ],
          companyKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上",
              count: 3
            }
          ]
        },
        {
          timeRange: "2019.01.12～2019.02.19",
          jiraNubmer: "XXXXXXXXXXX",
          person: "张明烽",
          count: "4",
          personKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上",
              count: 3
            }
          ],
          teamKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上",
              count: 3
            }
          ],
          companyKeys: [
            {
              index: "k1",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上",
              count: 3
            },
            {
              index: "k2",
              text: "加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上",
              count: 3
            }
          ]
        }
      ],

      isShow: false
    };
  },

  methods: {
    createTask() {
      this.isShow = true;
    }
  }
};
</script>

<style lang="scss">
.createTaskWapper {
  padding: 8px 30px 30px;
}

.header {
  .link,
  .arrow {
    display: inline-block;
    font-size: 12px;
    color: #b7b8bd;
    vertical-align: top;
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
</style>

