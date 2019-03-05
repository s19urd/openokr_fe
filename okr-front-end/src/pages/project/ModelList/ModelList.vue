<template>
  <div>
    <d2-container>
      <template slot="header">项目模板配置</template>
      <br>
      <!---->
      <table-comb
              name="企业列表"
              ref="tableMain"
              :search-model-base="tableMainSearchModelBase"
              :search-model="tableMainSearchModel"
              :get-action="$api.pim.model.queryPage"
              :get-action-where="getActionWhere"
              :auto-fetch="false"
              :remove-action="$api.pim.model.deleteForm">
        <!--基础查询-->
        <template slot="baseSearchForm" slot-scope="props">
          <el-select
                  v-model="props.form.siteId"
                  filterable
                  @change="changeSite"
                  placeholder="请选择站点"
                  style="width: 300px; margin-right: 10px">
            <el-option
                    v-for="item in siteOptions"
                    :key="item.siteId"
                    :label="item.name"
                    :value="item.siteId"
            >
            </el-option>
          </el-select>
          <el-input
                  placeholder="搜索项目模板名称"
                  prefix-icon="el-icon-search"
                  clearable
                  v-model="props.form.keyword"
                  style="width: 200px;">
          </el-input>
          <el-button type="primary" icon="el-icon-plus" class="fr" @click="showModelPage()">新增</el-button>
        </template>
        <!--高级查询-->
        <template slot="advancedSearchForm" slot-scope="props">
          <el-row>
            <el-col :span="8">
              <el-form-item label="模板类型">
                <el-select
                  v-model="props.form.type"
                  placeholder="请选择"
                  clearable
                  filterable>
                  <el-option
                    v-for="item in typeOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </template>
        <!--表格-->
        <template slot="tableColumns">
          <el-table-column
            fixed="left"
            width="150px"
            label="操作">
            <template slot-scope="props">
              <el-button type="text" class="mr10" size="mini" @click="showModelPage(props.row)">编辑</el-button>
              <el-button type="text" class="mr10" size="mini" @click="openCopyDialog(props.row)">复制</el-button>
              <el-button type="text" size="mini" @click="deleteItem(props.row)">删除</el-button>
            </template>
          </el-table-column>
          <el-table-column
            label="项目模板名称"
            prop="name">
          </el-table-column>
          <el-table-column
            label="模板类型"
            prop="typeName">
          </el-table-column>
        </template>
      </table-comb>

      <template slot="footer"></template>
    </d2-container>
    <model-page  ref="modelPage" @ok="handleUpdateSuccess" ></model-page>
  </div>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  import modelPage from "../Model";

  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "EditList",
    components: {modelPage},
    mixins: [
      listMixin
    ],
    data() {
      return {
        tableMainSearchModelBase:{
          keyword: '',
          siteId: '',
        },
        tableMainSearchModel:{
          type:'',
          status:''
        },
        tableData: [],
        siteOptions: [],
        typeOptions:[],

      };
    },
    computed: {
      getActionWhere(){
        return {
          unionId : this.unionId
        }
      },
      unionId() {
        return this.$route.params.unionId
      },
    },
    methods: {
      //切换站点
      changeSite(siteId){
        this.$refs.tableMain.fetchData();
        //获取该站点下的项目模板类型列表
        this.$api.pim.type.queryTypes({unionId:this.unionId,siteId}).then(res => {
          if(res.code===0){
            this.$refs.tableMain.searchModelData.type = '';
            this.typeOptions = res.data;
          }else{
            this.$message.error(res.message);
          }
        });
      },
      //编辑
      showModelPage(item){
        let vo = {};
        if(item){
          vo = {
            ...item,
            typeOptions:this.typeOptions
          }
        }else{
          vo = {
            siteId:this.$refs.tableMain.searchModelDataBase.siteId,
            typeOptions:this.typeOptions
          }
        }
        this.$refs.modelPage.open(vo);
      },
      //打开复制弹窗
      openCopyDialog(item){
        this.$prompt('请输入复制后新项目模板的名称', '复制项目模板', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValidator:(value)=>{
            return !(value ==='');
          },
          inputErrorMessage: '请输入项目模板名称',
          inputValue:item.name+'- 副本'
        }).then(({ value }) => {
          this.$api.pim.model.copyForm({id:item.id,name:value}).then(res => {
            if(res.code===0){
              this.$message({
                type: 'success',
                message:'复制成功'
              });
              this.$refs.tableMain.fetchData();
            }else{
              this.$message.error(res.message);
            }
          });
        })
      },
      //删除
      deleteItem(item){
        this.$refs.tableMain.remove(item.id);
      },
      handleUpdateSuccess(){
        this.$refs.tableMain.fetchData();
      }
    },
    mounted() {
      setTimeout(()=>{
        this.$api.merch.region.siteOptions(this.unionId).then(res => {
          let siteId = res.data[0].siteId;
          this.siteOptions = res.data;
          this.$refs.tableMain.searchModelDataBase.siteId = siteId;
          this.changeSite(siteId);
        });
      },200)
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
  .mb10{margin-bottom: 10px}
</style>
