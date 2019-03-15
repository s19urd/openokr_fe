<template>
  <div class="taskDetailPage positionAbsolute">
    <div class="header">
      <div class="collapseHeader_button">
        <el-button class="el-icon-back" @click="back">返回列表页面</el-button>
      </div>
      <div class="collapseHeader_intro alginRight">
        <div>
          <span class="taskName">任务名称或描述</span>
          <div class="text">
            <el-tag>{{ taskItem.timeRange }}</el-tag>
            <el-tag>jira编码:{{ taskItem.jiraNubmer }}</el-tag>由
            <span class="person">{{ taskItem.person }}</span>创建
          </div>
        </div>
      </div>
    </div>
    <div class="okrKeys">
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

    <div class="apportionTable">
      <el-table :data="taskItem.apportionTable" style="width: 100%">
        <el-table-column label="序号" type="expand" prop="number" width="180">
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
        </el-table-column>

        <el-table-column label="分摊名称" prop="name" width="180"></el-table-column>

        <el-table-column label="分摊类型" prop="type"></el-table-column>

        <el-table-column label="分摊比例" prop="apportion"></el-table-column>

        <el-table-column label="当前累计耗费工时(h)" prop="count"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "task-detail-page",

  data() {
    return {
      imageUrl_person: require("@/assets/okr/icon-ask_person.gif"),
      imageUrl_team: require("@/assets/okr/icon-ask_team.gif"),
      imageUrl_company: require("@/assets/okr/icon-ask_company.gif"),
      apportionTable: [
        {
          number: "1",
          name: "yy",
          type: "person",
          apportion: "3.0",
          count: "44",
          apportionList: [
            {
              name: "yy",
              workingHours: "12"
            },
            {
              name: "yZ",
              workingHours: "22"
            }
          ]
        }
      ]
    };
  },

  props: {
    taskItem: {
      type: Object,
      default() {
        return {
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
          ],
          apportionTable: [
            {
              number: "1",
              name: "yy",
              type: "person",
              apportion: "3.0",
              count: "44",
              apportionList: [
                {
                  name: "yy",
                  workingHours: "12"
                },
                {
                  name: "yZ",
                  workingHours: "22"
                }
              ]
            },
             {
              number: "1",
              name: "yy",
              type: "person",
              apportion: "3.0",
              count: "44",
              apportionList: [
                {
                  name: "yy",
                  workingHours: "12"
                },
                {
                  name: "yZ",
                  workingHours: "22"
                }
              ]
            }
          ]
        }
      }
    }
  },

  methods: {
    back () {
      this.$router.push({ name: 'CreateTask' })
    }
  }
}
</script>
<style lang="scss">
.taskDetailPage {
  padding: 40px 30px;
  max-width: 960px;
  margin: 0 auto;

  .okrKeys {
    li {
      color: #545454;
      font-size: 16px;
      margin-bottom: 10px;
    }
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
    }
  }

  .apportionTable {
    margin-top: 50px;
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

