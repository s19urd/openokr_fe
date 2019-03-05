<template>
  <div>
    <transition name="edit">
      <d2-container v-show="isVisible|| isPage" v-loading="loading" class="edit-panel">
        <template slot="header">
          <i v-if="!isPage" title="后退" class="el-icon-back" @click="back">返回上级</i>
          商铺报价详情
        </template>
        <br>
        <el-row>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">申请品牌</p>
              <p class="value">{{totalData.brandQty||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">申请数量</p>
              <p class="value">{{totalData.applyQty||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">已通过数量</p>
              <p class="value">{{totalData.passQty||0}}</p>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="grid-content-top">
              <p class="key">已报价数量</p>
              <p class="value">{{totalData.offerPriceQty||0}}</p>
            </div>
          </el-col>
        </el-row>
        <table-comb
            name="线上报价统计报表"
            ref="tableMain"
            :search-model-base="tableMainSearchModelBase"
            :get-action="$api.mall.inquiry.queryRentApplyPage"
            :get-action-where="getActionWhere"
            @tableMounted="getPageVo"
            :auto-fetch="false">
          <!--基础查询-->
          <template slot="baseSearchForm" slot-scope="props">
            业态：
            <el-cascader
              placeholder="请选择"
              :props="shopTypeProps"
              :options="shopTypeOptions"
              v-model="props.form.shopTypeIdArr"
              :change-on-select="true"
              :debounce="400"
              clearable
              style="width:170px; margin-right: 10px">
            </el-cascader>
              申请时间：
              <el-date-picker
                type="daterange"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                value-format="yyyy-MM-dd"
                style="width: 240px; margin-right: 10px"
                v-model="props.form.startEndDate">
              </el-date-picker>
            <el-input
              placeholder="请输入品牌/商铺名称"
              prefix-icon="el-icon-search"
              clearable
              v-model="props.form.keyword"
              style="width: 200px;">
            </el-input>
            <!--导出按钮-->
            <el-button class="fr ml10"  type="primary" @click="exportExcel">EXCEL导出</el-button>
          </template>

          <!--项目报价列表-->
          <template slot="tableColumns">
            <el-table-column  label="操作" fixed="left" width="160px;" >
              <template slot-scope="props">
                <el-button type="text" size="mini" @click="showModelPage(props.row)">详情</el-button>
                <el-button v-if="props.row.subList && props.row.subList.length>0" type="text" size="mini" @click="showExpand(props.row,props.$index)">
                  同品牌记录
                  <i v-if="props.row.hasShowList" class="el-icon-caret-top"></i>
                  <i v-else class="el-icon-caret-bottom"></i>
                </el-button>
              </template>
            </el-table-column>
            <el-table-column width="140px" label="申请时间" prop="applyTimeStr"></el-table-column>
            <el-table-column  label="申请商铺" width="200px" prop="stationName"></el-table-column>
            <el-table-column  label="申请状态" width="90px" prop="auditStatusStr"></el-table-column>
            <el-table-column  label="报价状态" prop="quoteTime" width="100px">-</el-table-column>
            <el-table-column  label="品牌" prop="name" width="200px"></el-table-column>
            <el-table-column  label="业态品类" prop="type" width="200px">
              <template slot-scope="props">
                {{props.row.typeLevelOne + (props.row.typeLevelTwo ? (' / '+props.row.typeLevelTwo):'')}}
              </template>
            </el-table-column>
            <el-table-column  label="公司名称" prop="quoteTime" width="100px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="租金方式" prop="quoteTime" width="100px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="租金单价(首年)" prop="quoteTime" width="135px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="扣率(首年)" prop="quoteTime" width="120px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="管理费" prop="quoteTime" width="100px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="推广费" prop="quoteTime" width="100px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="免租期(天)" prop="quoteTime" width="120px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="月销售额预估" prop="quoteTime" width="120px"><template slot-scope="props">-</template></el-table-column>
            <el-table-column  label="租期" prop="quoteTime" width="100px"><template slot-scope="props">-</template></el-table-column>
          </template>
        </table-comb>
      </d2-container>
    </transition>
    <price-detail style="z-index: 1;" ref="priceDetail" @ok="getPageVo"></price-detail>
  </div>
</template>
<script>
  import PriceDetail from '../PriceDetail'
  import util from '@/libs/util.js'
  export default {
    name: 'ShopPrice',
    components: {
      PriceDetail
    },
    data () {
      return {
        tableMainSearchModelBase: {
          shopTypeIdArr: [],
          startEndDate: '',
          keyword: ''
        },
        stationId:'',
        stationIdList:[],
        isVisible: false,
        loading: false,
        pageVo: {},
        totalData:{},
        showExportDialog: false,
        shopTypeOptions: [],
        shopTypeProps:{
          value: 'id',
          label:'typeName',
          children: 'childLists'
        },
      }
    },
    props: {
      isPage: {
        type: Boolean,
        default:true
      }
    },
    computed: {
      getActionWhere(){
        return {
          siteId : this.siteId,
          stationId:this.stationId,
          stationIdList:this.stationIdList
        }
      },
      siteId() {
        return this.$route.params.siteId
      },
      stationIds () {
        return util.getPar('stationIds')||'';
      }
    },
    methods: {
      open(vo){
        //清空搜索条件
        this.isVisible = true;
        this.isPage = false;
        this.$refs.tableMain.reset();
        this.stationId = vo.stationId;
        //获取业态下拉
        this.$api.mall.workApply.shopTypeOptions(this.siteId).then(res=>{
          this.shopTypeOptions = res.data;
        });
        //获取列表数据和统计数据

        this.$nextTick(() => {
          this.getPageVo();
        })

      },
      getPageVo() {
        //获取统计
        let vo = {};
        if(this.stationIds){
          vo = {
            stationIdStr:this.stationIds
          }
        }else if(this.stationId){
          vo = {
            stationId:this.stationId
          }
        }else{
                return false;
        }
        this.$api.mall.inquiry.inquiryStatics(vo).then(res=>{
          this.totalData = res.data;
        });
        this.$refs.tableMain.fetchData()
      },
      back () {
        this.isVisible = false;
        this.$emit("ok");
      },
      //显示同品牌记录
      showExpand(item,index){
        //收起
        if(item.hasShowList){
          item.hasShowList = false;
          let len = item.subList.length;
          this.$refs.tableMain.tableData.splice(index+1,len)
          console.log(  this.$refs.tableMain.tableData)
        }else{
          item.hasShowList = true;
          this.$refs.tableMain.tableData.splice(index+1,0,...item.subList)
          console.log(  this.$refs.tableMain.tableData)
        }
      },
      showModelPage(item){
        this.$refs.priceDetail.open(item);
      },
      //导出excel
      exportExcel () {
        if(this.$refs.tableMain.tableData.length==0){
          this.$message.error('没有可以导出的数据');
          return;
        }
        let vo = this.$refs.tableMain.getPageVo();
        this.$api.mall.inquiry.exportInquiryApplyList(vo)
      },
    },
    mounted() {
      //是页面
      if(this.isPage){
        //获取业态下拉
        this.$api.mall.workApply.shopTypeOptions(this.siteId).then(res=>{
          this.shopTypeOptions = res.data;
        });
        this.stationIdList = this.stationIds.split('|');
      }
    }
  }
</script>
<style type="text/scss" lang="scss" scoped>
  .grid-content-top{
    text-align: center;
    margin-bottom: 30px;
    .key{
      font-size: 14px;
      margin: 0;
      color:#aaa;
    }
    .value{
      font-size: 24px;
      font-weight: 700;
    }
  }
  .line{ width: 100%; height: 1px;background: #ddd; overflow: hidden; margin:0 0 20px 0}
</style>

