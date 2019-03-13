<template>
  <div class="createTaskWapper">
    <div class="header clearfix">
      <p> <a class="link">OKR管理系统</a>  <i class="el-icon-arrow-right gray"></i> <a class="link">创建任务</a> </p>
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
              prefix-icon="el-icon-date">
            </el-date-picker>
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

    <div class="taskList">
      <el-collapse accordion v-for="(item, index) in taskList" :key="index">
        <el-collapse-item name="1">
          <template slot="title">
            <div class="collapseHeader">
              <div class="collapseHeader_left">
                <span class="taskName">任务名称或描述</span>
                <div><el-tag>{{ item.timeRange }}</el-tag> <el-tag>jira编码:{{ item.jiraNubmer }}</el-tag>由<span class="person">{{ item.person }}</span>创建 </div>
              </div>
              <div class="collapseHeader_right">
                <el-button class="el-icon-delete">删除</el-button>
                <p class="resetP">共<span class="count">{{ item.count }}</span>条关联的kr</p>
              </div>
            </div>
          </template>
          <ul class="personal">
            <div class="icon icon-personal">
              <img :src="imageUrl_person" />
              <span>我的</span>
            </div>
             <li v-for="(keyItem, index) in item.personKeys" :key="index">
              <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
              <div class="personCount">共{{ keyItem.count }}人协同</div>
            </li>
          </ul>
          <ul class="team">
            <div class="icon icon-team">
              <img :src="imageUrl_team" />
              <span>团队</span>
            </div>
            <li v-for="(keyItem, index) in item.teamKeys" :key="index">
              <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
              <div class="personCount">共{{ keyItem.count }}人协同</div>
            </li>
          </ul>
          <ul class="company">
            <div class="icon icon-company">
              <img :src="imageUrl_company" />
              <span>公司</span>
            </div>
            <li v-for="(keyItem, index) in item.companyKeys" :key="index">
              <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
              <div class="personCount">共{{ keyItem.count }}人协同</div>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
    </div>

    <create-task-form
      :dialog-visible.sync="isShow">
    </create-task-form>
  </div>
</template>
<script>
  import createTaskForm from './Components/CreateTaskForm'
  export default {
    name: 'create-task',

    components: {
      createTaskForm
    },

    data () {
      return {
        imageUrl_person: require('@/assets/okr/icon-ask_person.gif'),
        imageUrl_team: require('@/assets/okr/icon-ask_team.gif'),
        imageUrl_company: require('@/assets/okr/icon-ask_company.gif'),
        searchForm: {
          keyWord: '',
          time: ''
        },

        taskList: [
          {
            timeRange: '2019.01.12～2019.02.19',
            jiraNubmer: 'XXXXXXXXXXX',
            person: '张明烽',
            count: '4',
            personKeys:[
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上', count: 3}
            ],
            teamKeys: [
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上', count: 3}
            ],
            companyKeys: [
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上', count: 3}
            ]
          },
          {
            timeRange: '2019.01.12～2019.02.19',
            jiraNubmer: 'XXXXXXXXXXX',
            person: '张明烽',
            count: '4',
            personKeys:[
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到1个以上', count: 3}
            ],
            teamKeys: [
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到2个以上', count: 3}
            ],
            companyKeys: [
              {index: 'k1', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上', count: 3},
              {index: 'k2', text: '加快产品反馈收集和迭代速度，每月核心体验优化点达到5个以上', count: 3}
            ]
          }
        ],

        isShow: false
      }
    },

    methods: {
      createTask () {
        this.isShow = true
      }
    }
  }
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

  .el-collapse-item__header {
    display: flex;
    justify-content: space-between;
    height: auto;
    padding: 5px 20px;

    .collapseHeader {
      display: inline-flex;
      flex: 32;
      
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
      }

      .count {
        color: #4c84ff;
        font-size: 18px;
        margin-left: 2px;
        margin-right: 2px;
      }
    }

    .el-icon-arrow-right {
      flex: 1;
      margin-left: 20px;
    }

    .person {
      color: #4c84ff;
    }
    
  }

  .el-collapse-item__wrap {
    padding: 5px 20px;
  }

  .personal,
  .team,
  .company {
    position: relative;
    margin: 8px 0 0 70px;
    padding-bottom: 5px;
    border-bottom: 1px solid #f3f3f3;

    .icon {
      position: absolute;
      top: 3px;
      left: -40px;
      width: 30px;
      text-align: center;
      font-size: 12px;
      z-index: 2;

      > span {
        display: block;
      }

      &.icon-person {
        color: #4c84ff;
      }

      &.icon-team {
        color: #46c384;
      }

      &.icon-company {
        color: #f67e7f;
      }
    }

    li {
      display: flex;
      justify-content: space-between;
    }
  }

  .el-collapse {
    + .el-collapse {
      margin-top: 20px;
    }
  }
</style>

