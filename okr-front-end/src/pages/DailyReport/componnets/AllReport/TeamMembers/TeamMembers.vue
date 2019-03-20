<template>
  <transition name="edit">
    <d2-container class="edit-panel" v-show="isVisible" v-loading="loading">

    </d2-container>
  </transition>

</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "TeamMembers",
    mixins: [
      listMixin
    ],
    data() {
      return {
        activeTabName: "first",
        officeId:null,
        totalData:{
          workHoursNum:0,
          taskNum:0,
          productNum:0,
          personnelNum:0
        },
        tableMainSearchModelBase:{
          officeOptions: [],
          shopTypeId:[],
          searchStartEndDate: '',
          shopName: '',
        },
        officeOptions:[],
        isVisible:false,
        shopTypeOptions:[],
        shopTypeProps:{
          value: 'id',
          label:'typeName',
          children: 'childLists'
        },
      };
    },
    computed: {
      getActionWhere(){
        return {
          officeId : this.officeId
        }
      },
      siteId() {
        return this.$route.params.siteId
      },
    },
    methods: {
      open(vo) {
        this.isVisible = true;
        this.loading = false;
        this.officeId = vo.officeId;

      },
      back() {
        this.isVisible = false
        this.$emit("ok");
      },



    },
    mounted() {
      const _this = this;

    }
  };
</script>


<style type="text/scss" lang="scss" scoped>
  .grid-content-top{
    text-align: center;
    margin-bottom: 20px;
    .key{
      font-size: 14px;
      margin: 0;
      color:#aaa;
    }
    .value{
      margin:10px 0;
      font-size: 24px;
      font-weight: 700;
    }
  }
  .el-col+.el-col .grid-content-top{border-left: 1px solid #e5e5e5;}
</style>
<style>
  .passapply-area .applydetail-area .table-filter{text-align: left}
</style>
