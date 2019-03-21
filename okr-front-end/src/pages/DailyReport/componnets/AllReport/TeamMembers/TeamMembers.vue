<template>
  <transition name="edit">
    <d2-container class="edit-panel" v-show="isVisible" v-loading="loading">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        <!--全部报工-团队成员-->
        历史报工
      </template>
      <div class="">
        <el-row>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">耗费总工时</p>
              <p class="value">{{totalData.costTimeNum||0}}h</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">任务总数</p>
              <p class="value">{{totalData.taskNum||0}}个</p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">产品总数</p>
              <p class="value">{{totalData.productNum||0}}项</p>
            </div>
          </el-col>
        </el-row>
        <!---->
        <template slot="footer"></template>
      </div>
    </d2-container>
  </transition>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "TeamMembers",
    mixins: [
      listMixin
    ],
    data() {
      return {
        isVisible:false,
        totalData:{
          costTimeNum:0,
          taskNum:0,
          productNum:0
        },
      };
    },
    computed: {

    },
    methods: {
      open(vo) {
        this.isVisible = true;
        this.loading = false;

      },
      back() {
        this.isVisible = false
        this.$emit("ok");
      },

    },
    mounted() {

    }
  };
</script>


<style type="text/scss" lang="scss" scoped>
  .grid-content-top{
    text-align: center;
    margin-bottom: 20px;
    .key{
      font-size: 14px;
      margin: 0;
      color:#aaa;
    }
    .value{
      margin:10px 0;
      font-size: 24px;
      font-weight: 700;
    }
  }
  .el-col+.el-col .grid-content-top{border-left: 1px solid #e5e5e5;}
</style>
