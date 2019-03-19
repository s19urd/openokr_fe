<template>
  <div class="TeamOKRPage">
    <div class="header clearfix">
      <p>
        <a class="link">日常报工</a>
        <i class="el-icon-arrow-right gray"></i>
        <a class="link">我的团队</a>
      </p>
      <el-form class="searchForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="团队名称:">
              <el-input placeholder="请输入关键字以查询" v-model="searchKey"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8" class="alginRight">
            <el-button type="primary" icon="el-icon-search" @click="serach()">搜索</el-button>
          </el-col>
        </el-row>
      </el-form>
    </div>

    <div class="card">
      <h4 class="name">团队名称： 园区宝贝事业部</h4>

      
      <div class="cardFooter">
        <div class="detail">
          <p>共<span>12</span>位成员</p>
          <p>共关联<span>12</span>项任务</p>
          <p>本月已占用<span>12.0</span>个工时</p>
        </div>

        <div class="arrow">
          <i class="el-icon-d-arrow-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: 'team-OKR',

      data () {
        return {
          searchKey: ''
        }
      },

      methods: {
        search () {
          console.log(this.searchKey)
        }
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
    }
  }
</style>
