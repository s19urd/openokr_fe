<template>
  <div>
    <div class="maps-layered">
      <dd class="maps-fc-list active">
        <i
          class="child-node-num"
          v-if="!itemInfo.showContent&&itemInfo.keys.length"
        >{{ itemInfo.keys.length }}</i>
        <div class="fc-view">
          <div class="fc-view-con clearfix">
            <i class="fc-view-tip">{{ itemInfo.layer }}</i>
            <div class="fc-view-text">
              <h4 class="title">
                <p>{{ itemInfo.orgName }}</p>
              </h4>
              <div v-show="itemInfo.progress" class="echart-pie" :id="chartId"></div>
              <i class="progress">{{itemInfo.progress}}</i>
            </div>
          </div>
          <div class="fc-view-object" v-if="itemInfo.objective">
            <i class="fc-view-tip">目标</i>
            <div class="title">{{ itemInfo.objective }}</div>
          </div>
          <div class="fc-view-foot">
            <strong class="txt-all text-primary" @click="toggleContent" v-if="itemInfo.keys.length">
              <span>{{ itemInfo.showContent ? '查看具体目标': '收起'}}</span>
              <img
                :class="{active: itemInfo.showContent}"
                class="icon icon-arrow-more"
                src="@/assets/okr/arrow-more.svg"
                alt
              >
            </strong>
          </div>
          <div class="fc-view-cb" v-if="itemInfo.showContent&&itemInfo.keys.length">
            <p v-for="item in itemInfo.keys" :key="item.key">{{ item.content }}</p>
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
      let complete = parseInt(this.itemInfo.progress);
      let inProgress = 100 - parseInt(this.itemInfo.progress);

      //绘制图表
      this.itemInfo.pieChart.setOption({
        color: colors,
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)"
        },

        series: [
          {
            type: "pie",
            radius: ["50%", "70%"],
            label: {
              normal: {
                show: false,
                position: "center",
                textStyle: {
                  fontFamily: "微软雅黑",
                  fontWeight: "normal",
                  fontSize: 12,
                  color: "#212121"
                }
              }
            },
            data: [
              { value: inProgress, name: "待完成" },
              { value: complete, name: "已完成" }
            ]
          }
        ]
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

.progress {
  position: absolute;
  right: 22px;
  top: 26px;
  font-size: 12px;
}

.echart-pie {
  width: 60px;
  height: 60px;
  display: inline-block;
  margin-top: -10px;
}

.fc-view-object {
  display: table;
  margin-bottom: 12px;
  margin-top: -18px;
  .fc-view-tip {
    float: none;
    display: table-cell;
  }
  .title {
    display: table-cell;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
  }
}

/* 画线*/

//去掉顶级父节点的线
.tree-map > ul > div > .maps-layered {
  &::after {
    border: none;
  }
  &::before {
    border: none;
  }

  .fc-view-text {
    position: relative;
    text-align: center;
    display: inline-block;
    vertical-align: middle;
    padding-left: 0;
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
  > .maps-layered::after {
    border-top: none;
  }
}
.item:first-child {
  > .maps-layered::before {
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
