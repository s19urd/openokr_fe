<template>
  <transition name="edit">
    <div class="edit-panel">
      <d2-container style="z-index: 2">
        <template slot="header">
          <i v-if="!isPage" title="后退" class="el-icon-back" @click="back"></i>
          管理所属范围
        </template>
        <div class="search-box">
          所属园区：
          <el-select
            v-model="siteId"
            filterable
            default-first-option
            placeholder="请选择园区"
            @change="changeSite"
            style="width:250px;">
            <el-option
              v-for="item in siteOptions"
              :key="item.siteId"
              :label="item.name"
              :value="item.siteId">
            </el-option>
          </el-select>
          <el-button type="primary" @click="openEditDialog" class="fr">
            <i class="iconfont icon-add"></i> 新增
          </el-button>
        </div>
        <br/>
        <el-table
          :data="scopeOptions"
          v-loading="loading"
          style="width: 100%">
          <el-table-column
            prop="scopeName"
            label="所属范围">
          </el-table-column>
          <el-table-column
            prop=""
            width="220"
            label="操作">
            <template slot-scope="props">
              <el-button-group>
                <el-button size="mini" @click="openEditDialog(props.row)"> 编辑</el-button>
                <el-button type="danger" size="mini" @click="removeItem(props.row)"> 删除</el-button>
              </el-button-group>
            </template>
          </el-table-column>
        </el-table>
        <template slot="footer"></template>
      </d2-container>
      <el-dialog :title="editVo.id?'编辑':'新增'" :visible.sync="showSaveDialog">
        <el-form
          label-width="100px"
          :model="editVo"
          :rules="rules"
          ref="saveForm">
          <el-form-item label="所属范围："  prop="scopeName">
            <el-input
              placeholder="请输入范围名称，50字以内"
              maxlength="50"
              style="width: 214px"
              clearable
              v-model="editVo.scopeName">
            </el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">保 存</el-button>
          <el-button @click="showSaveDialog = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </transition>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    name: "ScopeList",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        isPage:true,
        loading:false,
        siteId:'',
        siteOptions: [],
        scopeOptions: [],
        showSaveDialog:false,
        editVo:{
          scopeName:'',
          id:''
        },
        rules:{
          scopeName: [
            {required: true, message: '请输入范围名称'},
          ],
        }
      };
    },
    computed: {
      unionId() {
        return this.$route.params.unionId
      },
    },
    methods: {
      open(vo){
        this.isPage = vo.isPage;
        this.siteId = vo.siteId;
        this.siteOptions = vo.siteOptions;
        this.getScopeList()
      },
      changeSite(site){
        this.getScopeList();
      },
      getScopeList(){
        let siteId = this.siteId;
        if(!siteId){
          this.$message.error('请先选择园区');
          return false;
        }
        this.loading=true;
        this.scopeOptions = [];
        this.$api.merch.office.getScopeList(siteId).then(res => {
          this.loading=false;
          this.scopeOptions = res.data;
        });
      },
      openEditDialog(vo){
        if(vo.id){
          this.editVo={
            ...vo
          };
        }else{
          this.editVo={
            id:'',
            scopeName:''
          };
        }
        this.showSaveDialog =true;
        this.$nextTick(() => {
          if(this.$refs.saveForm){
            this.$refs.saveForm.clearValidate();
          }
        })


      },
      removeItem(vo){
        this.$msgbox({
          title: '提示',
          message: `确定要删除该数据？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.$api.merch.office.deleteScope(vo.id).then(res => {
              if (res.code === 0) {
                this.$message.success(`删除数据成功`);
                this.getScopeList();
              } else {
                this.$message.error(res.message)
              }
            });
          }
        });
      },
      save(){
        this.$refs.saveForm.validate(valid =>{
          if (!valid) {
            this.loading = false;
            return false;
          }
          let vo = {...this.editVo,siteId:this.siteId};
          this.$api.merch.office.updateScope(vo).then(res => {
            if (res.code === 0) {
              this.$message.success(`数据保存成功`);
              this.getScopeList();
              this.showSaveDialog = false;
            } else {
              this.$message.error(res.message)
            }
          });
        });

      },
      back(){
        this.$emit("ok");
      },
    },
    mounted() {
      this.$api.merch.region.siteOptions(this.unionId).then(res => {
        this.siteId = res.data[0].siteId;
        this.siteOptions = res.data;
        this.getScopeList();
      });
    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
</style>
