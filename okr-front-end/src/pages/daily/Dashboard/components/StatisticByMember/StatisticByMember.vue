<template>
  <div>
    <div class="tab-content">
      <el-row>
        <el-col :span="12"  style="padding: 20px">
          <el-table
            header-row-class-name="gray"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="部门"
              width="180">
            </el-table-column>
            <el-table-column
              prop="date"
              label="人数">
            </el-table-column>
            <el-table-column
              prop="date"
              label="工时">
            </el-table-column>
            <el-table-column
              prop="address"
              label="工时占比">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" style="padding: 40px">
          <div class="echart-sty1" id="echart-pie" style="width:100%; min-height: 400px"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue'
  import util from '@/libs/util.js'
  import echarts from 'echarts'
  Vue.prototype.$echarts = echarts;
  export default {
    name: "statisticByMember",

    components: {
    },

    data() {
      return {
        searchParam:{},
        categoryId:'',
        tableData:[],
        echartData:[]
      };
    },
    computed:{
    },
    watch:{

    },
    methods: {
      //获取数据
      getData(vo){
        console.log(vo);
        this.searchParam = vo;
        let promise = this.$api.daily.weekly.getStatisticByOrg(this.searchParam);
        promise.then(res=> {
          if (res.code === 0) {
            this.$message.success('测试')
          }
        })
        return promise;
      },
    },
    mounted () {

    }
  };
</script>

<style lang="scss">
.gray{
  background: #eee;
}
</style>

