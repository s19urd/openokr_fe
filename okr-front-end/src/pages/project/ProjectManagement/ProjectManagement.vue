<template>
  <div>
    <d2-container>
      <template slot="header">项目管理</template>
      <br>
      <!----->
      <table-comb
        name="管理列表"
        ref="tableMain"
        :search-model-base="tableMainSearchModelBase"
        :search-model="tableMainSearchModel"
        :get-action="$api.pim.project.qureyPage"
        :get-action-where="getActionWhere"
        :auto-fetch="false"
        :remove-action="$api.pim.project.deleteProject">
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
              :value="item.siteId"
            >
            </el-option>
          </el-select>
          <el-input
            placeholder="搜索项目名称"
            suffix-icon="el-icon-search"
            v-model="props.form.keyword"
            style="width: 200px;">
          </el-input>
          <!--新增-->
          <el-button class="fr ml10" @click="showModelPage()">新增</el-button>
        </template>
        <!--高级查询-->
        <template slot="advancedSearchForm" slot-scope="props">
          <el-row>
            <el-col :span="8">
              <el-form-item label="项目模板：">
                <el-select
                  v-model="props.form.formId"
                  placeholder="请选择"
                  clearable
                  filterable>
                  <el-option
                    v-for="item in formOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="状态：">
                <el-select
                  v-model="props.form.status"
                  clearable
                  filterable>
                  <el-option
                    v-for="item in statusOptions"
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
            <el-table-column
              width="160px"
              label="操作"
              >
            <template slot-scope="props">
                <el-button type="text" size="mini" @click="showModelPage(props.row)">编辑</el-button>
                <el-button v-if="props.row.status === '1'" type="text" class="mr10" size="mini" @click="sealUp(props.row)">归入档案</el-button>
                <el-button v-else type="text" class="mr10" size="mini" @click="sealOff(props.row)">恢复跟进</el-button>
                <el-button type="text" size="mini" @click="deleteItem(props.row)">删除</el-button>
            </template>
            </el-table-column
              wid>
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
          <el-table-column
            label="状态"
            prop="statusStr"
            >
          </el-table-column>
        </template>
      </table-comb>
    </d2-container>
    <project-template style="z-index: 1;" ref="projectTemplate" @ok="handleUpdateSuccess"></project-template>
  </div>
</template>
<script>
  import ProjectTemplate from '../ProjectTemplate'
  export default {
    name: 'management',
    components: {
      ProjectTemplate
    },

    data () {
      return {
        tableMainSearchModelBase: {
          keyword : '',
          siteId: ''
        },
        tableMainSearchModel:{
          formId:'',
          status:''
        },
        siteOptions: [],
        formOptions: [],
        statusOptions: [
          {id: 1, name: '跟进'},
          {id: 2, name: '归档'},

        ],
      }
    },

    computed: {
      getActionWhere () {
        return {
          unionId: this.unionId
        }
      },

      unionId () {
        return this.$route.params.unionId
      }
    },

    methods: {
      // 切换站点
      changeSite (siteId) {
        //清空模板和重新获取模板列表
        this.$refs.tableMain.searchModelData.formId  = '';
        this.formOptions = [];
        this.getFormList(this.unionId,siteId);
        this.$refs.tableMain.fetchData();
      },
      //新增
      showModelPage (item) {
        let vo = {}
        if (item) {
          vo = {
            ...item,
            formOptions: this.formOptions
          }
        } else {
            vo = {
              siteId: this.$refs.tableMain.searchModelDataBase.siteId,
              formOptions: this.formOptions
            }
          }
        this.$refs.projectTemplate.open(vo)
      },
      handleUpdateSuccess () {
        this.$refs.tableMain.fetchData()
      },

      //归入档案
      sealUp(item){
        this.$confirm('项目归入档案后，查看项目详细信息请到归档页签中查看', '归入档案', {
          confirmButtonText: '归入档案',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$api.pim.project.setProjectFile({id:item.id}).then(res => {
            if(res.code===0){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              setTimeout(()=>{
                this.$refs.tableMain.fetchData()
              },500)
            }else{
              this.$message.error(res.message);
            }
          })
        })
      },
      //恢复跟进
      sealOff(item){
        this.$confirm('项目恢复跟进后，查看项目详细信息请到跟进页签中查看', '恢复跟进', {
          confirmButtonText: '恢复跟进',
          cancelButtonText: '取 消',
          type: 'warning'
        }).then(() => {
          this.$api.pim.project.setProjectFollow({id:item.id}).then(res => {
            if(res.code===0){
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              setTimeout(()=>{
                this.$refs.tableMain.fetchData()
              },500)
            }else{
              this.$message.error(res.message);
            }
          })
        })
      },
      //删除
      deleteItem(item){
        this.$refs.tableMain.remove(item.id);
      },
      handleUpdateSuccess(){
        this.$refs.tableMain.fetchData();
      },
      //获取项目模板列表
      getFormList(unionId, siteId) {
        this.$api.pim.model.getFormList({unionId,siteId}).then(res => {
          if(res.code===0){
            this.formOptions = res.data;
          }else{
            this.$message.error(res.message);
          }
        })
      }
    },

    mounted () {
      this.$api.merch.region.siteOptions(this.unionId).then(res => {
        let siteId = res.data[0].siteId;
        this.siteOptions = res.data;
        setTimeout(() => {
          this.$refs.tableMain.searchModelDataBase.siteId = siteId;
          this.changeSite(siteId)
        }, 1000);
      })
    }
  }
</script>
