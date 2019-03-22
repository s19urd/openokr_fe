<template>
  <div>
    <div class="tab-content">
      <el-row>
        <el-col :span="12"  style="padding: 20px">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              :render-header="getHeader"
              width="180">
            </el-table-column>
            <el-table-column
              prop="工时"
              label="工时"
              width="180">
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
    name: "Dashboard",

    components: {
    },

    data() {
      return {
        //页面类型
        weekSearchType:'1',
        tableData:[],
        echartData:[]
      };
    },
    computed:{

    },
    watch:{

    },
    methods: {
      //获取表头
      getHeader(h){
        let weekSearchType = this.weekSearchType;
        return h('span', [
          weekSearchType==='1'?'产品':'客户定制',
          h('span', {
            class:'change-btn',
            domProps:{
              innerHTML:'切换到'+(weekSearchType==='2'?'产品':'客户定制')
            },
            on: {
              click:() => {
                this.weekSearchType= this.weekSearchType==='1'?'2':'1';
                this.getData();
              }
            }
          })
        ])
      },
      //获取数据
      getData(vo){
        let res = {
          code:0
        }
        return new Promise((resolve) => {
          resolve(res)
        })
      },
    },
    mounted () {

    }
  };
</script>

<style lang="scss">

</style>

