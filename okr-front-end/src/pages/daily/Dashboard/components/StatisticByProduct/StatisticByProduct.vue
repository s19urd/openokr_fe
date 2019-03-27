<template>
  <div>
    <div class="tab-content productChart">
      <el-row>
        <el-col :span="12">
          <el-table
            header-row-class-name="gray"
            :data="tableData"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%"
            class="tableData"
            >
            <el-table-column
              prop="taskName"
              :render-header="getHeader"
              width="300">
            </el-table-column>
            <el-table-column
              prop="duration"
              label="工时"
              width="200">
            </el-table-column>
            <el-table-column
              prop="percentage"
              label="工时占比"
              width="180">
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" style="position: relative;" v-show="searchParam.searchType==='0'">
          <div class="echart-pie-total">
            <span class="s-title">总工时</span>
            <span class="title">{{ totalDuration }}h</span>
          </div>
          <div class="echart-sty1" id="echart-pie-product" style="width:100%; min-height: 400px"></div>
        </el-col>
        <el-col :span="12" style="position: relative;" v-show="searchParam.searchType ==='1' || searchParam.searchType ==='2'">
          <div class="echart-sty1" id="echart-line-product" style="width:100%; min-height: 400px"></div>
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
        weekSearchType: '00',
        echartData:[],
        searchParam: {},
        totalDuration: 0,
        pageData: [],
        pieChart: '',
        chartData: {},
        lineChart: ""
      };
    },
    computed:{
      tableData () {
        if (this.pageData.length === 0) {
          this.totalDuration = 0
          return []
        }

        let totalDuration = 0
        this.pageData.map(item => {
          totalDuration += item.duration
        })
        this.totalDuration = totalDuration
        return this.pageData.map(item => {
          return {
            ...item,
            percentage: Math.round((item.duration / totalDuration) * 100) + '%'
          }
        })
      }
    },
    methods: {
      //获取表头
      getHeader(h){
        let weekSearchType = this.weekSearchType;
        return h('span', [
          weekSearchType === '00' ? '产品' : '客户定制',
          h('span', {
            class:'change-btn',
            domProps:{
              innerHTML:'切换到'+(weekSearchType === '01' ? '产品规划' : '客户定制')
            },
            on: {
              click:() => {
                this.weekSearchType= this.weekSearchType === '01' ? '00':'01';
                console.log('222')
                this.getData()
                console.log('444')
              }
            }
          })
        ])
      },
      //表格统计
      getSummaries (param) {
        console.log(param)
        const { columns, data } = param
        const sums = []
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = "合计"
            return;
          }

          const values = data.map(item => Number(item[column.property]))
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            },0 )
          } else {
            sums[index] = "100%"
          }
        })

        return sums
      },
      //获取数据
      getData (vo){
        this.searchParam = Object.assign({}, vo)
        this.searchParam.categoryId = this.weekSearchType
        console.log(this.searchParam)
        let promise = {}
        if (this.searchParam.searchType === "0") {
          promise = this.$api.daily.weekly.getStatisticByTask(this.searchParam)
          promise.then(res => {
            if (res.code === 0) {
              this.pageData = res.data
              //渲染统计图表
              setTimeout(() => {
                this.drawPie()
              }, 100)
            }
          })
          return promise
        }

        if (
          this.searchParam.searchType === "1" ||
          this.searchParam.searchType === "2"
        ) {
          promise = this.$api.daily.weekly.getStatisticChartByTask(
            this.searchParam
          )
          promise.then(res => {
            if (res.code === 0) {
              this.chartData = res.data;
              //渲染统计图表
              setTimeout(() => {
                this.drawLine();
              }, 100);
            }
          });
          return promise;
        }
       
      },

      //渲染饼图
      drawPie () {
        if (!this.pieChart) {
          this.pieChart = this.$echarts.init(
            document.getElementById("echart-pie-product")
          )
        }
        let names = []
        let data = []
        let colors = [
          "#409EFF",
          "#67C23A",
          "#E6A23C",
          "#F56C6C",
          "#909399",
          "#FFEF40",
          "#F5FC6C",
        ]
        //如果有数据
        if (this.pageData.length > 0) {
          data = this.pageData.map((item, index) => {
            names.push(item.taskName)
            return {
              value: item.duration,
              name: item.taskName
            }
          })
        } else {
          data = [
            {
              value: 0,
              name: '无数据'
            }
          ]
        }
        //绘制图表
        this.pieChart.setOption({
          title: {
            text: "按照产品/客户定制统计 " + this.searchParam.reportStartDateShow,
            textStyle: { fontWeight: 400, fontSize: "14px" }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
          orient: "vertical",
            left: "300px",
            top: "top",
            data: names
          },
          color: colors,
          series: [
            {
              x: "center",
              name: "工时",
              type: "pie",
              label: {
                show: false
              },
              radius: [80, 100],
              center: ["150px", "160px"],
              data: data
            }
          ]
        })
      },
      //渲染折线图
      drawLine () {
        if (!this.lineChart) {
          this.lineChart = this.$echarts.init(
            document.getElementById("echart-line-product")
          )
        }
        let names = []
        let data = []
        let _series = []
        let _xAxisData = []
        let _xAxisName = ''
        let colors = [
          "#409EFF",
          "#67C23A",
          "#E6A23C",
          "#F56C6C",
          "#909399",
          "##FFEF40"
        ]

        //如果有数据
         if (this.chartData) {
        let xaxisDataLen = this.chartData.xaxisData.length

        if (this.searchParam.searchType === '1') {
          for ( let i=1; i< xaxisDataLen; i++ ) {
            _xAxisData.push(`${this.searchParam.reportStartDateShow}第${i}周`)
          }
          _xAxisName = '时间/周'
        }

        if (this.searchParam.searchType === '2') {
          for ( let i=1; i< xaxisDataLen; i++ ) {
            _xAxisData.push(`${this.searchParam.reportStartDateShow}第${i}月`)
          }
          _xAxisName = '时间/月'
        }

        this.chartData.lineSeriesData.map(item => {
          _series.push({
            name: item.name,
            type: "line",
            data: item.data
          })
          })
        } else {
          data = [
            {
              value: 0,
              name: "无数据"
            }
          ]
        } 

        setTimeout(()=> {
          this.lineChart.setOption({
          title: {
            text: "按照人员所属部门统计：" + this.searchParam.reportStartDateShow,
            textStyle: { fontWeight: 400, fontSize: "14px" }
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: 'cross'
            },
            backgroundColor: 'rgba(245, 245, 245, 0.8)',
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            textStyle: {
              color: '#000'
            }
          },
          xAxis: {
            type: "category",
            name:  _xAxisName ,
            data: _xAxisData
          },
          yAxis: {
            type: "value",
            name: "工时/小时"
          },
          legend: {
            orient: "vertical",
            left: "350px",
            top: "middle",
            data: names
          },
          color: colors,
          series: _series
        })
        }, 0)
      }
    },
    watch:{

    },
    mounted () {

    }
  };
</script>

<style lang="scss">
  .el-table {
    &.tableData
    &::before {
      height: 0;
    }
  }
</style>

