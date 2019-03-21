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
        <table-comb
          name="团队成员历史报工列表"
          ref="tableMain"
          :search-model-base="tableMainSearchModelBase"
          :get-action="$api.okr.dailyWork.allDailyWork"
          :get-action-where="getActionWhere"
          :auto-fetch="true"
          :afterFetchData="afterFetchData"

        >
          <!--基础查询-->
          <template slot="baseSearchForm" slot-scope="scope">
            <div class="inline-block mr10">
              <span> 当前统计周期：</span>
              <el-date-picker
                v-model="scope.form.searchStartEndDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                style="width: 226px;"
              >
              </el-date-picker>
            </div>

          </template>
          <!--表格-->
          <template slot="tableColumns">
            <el-table-column
              prop="reportDay"
              label="报工日期"
              width="100px"
              fixed
            >
              <template slot-scope="props">
                {{props.row.reportDay | dateFormat('yyyy-MM-dd') }}
              </template>
            </el-table-column>
            <el-table-column
              prop="taskName"
              label="任务名称">
            </el-table-column>
            <el-table-column
              prop="productName"
              label="产品名称">
            </el-table-column>
            <el-table-column
              prop="categoryName"
              label="分摊类别"
              width="150px">
            </el-table-column>
            <el-table-column
              prop="reportUserName"
              label="填报人">
            </el-table-column>
            <el-table-column
              prop="jobType"
              label="人员岗位类型">
            </el-table-column>
            <el-table-column
              prop="teamName"
              label="所属团队">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="耗费工时（h）"
              width="120">
            </el-table-column>
            <el-table-column
              prop="auditStatus"
              label="当前状态"
              width="80"
              fixed="right"
            >
              <template slot-scope="props">
                <el-tag size="mini" v-if="props.row.auditStatus==='00'">待审核</el-tag>
                <el-tag size="mini" type="success" v-if="props.row.auditStatus==='01'">已确认</el-tag>
                <el-tag size="mini" type="danger" v-if="props.row.auditStatus==='02'">已驳回</el-tag>
              </template>
            </el-table-column>

          </template>
        </table-comb>
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
        tableMainSearchModelBase:{
          searchStartEndDate: [],
//          taskId:[],
        },
        projectList: [],
      };
    },
    computed: {
      getActionWhere(){
        return {
          reportStartDayStr:'',
          reportEndDayStr:'',
        }
      },
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

      afterFetchData(){
      },
    },
    mounted() {
      //任务名称
      this.$api.okr.dailyWork.queryTaskListByPage().then(res => {
        let resData = res.data.data
        resData.forEach(item => {
          this.projectList.push({ value: item.id, label: item.taskName })
        })
      })

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
  .inline-block{ display:inline-block;}
</style>
