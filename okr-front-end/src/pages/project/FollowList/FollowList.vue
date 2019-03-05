<template>
   <div>
     <d2-container>
        <template slot="header">项目跟进</template>
        <!----->
        <el-tabs v-model="activeName">
          <el-tab-pane label="跟进" name="first"></el-tab-pane>
          <el-tab-pane label="归档" name="second"></el-tab-pane>
          <table-comb
            name="进度列表"
            ref="tableMain"
            :search-model-base="tableMainSearchModelBase"
            :search-model="tableMainSearchModel"
            :get-action="$api.pim.follow.queryPage"
            :auto-fetch="false"
            :get-action-where="getActionWhere">
            <template slot="baseSearchForm" slot-scope="props">
              <el-select
                filterable
                v-model="props.form.siteId"
                @change="changeSite"
                placeholder="请选择站点"
                style="width: 300px; margin-right: 10px">
                <el-option
                  v-for="item in siteOptions"
                  :key="item.siteId"
                  :label="item.name"
                  :value="item.siteId">
                </el-option>
              </el-select>
              <el-input
                placeholder="搜索项目名称"
                suffix-icon="el-icon-search"
                v-model="props.form.searchKey"
                style="width: 200px;">
              </el-input>
              <!--导出按钮-->
              <el-button class="fr ml10" @click="showExport" >导出</el-button>
            </template>
            <!--高级查询-->
            <template slot="advancedSearchForm" slot-scope="props">
              <el-row>
                <el-col :span="8">
                  <el-form-item label="项目模板名称：">
                    <el-select
                      v-model="props.form.formId"
                      placeholder="请选择"
                      clearable
                      filterable>
                      <el-option
                        v-for="item in modelOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
            </template>
            <template slot="tableColumns">
              <el-table-column label="操作" width="100px">
                <template slot-scope="props">
                  <el-button @click="openFollowPage(props.row)" type="text" size="mini">详情</el-button>
                </template>
              </el-table-column>
              <el-table-column
                label="项目名称"
                prop="name"
              >
              </el-table-column>
              <el-table-column
                label="项目模板名称"
                prop="formName"
              >
              </el-table-column>
              <el-table-column label="更新时间">
                <template slot-scope="props">
                  {{props.row.updateTs|dateFormat('yyyy-MM-dd')}}
                </template>
              </el-table-column>
            </template>
          </table-comb>
          <template slot="footer"></template>
        </el-tabs>
        <!---->
     </d2-container>
     <follow-page  ref="followPage" @ok="handleUpdateSuccess" ></follow-page>
    <el-dialog title="导出" :visible.sync="showExportDialog" width="500px">
        <div style=" color: #666; margin:20px 15px">导出本列表所选项目模板内容</div>
       <el-form label-width="100px" :model="exportForm" :rules="rules" ref="exportForm">
           <el-form-item label="项目模板：" prop="formId">
               <el-select
                   v-model="exportForm.formId"
                   placeholder="请选择"
                   filterable>
                   <el-option
                       v-for="item in modelOptions"
                       :key="item.id"
                       :label="item.name"
                       :value="item.id">
                   </el-option>
               </el-select>
           </el-form-item>
       </el-form>
       <div slot="footer" class="dialog-footer">
           <el-button type="primary" @click="exportByType">导 出</el-button>
           <el-button @click="showExportDialog = false">取 消</el-button>
       </div>
    </el-dialog>
   </div>
</template>


<script>
  import listMixin from "@/mixins/list.mixin";
  import followPage from "./componnets/Follow";
  export default {
    name: 'FollowList',
    components: {followPage},
    mixins: [
      listMixin
    ],
  data () {
    return {
      tableMainSearchModelBase: {
        searchKey: '',
        siteId: ''
      },
      tableMainSearchModel:{
        formId:''
      },
      tableData: [], // 表格数据
      activeName: 'first',
      siteOptions: [],
      status: '1',
      showExportDialog:false,
      exportForm:{
        formId:''
      },
      modelOptions:[],
      rules:{
        formId:[
          { required: true, message: '请选择', trigger:['change'] }
        ]
      }
    }
  },

  computed: {
     getActionWhere () {
        return {
          unionId: this.unionId,
          status: this.status
        }
     },
     unionId () {
       return this.$route.params.unionId
     },
  },
  watch:{
    activeName(val){
      this.status = (val==='first') ? '1':'2';
      this.$nextTick(() => {
        this.$refs.tableMain.fetchData();
      });
    }
  },
  methods: {
    // 切换站点，重新获取数据
    changeSite (siteId) {
      this.$refs.tableMain.fetchData();
      //获取该站点下的项目模板列表
      this.$api.pim.model.getFormList({unionId:this.unionId,siteId}).then(res => {
        if(res.code===0){
          this.modelOptions = res.data;
        }else{
          this.$message.error(res.message);
        }
      });
    },
    showExport(){
      this.exportForm.formId = '';
      this.showExportDialog = true;
    },
    exportByType(){
      this.$refs.exportForm.validate((valid) => {
          if (!valid) { return;}
          let vo = {
            formId:this.exportForm.formId,
            unionId: this.unionId,
            siteId:this.$refs.tableMain.searchModelDataBase.siteId,
            status: this.status
          }
          this.$api.pim.follow.export(vo);
      })
    },
    //跳转到详情
    openFollowPage(item){
      let siteId = this.$refs.tableMain.searchModelDataBase.siteId;
      this.$refs.followPage.open({
        ...item,
        siteId
      });
    },
    handleUpdateSuccess(){
      this.$refs.tableMain.fetchData();
    }
  },
  mounted () {
    this.$api.merch.region.siteOptions(this.unionId).then(res => {
      let siteId = res.data[0].siteId;
      this.siteOptions = res.data;
      setTimeout(() => {
        this.$refs.tableMain.searchModelDataBase.siteId = siteId;
        this.changeSite(siteId)
      }, 1000)

    })
  }
}
</script>
