<template>
  <div class="tree" :style="{width: viewWidth + 'px'}">
    <board-map-list :data="data"></board-map-list>
    <canvas
      id="myCanvas"
      width="400px"
      height="300px"
      style="border: 1px solid red;"
    >您的浏览器不支持canvas标签。</canvas>
  </div>
</template>
<script>
var myData = [
  {
    id: 0,
    layer: "公司",
    name: "厦门商集目标0",
    progress: "68%",
    objectives: [
      { key: "1", content: "加快产品反馈收集和迭代速度..." },
      { key: "2", content: "销售线索增加100%..." },
      { key: "3", content: "新客户签约成功率达到60%以上" }
    ],
    showContent: false,
    pieChart: "",
    children: [
      {
        id: 1,
        layer: "公司",
        name: "厦门商集目标1",
        progress: "68%",
        objectives: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ],
        showContent: false,
        pieChart: "",
        children: [
          {
            id: 6,
            layer: "公司",
            name: "厦门商集目标4",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          },
          {
            id: 7,
            layer: "公司",
            name: "厦门商集目标5",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          }
        ]
      },
      {
        id: 2,
        layer: "公司",
        name: "厦门商集目标2",
        progress: "68%",
        objectives: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ],
        showContent: false,
        pieChart: "",
        children: [
          {
            id: 6,
            layer: "公司",
            name: "厦门商集目标6",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          },
          {
            id: 7,
            layer: "公司",
            name: "厦门商集目标7",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          }
        ]
      },
      {
        id: 3,
        layer: "公司",
        name: "厦门商集目标3",
        progress: "68%",
        objectives: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ],
        showContent: false,
        pieChart: "",
        children: [
          {
            id: 4,
            layer: "公司",
            name: "厦门商集目标1",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          },
          {
            id: 5,
            layer: "公司",
            name: "厦门商集目标8",
            progress: "68%",
            objectives: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ],
            showContent: false,
            pieChart: ""
          }
        ]
      }
    ]
  }]
;
import BoardMapList from "./Components/BoardMapList";
export default {
  name: "board-map-test",
  components: {
    BoardMapList
  },

  data() {
    return {
      data: myData,
      maxLayerItems: 0,
      flag: false,
      viewWidth: 0
    };
  },

  methods: {
    drawLine() {
      let canvas = document.getElementById("myCanvas");
      //简单地检测当前浏览器是否支持Canvas对象, 以免在一些不支持html5的浏览器中提示语法错误
      if (canvas.getContent) {
        //获取对应的canvasRenderingContenxt2D对象(画笔)
        let ctx = canvas.getContext("2d");
        //开始一个新的绘制路径
        ctx.beginPath();
        //定义直线的起点坐标为(10,10)
        ctx.moveTo(10, 10);
        //定义直线的终点坐标为(50,10)
        ctx.lineTo(50, 10);
        ctx.strokeStyle = "blue";
        //沿着坐标点顺序的路径绘制直线
        ctx.stroke();
        //关闭当前的绘制路径
        ctx.closePath();
      }
    },

    getMax() {
     function getJSONWidth(jsonObj) {
        if (jsonObj === undefined) {
          return 0;
        } else {
          var width = 0;
          var len = jsonObj.length;
          for (var i = 0; i < len; i++) {
            if (jsonObj[i].children === undefined) {
              continue;
            }
            width += getJSONWidth(jsonObj[i].children) - 1;
          }
          width += len;
          return width;
        }
      }

      let jsonObj = this.data&&this.data.length&&this.data[0].children
      let width = 1
      this.maxLayerItems = getJSONWidth(jsonObj)
      if (this.maxLayerItems < width) {
        this.maxLayerItems = width
      }
     
    },
 
    calcViewWidth () {
      this.getMax();
      this.viewWidth = 400*this.maxLayerItems || window.screen.width
    },

    calcPoints () {
      let xscrollLeft = document.querySelector(".d2-theme-container-main-body").scrollLeft
      // let firstPoint = document.querySelector('.maps-fc-list.active').getBoundingClientRect().x
      // let result = firstPoint + xscrollLeft + 200
      // console.log(result)
      let pointArr = []

      let allItems = document.querySelectorAll('.maps-fc-list.active')
      console.log(allItems)
      allItems.forEach((item, index) => {
           pointArr.push( {index: index, width: item.getBoundingClientRect().x + xscrollLeft + 200} )
      });
      console.log(pointArr)
    }
  },

  mounted() {
    setTimeout(() => {
      this.drawLine();
    }, 40000);

    this.calcViewWidth();
    setTimeout(() => {
      this.calcPoints();
    },0)

  }
};
</script>
<style lang="scss">
.d2-theme-container-main-body,
.tree {
  overflow: auto;
  height: 100%;
}
</style>

