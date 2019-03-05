<template>
  <div>
    <d2-container>
       <template slot="header">线上报价统计报表</template>
       <br>
       <table-comb
          name="线上报价统计报表"
          ref="tableMain"
          :search-model-base="tableMainSearchModelBase"
          :get-action="$api.mall.inquiry.queryStationPage"
          :get-action-where="getActionWhere"
          :auto-fetch="false">
        <!--基础查询-->
        <template slot="baseSearchForm" slot-scope="props" style="font-size: 14px">
              项目：
                <el-select
                    v-model="props.form.officeId"
                    filterable
                    @change="fetchList"
                    placeholder="请选择项目"
                    style="margin-right: 10px">
                    <el-option
                        v-for="item in officeOptions"
                        :key="item.id"
                        :label="item.description"
                        :value="item.id">
                    </el-option>
                </el-select>
              发布状态：
              <el-select
                  v-model="props.form.auditStatus"
                  clearable
                  @change="fetchList"
                  placeholder="全部"
                  style="width: 146px; margin-right: 10px">
                  <el-option
                      v-for="item in statusOptions"
                      :key="item.key"
                      :label="item.name"
                      :value="item.key">
                  </el-option>
              </el-select>
              上架时间：
              <el-date-picker
                  type="daterange"
                  @change="fetchList"
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  value-format="yyyy-MM-dd"
                  v-model="props.form.startEndDate"
                  style="width: 240px">
              </el-date-picker>
            <!--导出按钮-->
            <el-button class="fr ml10" type="primary" @click="exportExcel">EXCEL导出</el-button>
        </template>
        <!--项目报价列表-->
        <template slot="tableColumns">
          <el-table-column  label="编号" width="250px" prop="stationId"></el-table-column>
          <el-table-column  label="名称" prop="stationName"></el-table-column>
          <el-table-column  label="发布状态" width="100px" align="center" prop="auditStatusStr"></el-table-column>
          <el-table-column  label="最近上架时间" width="160px"  prop="auditTimeStr"></el-table-column>
          <el-table-column  label="求租/预定数"  width="120px" prop="rentApplyQty" sortable></el-table-column>
          <el-table-column  label="已报价" prop="priceOfferQty" sortable width="150px"></el-table-column>
          <el-table-column  label="操作" width="100px" fixed="right" align="center">
            <template slot-scope="props">
                <el-button type="text" size="mini" @click="showModelPage(props.row)">查看详情</el-button>
            </template>
          </el-table-column>

        </template>

       </table-comb>
   </d2-container>
   <shop-price style="z-index: 2;" :isPage="false" ref="shopPrice" @ok="handleUpdateSuccess"></shop-price>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import ShopPrice from '../ShopPrice'
  export default {
    name: 'priceList',
    mixins: [
      listMixin
    ],
    components: {ShopPrice},
    data () {
      return {
        tableMainSearchModelBase: {
          officeId: '',
          auditStatus: '',
          startEndDate: ''
        },
        officeOptions: [],
        showExportDialog: false,
        statusOptions: [
          { key: 0, name: '草稿'},
          { key: 1, name: '待审核'},
          { key: 2, name: '已发布'}
        ]
      }
    },
    computed: {
      getActionWhere(){
        return {
          siteId : this.siteId
        }
      },
      siteId() {
        return this.$route.params.siteId
      },
    },
    methods: {
      //切换项目
      fetchList(){
        this.$refs.tableMain.fetchData()
      },
      //导出excel
      exportExcel () {
        if(this.$refs.tableMain.tableData.length==0){
          this.$message.error('没有可以导出的数据');
          return;
        }
        let vo = this.$refs.tableMain.getPageVo();
        vo.token = this.token;
         this.$api.mall.inquiry.exportQueryStationList(vo)
      },

      showModelPage (item) {
        this.$refs.shopPrice.open(item);
      },

      handleUpdateSuccess () {
        this.$refs.tableMain.fetchData()
      }
    },
    mounted() {
      setTimeout(()=>{
        //获取项目列表并默认选中第一个项目（地点）
        this.$api.merch.region.officeOptions(this.siteId).then(res => {
          if(res.code===0){
            this.officeOptions = res.data;
            //清空地点
            this.$refs.tableMain.searchModelDataBase.officeId = res.data[0].id;
            //刷新列表
            this.$refs.tableMain.fetchData();
          }else{
            this.$message.error('获取项目失败！');
          }

        });
      },0);
    }
  }
</script>
<style lang="scss" scope>
</style>




