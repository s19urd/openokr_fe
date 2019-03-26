<template>
  <div class="taskDetailPage positionAbsolute">
    <div class="header">
      <div class="collapseHeader_intro">
        <span class="taskName">{{ taskVO.taskName }}</span>
        <div class="basicInfo" v-if="taskVO.taskStartTime && taskVO.taskEndTime">
          <el-tag>任务周期：{{ taskVO.taskStartTime }} ~ {{ taskVO.taskEndTime }}</el-tag>
          <el-tag>jira编码:{{ taskVO.jiraLabel }}</el-tag>由
          <span class="person">{{ taskVO.createUserName || '由系统导入' }} </span>创建
        </div>
      </div>
      <div class="collapseHeader_button">
        <el-button class="el-icon-back" @click="back">返回</el-button>
      </div>
    </div>
    <div class="okrKeys">
      <ul class="personal" v-if ="taskDetailInfo.personKeys && taskDetailInfo.personKeys.length > 0">
        <div class="icon icon-personal">
          <img :src="imageUrl_person">
          <span>我的</span>
        </div>
        <li v-for="(keyItem, index) in taskDetailInfo.personKeys" :key="index">
          <div class="keyText">k{{ index+1 }}: {{ keyItem.text}}</div>
          <div class="personCount">共{{ keyItem.count }}人协同</div>
        </li>
      </ul>
      <ul class="team" v-if ="taskDetailInfo.teamKeys && taskDetailInfo.teamKeys.length > 0">
        <div class="icon icon-team">
          <img :src="imageUrl_team">
          <span>团队</span>
        </div>
        <li v-for="(keyItem, index) in taskDetailInfo.teamKeys" :key="index">
          <div class="keyText">K{{ index+1 }}: {{ keyItem.text}}</div>
          <div class="personCount">共{{ keyItem.count }}人协同</div>
        </li>
      </ul>
      <ul class="company" v-if ="taskDetailInfo.companyKeys && taskDetailInfo.companyKeys.length > 0">
        <div class="icon icon-company">
          <img :src="imageUrl_company">
          <span>公司</span>
        </div>
        <li v-for="(keyItem, index) in taskDetailInfo.companyKeys" :key="index">
          <div class="keyText">k{{ index+1 }}: {{ keyItem.text}}</div>
          <div class="personCount">共{{ keyItem.count }}人协同</div>
        </li>
      </ul>
    </div>

    <div class="apportionTable">
      <el-table :data="taskDetailInfo.apportionVOS" style="width: 100%">
        <!-- <el-table-column label="序号" type="expand" prop="number" width="180">
          <template slot-scope="props">
            <ul>
              <li
                v-for="(item, index) in props.row.apportionList"
                :key="index"
                class="approtionDetail"
              >
                <span>{{ item.name }}</span>
                <span>{{ item.workingHours }}</span>
              </li>
            </ul>
          </template>
        </el-table-column> -->

        <el-table-column label="分摊名称" prop="apportionName" width="180"></el-table-column>

        <el-table-column label="分摊类型" prop="categoryName"></el-table-column>

        <el-table-column label="分摊比例(%)" prop="apportionRate"></el-table-column>

        <el-table-column label="当前累计耗费工时(h)" prop="totalWorkingHours"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { timestampsToDate } from  '../../../libs/helper'
export default {
  name: "task-detail-page",

  data() {
    return {
      imageUrl_person: require("@/assets/okr/icon-ask_person.gif"),
      imageUrl_team: require("@/assets/okr/icon-ask_team.gif"),
      imageUrl_company: require("@/assets/okr/icon-ask_company.gif"),
      apportionTable: [],
      taskDetailInfo: {},
      taskVO: {},
      personKeys: []
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'CreateTask' })
    }
  },

  mounted () {
    let taskId = this.$route.params.id
    this.$api.okr.task.getTaskDetailInfo(taskId).then(res=> {
      this.taskDetailInfo = res.data
      this.personKeys = res.data.personKeys
      this.taskVO = res.data.taskVO
      this.taskVO.taskStartTime = timestampsToDate(this.taskVO.taskStartTime)
      this.taskVO.taskEndTime = timestampsToDate(this.taskVO.taskEndTime)
    })
  }
}
</script>
<style lang="scss">
.taskDetailPage {
  padding: 40px 20px;
  margin: 0 auto;
  font-size: 14px;

  .el-tag {
    margin-right: 10px;
  }

  .okrKeys {
    li {
      color: #545454;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }

  .header {
    display: flex;
    margin-bottom: 30px;

    .collapseHeader {

      &_intro {
        flex: 1;

        .taskName {
          font-size: 18px;
          font-weight: bold;
          line-height: 32px;
          color: rgb(33, 33, 33)
        }
      }
    }

   .person {
      color: #4c84ff;
    }

    .text {
      margin-top: 20px;

      .basicInfo {
        margin-bottom: 20px;
      }
    }
  }

  .apportionTable {
    margin-top: 30px;
    background-color: rgb(245, 245, 245);
    padding: 4px;
    border-radius: 4px;

    .el-table {
      td {
        font-size: 16px;
        line-height: 36px;
        padding-top: 10px;
      }

      &__expanded-cell {
        background: rgba(229, 229, 229, 0.45);
      }
    }

    ul {
      padding-left: 140px;
      padding-right: 126px;
      margin: 0;
    }

    .approtionDetail {
      display: flex;
      justify-content: space-between;
    }
  }
}
.personal,
.team,
.company {
  position: relative;
  margin: 8px 0 0 38px;
  padding-bottom: 5px;
  border-bottom: 1px solid #483f3f2b;
  min-height: 40px;

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
.el-tag {
  margin-right: .2rem;
}
</style>

