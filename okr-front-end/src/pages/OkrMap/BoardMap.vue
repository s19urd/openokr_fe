<template>
  <BoardMapItem></BoardMapItem>
</template>
<script>
import BoardMapItem from "./Components/BoardMapItem";
export default {
  name: "board-map",
  components: {
    BoardMapItem
  },
  data() {
    return {
      itemInfo: {
        layer: "公司",
        name: "厦门商集目标",
        progress: "68%",
        Objectives: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ]
      },
      showContent: false,
      pieChart: ""
    };
  },

  methods: {},

  mounted() {}
};
</script>
<style lang="scss">
</style>
