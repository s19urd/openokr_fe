<template>
  <div>
    <div class="maps-layered">
      <dd class="maps-fc-list active">
        <i class="child-node-num" v-if="!itemInfo.showContent">{{ itemInfo.objectives.length || 0 }}</i>
        <div class="fc-view">
          <div class="fc-view-con clearfix">
            <i class="fc-view-tip">{{ itemInfo.layer }}</i>
            <div class="fc-view-text">
              <h4 class="title">
                <p>{{ itemInfo.label }}</p>
              </h4>
              <div class="echart-pie" :id="chartId"></div>
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
            <p v-for="item in itemInfo.objectives" :key="item.key">{{ item.content }}</p>
          </div>
        </div>
      </dd>
    </div>
    <ul v-if="hasChild" class="layers">
      <board-map-item
        v-for="(item, index) in itemInfo.children"
        :key="index"
        :itemInfo="item"
        class="item"
      ></board-map-item>
    </ul>
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
      chartId: Math.random()
    };
  },

  computed: {
    hasChild() {
      return this.itemInfo.children && this.itemInfo.children.length;
    }
  },

  props: {
    itemInfo: {
      type: [Object, Array],
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
          document.getElementById(this.chartId)
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
.layers {
  display: table;
  .item {
    display: table-cell;
    vertical-align: top;
  }
}
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

/* 画线*/

//去掉顶级父节点的线
.tree-map>ul>div>.maps-layered {
  &::after {
    border: none;
  }
  &::before {
    border: none;
  }
}

.maps-layered {
  position: relative;
  padding-top: 20px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    right: 50%;
    width: 50%;
    height: 20px;
    border-right: 1px solid #ddd;
    border-top: solid 1px #ddd;
  }

  &::after {
    content: "";
    position: absolute;
    left: 50%;
    width: 50%;
    border-top: 1px solid #ddd;
    top: 0;
  }
}

.item:last-child {
  >.maps-layered::after {
    border-top: none;
  }
}
.item:first-child {
   >.maps-layered::before {
    border-top: none;
  }
}

.layers {
  position: relative;

  > .item::before,
  > .item::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 50%;
    height: 30px;
    // border-bottom: 1px solid #ddd;
  }

  > .item::after {
    left: 50%;
    border-left: 1px solid #ddd;
  }

}
</style>
