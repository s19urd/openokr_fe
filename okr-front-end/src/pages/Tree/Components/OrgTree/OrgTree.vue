<template>
  <div class="org-tree-container">
    <div class="org-tree" :class="{horizontal, collapsable}">
      <org-tree-node
        :data="data"
        :props="props"
        :horizontal="horizontal"
        :label-width="labelWidth"
        :collapsable="collapsable"
        :render-content="renderContent"
        :label-class-name="labelClassName"
        @on-expand="(e, data) => {$emit('on-expand', e, data)}"
        @on-node-click="(e, data) => {$emit('on-node-click', e, data)}"
      />
    </div>
  </div>
</template>

<script>
import render from "./node";

export default {
  name: "OrgTree",
  components: {
    OrgTreeNode: {
      render,
      functional: true
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    props: {
      type: Object,
      default: () => ({
        label: "label",
        expand: "expand",
        children: "children"
      })
    },
    horizontal: Boolean,
    selectedKey: String,
    collapsable: Boolean,
    renderContent: Function,
    labelWidth: [String, Number],
    labelClassName: [Function, String],
    selectedClassName: [Function, String]
  }
};
</script>
