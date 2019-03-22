<template>
  <transition name="edit">
    <d2-container class="edit-panel" v-show="isVisible" v-loading="loading">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        <!--全部报工-团队成员-->
        历史报工
      </template>
      <div class="numall-area">
        <el-row>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">耗费总工时</p>
              <p class="value">{{totalData.costTimeNum||0}}<em>h</em></p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">任务总数</p>
              <p class="value">{{totalData.taskNum||0}}<em>个</em></p>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content-top">
              <p class="key">产品总数</p>
              <p class="value">{{totalData.productNum||0}}<em>项</em></p>
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
            <div class="inline-block">
              <span class="lab"> 当前统计周期：</span>
              <el-date-picker
                v-model="scope.form.searchStartEndDate"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                class="w70off"
              >
              </el-date-picker>
            </div>

            <div class="inline-block mr10">
              <span class="lab">OKR：</span>
              <el-select
                filterable
                clearable
                v-model="scope.form.okrId"
                placeholder="请选择"
                class="w70off"
              >
                <el-option
                  v-for="item in okrList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
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
          taskId:[],
          okrId:[]
        },
        projectList: [],
        okrList:[],
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

        //okr-下拉
        let okrVo={}
        this.$api.okr.dailyWork.getSearchConditionList(okrVo).then(res => {
          let resData = res.data.data;
          console.log(resData)
          this.okrList=[]
          resData.map(item => {
            this.okrList.push({ value: item.okrId, label: item.okrName })
          })
        })
      },
      back() {
        this.isVisible = false
        this.$emit("ok");
      },

      afterFetchData(){
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
      color: #409eff;
      em{    font-size: 20px;
        margin-left: 5px;
        vertical-align: 1px;
      }
    }
  }
  .el-col+.el-col .grid-content-top{border-left: 1px solid #e5e5e5;}
  .inline-block{
    display:inline-block;width: 370px;margin:5px 0;
    .lab{
      display: inline-block;min-width: 100px;text-align: right;
    }
    .w70off{
      width: 70%;
      box-sizing: border-box;
    }
  }
</style>

<style>
  .mr30{margin-right: 30px}
  .mr40{margin-right: 60px}
  .numall-area .table-filter .fl{line-height: 40px}
  .numall-area .table-filter .fwb{font-weight: bold}
  .numall-area .el-row{  background-color: #f2f9ff;
    border-radius: 3px;
    padding: 20px 0 0 0;}
  .numall-area .m-table-comb{padding:20px 0 0 0}
  .numall-area .el-table th {
    color: #333;
    background-color: #f9f9f9;
  }
</style>
