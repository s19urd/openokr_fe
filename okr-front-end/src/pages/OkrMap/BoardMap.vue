<template>
  <div class="treeContainer">
    <transition name="fade">
      <div v-if="!loading" class="tree" :style="{width: viewWidth + 'px'}">
        <board-map-list :data="data"></board-map-list>
      </div>
      <p v-if="loading" class="loading">正在加载中...</p>
    </transition>
  </div>
</template>
<script>
var myData = [
  {
    id: 0,
    layer: "公司",
    label: "厦门商集目标0",
    progress: "68%",
    rootname: "",
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
        label: "厦门商集目标1",
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
            label: "厦门商集目标4",
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
            label: "厦门商集目标5",
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
        label: "厦门商集目标2",
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
            label: "厦门商集目标6",
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
            label: "厦门商集目标7",
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
        label: "厦门商集目标3",
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
            label: "厦门商集目标1",
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
            label: "厦门商集目标8",
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
  }
];

var testData = [
  {
    id: 0,
    layer: "公司",
    orgName: "厦门商集目标1",
    objective: "",
    progress: "",
    showContent: false,
    keys: [],
    children: [
      {
        id: 1,
        layer: "公司",
        orgName: "厦门商集目标1",
        objective: "加快产品反馈收集和迭代速度...",
        progress: "19%",
        showContent: false,
        keys: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ],
        children: [
          {
            id: 11,
            layer: "公司",
            orgName: "厦门商集目标1",
            objective: "加快产品反馈收集和迭代速度...",
            progress: "68%",
            showContent: false,
            keys: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ]
          },
          {
            id: 12,
            layer: "公司",
            orgName: "厦门商集目标12",
            objective: "加快产品反馈收集和迭代速度...",
            progress: "68%",
            showContent: false,
            keys: [
              { key: "1", content: "加快产品反馈收集和迭代速度..." },
              { key: "2", content: "销售线索增加100%..." },
              { key: "3", content: "新客户签约成功率达到60%以上" }
            ]
          }
        ]
      },
      {
        id: 2,
        layer: "公司",
        orgName: "厦门商集目标2",
        objective: "加快产品反馈收集和迭代速度...",
        progress: "68%",
        showContent: false,
        keys: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ]
      },
      {
        id: 3,
        layer: "公司",
        orgName: "厦门商集目标3",
        objective: "加快产品反馈收集和迭代速度...",
        progress: "68%",
        showContent: false,
        keys: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ]
      },
      {
        id: 4,
        layer: "公司",
        orgName: "厦门商集目标4",
        objective: "加快产品反馈收集和迭代速度...",
        progress: "68%",
        showContent: false,
        keys: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ]
      }
    ]
  }
];
import BoardMapList from "./Components/BoardMapList";
export default {
  name: "board-map-test",
  components: {
    BoardMapList
  },

  data() {
    return {
      data: testData,
      maxLayerItems: 0,
      flag: false,
      viewWidth: 0,
      loading: true
    };
  },

  methods: {
    getMax() {
      function getJSONWidth(jsonObj) {
        if (!jsonObj) {
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

      let jsonObj = this.data && this.data.length && this.data[0].children;
      let width = 1;
      this.maxLayerItems = getJSONWidth(jsonObj);
      if (this.maxLayerItems < width) {
        this.maxLayerItems = width;
      }
    },

    calcViewWidth() {
      this.getMax();
      this.viewWidth =
        400 * this.maxLayerItems > window.screen.width
          ? 400 * this.maxLayerItems
          : window.screen.width;
    },

    getOkrMapData() {
      let timeSessionId = "3";
      this.$api.okr.map.getOkrMap(timeSessionId).then(res => {
        if (res.success) {
          this.data = res.data;
          this.loading = false;
          console.log(this.data);
          this.calcViewWidth();
        }
      });
    }
  },

  mounted() {
    this.getOkrMapData();
  }
};
</script>
<style lang="scss">
.d2-theme-container-main-body,
.tree {
  overflow: auto;
  height: 100%;
}
.treeContainer {
  .loading {
    margin: 300px auto;
    text-align: center;
    font-size: 24px;
  }
}
</style>


