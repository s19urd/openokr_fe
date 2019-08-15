<template>
  <div class="maps-layered">
    <dd class="maps-fc-list active">
      <i class="child-node-num">{{ itemInfo.Objectives.length || 0 }}</i>
      <div class="fc-view">
        <div class="fc-view-con clearfix">
          <i class="fc-view-tip">{{ itemInfo.layer }}</i>
          <div class="fc-view-text">
            <h4 class="title">
              <p>{{ itemInfo.name }}</p>
            </h4>
            <div class="echart-pie" id="echart-pie-progress"></div>
          </div>
        </div>
        <div class="fc-view-foot">
          <strong class="txt-all text-primary" @click="toggleContent">
            <span>{{ itemInfo.showContent ? '查看具体目标': '收起'}}</span>
            <img
              :class="{active: itemInfo.showContent}"
              class="icon icon-arrow-more"
              src="@/assets/okr/arrow-more.svg"
              alt
            >
          </strong>
        </div>
        <div class="fc-view-cb" v-if="itemInfo.showContent">
          <p v-for="item in itemInfo.Objectives" :key="item.key">{{ item.content }}</p>
        </div>
      </div>
    </dd>
  </div>
</template>
<script>
import echarts from "echarts";
import Vue from "vue";
Vue.prototype.$echarts = echarts;
export default {
  name: "board-map-item",

  data() {
    return {
      // itemInfo: {
      //   layer: "公司",
      //   name: "厦门商集目标",
      //   progress: "68%",
      //   Objectives: [
      //     { key: "1", content: "加快产品反馈收集和迭代速度..." },
      //     { key: "2", content: "销售线索增加100%..." },
      //     { key: "3", content: "新客户签约成功率达到60%以上" }
      //   ],
      //   showContent: false,
      //   pieChart: ""
      // }
    };
  },

  props: {
      itemInfo: {
        type: Object,
        required: true
      }
  },

  methods: {
    toggleContent() {
      this.itemInfo.showContent = !this.itemInfo.showContent;
    },
    //渲染饼图
    drawPie() {
      if (!this.itemInfo.pieChart) {
        this.itemInfo.pieChart = this.$echarts.init(
          document.getElementById("echart-pie-progress")
        );
      }

      let colors = ["#F57677", "#DEDEDE"];

      //绘制图表
      this.itemInfo.pieChart.setOption({
        color: colors,
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },

        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                show: true,
                position: "center",
                formatter: "{d}%",
                textStyle: {
                  fontFamily: "微软雅黑",
                  fontWeight: "normal",
                  fontSize: 12,
                  color: "#212121"
                }
              }
            },

            data: [{ value: 32, name: "待完成" }, { value: 68, name: "已完成" }]
          }
        ],
        avoidLabelOverlap: false,
        labelLine: {
          normal: {
            show: false
          }
        }
      });
    }
  },

  mounted() {
    this.drawPie();
  }
};
</script>
<style lang="scss">
/*========= okr地图 ==========*/
.text-primary {
  color: #4c84ff !important;
}
.icon-arrow-more {
  width: 22px;
  height: 24px;
  vertical-align: middle;

  &.active {
    transform: rotate(-180deg);
  }
}

.echart-pie {
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-top: -10px;
}
</style>
