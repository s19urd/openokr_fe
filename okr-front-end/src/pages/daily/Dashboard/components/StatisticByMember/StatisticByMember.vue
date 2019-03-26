<template>
  <div>
    <div class="tab-content">
      <el-row>
        <el-col :span="12" style="padding:0  20px 0 0">
          <el-table
            header-row-class-name="gray"
            :data="tableData"
            :summary-method="getSummaries"
            show-summary
            style="width: 100%"
          >
            <el-table-column prop="orgName" label="部门" width="180"></el-table-column>
            <el-table-column prop="orgUserNum" label="人数"></el-table-column>
            <el-table-column prop="duration" label="工时"></el-table-column>
            <el-table-column prop="percentage" label="工时占比"></el-table-column>
          </el-table>
        </el-col>
        <el-col :span="12" style="position: relative;" v-if="searchParam.searchType==='0'">
          <div class="echart-pie-total">
            <span class="s-title">总工时</span>
            <span class="title">{{totalDuration}}h</span>
          </div>
          <div class="echart-sty1" id="echart-pie"></div>
        </el-col>

        <el-col :span="12" style="position: relative;" v-else>
          <div class="echart-sty1" id="echart-line"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import util from "@/libs/util.js";
export default {
  name: "statisticByMember",

  components: {},

  data() {
    return {
      searchParam: {},
      categoryId: "",
      pageData: [],
      chartData: {},
      pieChart: "",
      lineChart: "",
      totalDuration: 0
    };
  },
  computed: {
    tableData() {
      if (this.pageData.length == 0) {
        this.totalDuration = 0;
        return [];
      }
      let totalDuration = 0;
      this.pageData.map(item => {
        totalDuration += item.duration;
      });
      this.totalDuration = totalDuration;
      return this.pageData.map(item => {
        return {
          ...item,
          percentage: Math.round((item.duration / totalDuration) * 100) + "%"
        };
      });
    }
  },
  watch: {},
  methods: {
    //获取数据
    getData(vo) {
      this.searchParam = Object.assign({}, vo)
      console.log('searchParam')
      console.log(this.searchParam.searchType)
      let promise = {};

      if (this.searchParam.searchType === "0") {
        promise = this.$api.daily.weekly.getStatisticByOrg(this.searchParam);
        promise.then(res => {
          if (res.code === 0) {
            this.pageData = res.data;
            //渲染统计图表
            setTimeout(() => {
              this.drawPie();
            }, 100);
          }
        });
        return promise;
      }
      if (
        this.searchParam.searchType === "1" ||
        this.searchParam.searchType === "2"
      ) {
        promise = this.$api.daily.weekly.getStatisticChartByOrg(
          this.searchParam
        )
        promise.then(res => {
          if (res.code === 0) {
            this.chartData = res.data;
            console.log(this.chartData);
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
    drawPie() {
      if (!this.pieChart) {
        this.pieChart = this.$echarts.init(
          document.getElementById("echart-pie")
        );
      }
      let names = [];
      let data = [];
      let colors = [
        "#409EFF",
        "#67C23A",
        "#E6A23C",
        "#F56C6C",
        "#909399",
        "##FFEF40"
      ];
      //如果有数据
      if (this.pageData.length > 0) {
        data = this.pageData.map((item, index) => {
          names.push(item.orgName);
          return {
            value: item.duration,
            name: item.orgName
          };
        });
      } else {
        data = [
          {
            value: 0,
            name: "无数据"
          }
        ];
      }
      // 绘制图表
      this.pieChart.setOption({
        title: {
          text: "按照人员所属部门统计 " + this.searchParam.reportStartDateShow,
          textStyle: { fontWeight: 400, fontSize: "14px" }
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "350px",
          top: "middle",
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
      });
    },
    //渲染折线图
    drawLine() {
      if (!this.lineChart) {
        this.lineChart = this.$echarts.init(
          document.getElementById("echart-line")
        );
      }
      let names = [];
      let data = [];
      let _series = [];
      let colors = [
        "#409EFF",
        "#67C23A",
        "#E6A23C",
        "#F56C6C",
        "#909399",
        "##FFEF40"
      ];

      //如果有数据
      if (this.chartData) {
        console.log('12121212')
        console.log(this.chartData.lineSeriesData)

        this.chartData.lineSeriesData.map(item => {
          console.log(item)
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
        ];
      }
      console.log("2222");
      console.log(_series);

      this.lineChart.setOption({
        title: {
          text: "按照人员所属部门统计 " + this.searchParam.reportStartDateShow,
          textStyle: { fontWeight: 400, fontSize: "14px" }
        },
        tooltip: {
          trigger: "axis"
        },
        xAxis: {
          type: "category",
          name: "时间",
          data: this.pageData.xaxisData
        },
        yAxis: {
          type: "log",
          name: "工时/h",
          // min: "dataMin",
          // max: "dataMax"
        },
        legend: {
          orient: "vertical",
          left: "350px",
          top: "middle",
          data: names
        },
        color: colors,
        series: _series
      });
    },
    //表格统计
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "合计";
          return;
        }
        const values = data.map(item => Number(item[column.property]));
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
        } else {
          sums[index] = "100%";
        }
      });

      return sums;
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.el-table tr.gray th {
  background: #e4e7ed;
}
.echart-sty1 {
  width: calc(100% - 40px);
  height: 320px;
}
.echart-pie-total {
  position: absolute;
  left: 115px;
  top: 150px;
  width: 110px;
  text-align: center;
  span {
    display: block;
  }
  .s-title {
    font-size: 12px;
    color: #aaa;
    line-height: 25px;
  }
  .title {
    font-size: 30px;
    font-family: "Arial", sans-serif;
    line-height: 30px;
  }
}
</style>

