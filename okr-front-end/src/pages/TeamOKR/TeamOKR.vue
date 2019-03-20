<template>
  <div class="TeamOKRPage">
    <div class="header clearfix">
      <p>
        <a class="link">日常报工</a>
        <i class="el-icon-arrow-right gray"></i>
        <a class="link">我的团队</a>
      </p>
      <el-form class="">
        <el-row :gutter="20">
          <el-col :span="8" class="flex">
            <el-form-item label="团队名称:" class="inlineBlock">
              <el-input  placeholder="请输入关键字以查询" v-model="searchKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="search()">搜索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="card"
      v-for="(item, index) in teamOKRInfo"
      :key="index"
      >
      <h4 class="name">团队名称： {{ item.teamName }}</h4>
      
      <div class="cardFooter">
        <div class="detail">
          <p>共<span>{{ item.teamMemberNum }}</span>位成员</p>
          <p>共关联<span>{{ item.relTaskNum }}</span>项任务</p>
          <p>本月已占用<span>{{ item.totalWorkingHours }} h</span>个工时</p>
        </div>
<!-- 
        <div class="arrow">
          <i class="el-icon-d-arrow-right"></i>
        </div> -->
      </div>

      <!-- <el-dialog
        title="团队名称"
        :visible.sync="dialogVisible"
        width="50%"
       >
       <p>已用工时：<span>{{ item.totalWorkingHours }} h</span></p>
       <p>团队成员<span>{{ item.teamMemberNum }}</span>位:
          <template v-if="item.taskUserInfoVOS">
            <el-tag
              class="text"
              v-for="(item, index) in item.taskUserInfoVOS"
              :key="index"
            >
             {{ item.realName}}
            </el-tag>
          </template>
       </p>
       <div class="flex relTaskWrapper">
         <p class="title">
           关联任务<span>{{ item.relTaskNum }}</span>项:
         </p>
         <div class="relTaskNames" v-if="item.relTaskNames">
           <span
             class="text block"
             v-for="(item, index) in item.relTaskNames"
             :key="index"
           >
            {{ index+1 }}. {{ item }}
           </span>
         </div>
       </div>
      </el-dialog> -->
    </div>
  </div>
</template>
<script>
    export default {
      name: 'team-OKR',

      data () {
        return {
          searchKey: '',
          teamOKRInfo: [
            {
              teamName: '园区宝事业部',
              totalWorkingHours: '122',
              teamMemberNum: '4',
              relTaskNum: '12'
              // taskUserInfoVOS: [ 
              //   {id: '1', realName: 'test name'},
              //   {id: '1', realName: 'test name'},
              //   {id: '1', realName: 'test name'},
              //   {id: '1', realName: 'test name'},
              //   {id: '1', realName: 'test name'},
              //   {id: '1', realName: 'test name'}],
              // relTaskNames: ['test task name01', 'test task name02', 'test task name03']
            }
          ]
        }
      },

      methods: {
        search () {
          console.log(this.searchKey)
          this.$api.okr.task.queryTeamOKR(this.searchKey).then(res => {
            this.teamOKRInfo = res.data
            console.log(res.data)
          })
        }
      },

      mounted () {
        this.search()
      }
    }
</script>

<style lang="scss">
  .TeamOKRPage {
    padding: 8px 30px 30px;

    .card {
      border: solid 1px rgba(228, 228, 228, 1);
      width: 300px;
      color: #333333;
      font-weight: 600;
      padding: 12px;
      display: inline-block;
      margin: 10px;
      background: white;

      .name {
        font-size: 18px;
      }
      
      p {
        font-size: 12px;
        margin-bottom: 0;

        >span {
          font-weight: 700;
          font-size: 20px;
          color: #0099FF;
          margin-left: 6px;
          margin-right: 6px;
        }
      }

      .text {
        color: #606266;
        font-size: 14px;
        font-weight: 400;
        line-height: 32px;
        margin-bottom: 3px;
        margin-top: 3px;
      }

      .el-icon-d-arrow-right {
        color: #0099FF;
        font-size: 36px;
        align-self: flex-end;
      }

      .cardFooter {
        display: flex;
        justify-content: space-between;

        .arrow {
          display: inline-flex;
        }
      }

      .el-dialog__body {
        font-size: 14px;
        font-weight: 400;
        color: #333333;

        p {
          font-size: 16px;
        }

        .relTaskWrapper {
          align-items: baseline;
        }

        .relTaskNames {
          font-size: 16px;
          margin-left: 12px;
          margin-right: 12px;
        }
      }
    }
  }

  .flex {
    display: flex;
  }

  .block {
    display: block;
  }

  .inlineBlock {
    .el-form-item__content {
      display: inline-block;
    }
  }
</style>
