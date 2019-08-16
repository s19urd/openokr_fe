<template>
  <div>
    <ul v-for="item in platData" :key="item.parentId" class="boardlayer">
      <li v-for="subItem in item.dataList" :key="subItem.id">
        <BoardMapItem :itemInfo="subItem"></BoardMapItem>
      </li>
    </ul>
    <!-- <BoardMapItem :itemInfo="itemInfo"></BoardMapItem> -->
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
        objectives: [
          { key: "1", content: "加快产品反馈收集和迭代速度..." },
          { key: "2", content: "销售线索增加100%..." },
          { key: "3", content: "新客户签约成功率达到60%以上" }
        ],
        showContent: false,
        pieChart: ""
      },
      platData: [
        {
          parentId: "-1",
          depth: 0,
          dataList: [
            {
              id: "0",
              layer: "公司",
              name: "厦门商集目标",
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
          parentId: "0",
          depth: 1,
          dataList: [
            {
              id: "1",
              layer: "公司",
              name: "厦门商集目标",
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
              id: "2",
              layer: "公司",
              name: "厦门商集目标",
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
              id: "3",
              layer: "公司",
              name: "厦门商集目标",
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
          parentId: "1",
          depth: 2,
          dataList: [
            {
              id: "4",
              layer: "公司",
              name: "厦门商集目标",
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
              id: "5",
              layer: "公司",
              name: "厦门商集目标",
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
    };
  },

  methods: {},

  mounted() {}
};
</script>
<style lang="scss">
.boardlayer {
  display: flex;
  justify-content: center;
}
</style>
