<template>
  <div class="taskDetailPage">
    <div class="header">
      <div class="collapseHeader_button">
        <el-button class="el-icon-back">返回列表页面</el-button>
      </div>
      <div class="collapseHeader_intro">
        <span class="taskName">任务名称或描述</span>
        <div class="text"><el-tag>{{ taskItem.timeRange }}</el-tag> <el-tag>jira编码:{{ taskItem.jiraNubmer }}</el-tag>由<span class="person">{{ taskItem.person }}</span>创建 </div>
      </div>
    </div>
    <ul class="personal">
      <div class="icon icon-personal">
        <img :src="imageUrl_person">
        <span>我的</span>
      </div>
      <li v-for="(keyItem, index) in taskItem.personKeys" :key="index">
        <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
        <div class="personCount">共{{ keyItem.count }}人协同</div>
      </li>
    </ul>
    <ul class="team">
      <div class="icon icon-team">
        <img :src="imageUrl_team">
        <span>团队</span>
      </div>
      <li v-for="(keyItem, index) in taskItem.teamKeys" :key="index">
        <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
        <div class="personCount">共{{ keyItem.count }}人协同</div>
      </li>
    </ul>
    <ul class="company">
      <div class="icon icon-company">
        <img :src="imageUrl_company">
        <span>公司</span>
      </div>
      <li v-for="(keyItem, index) in taskItem.companyKeys" :key="index">
        <div class="keyText">{{ keyItem.index }}: {{ keyItem.text}}</div>
        <div class="personCount">共{{ keyItem.count }}人协同</div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "task-detail-page",

  data() {
    return {
      imageUrl_person: require("@/assets/okr/icon-ask_person.gif"),
      imageUrl_team: require("@/assets/okr/icon-ask_team.gif"),
      imageUrl_company: require("@/assets/okr/icon-ask_company.gif")
    };
  },

  props: {
    taskItem: {
      type: Object,
      default: {
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
    }
  }
};
</script>
<style lang="scss">
.taskDetailPage {
  padding: 40px 30px;
  max-width: 960px;
  margin: 0 auto;

  li {
    color: #545454;
    font-size: 16px;
    margin-bottom: 10px;
  }

  .header {
    display: flex;
    padding: 0 20px;
    margin-bottom: 35px;
    
    .collapseHeader {
      
      &_button {
        flex: 1;
      }

      &_intro {
        flex: 1;
      }
    }

    .text {
      margin-top: 20px;
    }
  }
}
.personal,
.team,
.company {
  position: relative;
  margin: 8px 0 0 70px;
  padding-bottom: 5px;
  border-bottom: 1px solid #483f3f2b;

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
</style>

