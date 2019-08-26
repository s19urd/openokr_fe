<template>
  <div class="text-center">
    <vue-org-tree
      :data="data"
      :horizontal="horizontal"
      :collapsable="collapsable"
      :render-content="renderContent"
      @on-expand="onExpand"
      @on-node-click="onNodeClick"
    />
  </div>
</template>
<script>
import VueOrgTree from "./Components/OrgTree";
export default {
  name: "tree",

  components: {
    VueOrgTree
  },

  data() {
    return {
      data: {
        id: 0,
        layer: "公司",
        label: "厦门商集目标0",
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
      },
      horizontal: false,
      collapsable: false
    };
  },

  methods: {
    renderContent: function(h, data) {
      return data.label;
    },
    onExpand: function(data) {
      if ("expand" in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children);
        }
      } else {
        this.$set(data, "expand", true);
      }
    },
    onNodeClick: function(e, data) {
      alert(data.label);
    },
    collapse: function(list) {
      var _this = this;
      list.forEach(function(child) {
        if (child.expand) {
          child.expand = false;
        }
        child.children && _this.collapse(child.children);
      });
    },
    expandChange: function() {
      this.toggleExpand(this.data, this.expandAll);
    },
    toggleExpand: function(data, val) {
      var _this = this;
      if (Array.isArray(data)) {
        data.forEach(function(item) {
          _this.$set(item, "expand", val);
          if (item.children) {
            _this.toggleExpand(item.children, val);
          }
        });
      } else {
        this.$set(data, "expand", val);
        if (data.children) {
          _this.toggleExpand(data.children, val);
        }
      }
    }
  }
};
</script>

