<template>
<div>
  <!-- <ul v-for="item in platData" :key="item.parentId">
    <li v-for="subItem in item.dataList" :key="subItem.id">
        <BoardMapItem></BoardMapItem>
    </li>
  </ul> -->
  <BoardMapItem :itemInfo="itemInfo"></BoardMapItem>
</div>

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
        ],
        showContent: false,
        pieChart: ""
      }
      // pageData: [
      //   {
      //     depth: 0,
      //     parentId: null,
      //     id: 1,
      //     name: "厦门商集目标",
      //     progress: 65.04,
      //     keyList: [
      //       {
      //         quarter: 1,
      //         name: "第一季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第二季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第三季度目标"
      //       }
      //     ]
      //   },
      //   {
      //     depth: 0,
      //     parentId: 1,
      //     id: 2,
      //     name: "部门1目标",
      //     progress: 65.04,
      //     keyList: [
      //       {
      //         quarter: 1,
      //         name: "第一季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第二季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第三季度目标"
      //       }
      //     ]
      //   },
      //   {
      //     depth: 0,
      //     parentId: 1,
      //     id: 3,
      //     name: "部门2目标",
      //     progress: 65.04,
      //     keyList: [
      //       {
      //         quarter: 1,
      //         name: "第一季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第二季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第三季度目标"
      //       }
      //     ]
      //   },
      //   {
      //     depth: 0,
      //     parentId: 2,
      //     id: 4,
      //     name: "部门1目标子部门1目标",
      //     progress: 65.04,
      //     keyList: [
      //       {
      //         quarter: 1,
      //         name: "第一季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第二季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第三季度目标"
      //       }
      //     ]
      //   },
      //   {
      //     depth: 0,
      //     parentId: 2,
      //     id: 4,
      //     name: "部门1目标子部门2目标",
      //     progress: 65.04,
      //     keyList: [
      //       {
      //         quarter: 1,
      //         name: "第一季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第二季度目标"
      //       },
      //       {
      //         quarter: 1,
      //         name: "第三季度目标"
      //       }
      //     ]
      //   }
      // ]
    };
  },

  methods: {},

  mounted() {}
};
</script>
<style lang="scss">
</style>
