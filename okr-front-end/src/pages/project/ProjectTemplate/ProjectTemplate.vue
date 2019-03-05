<template>
  <transition name="detail">
    <d2-container v-show="isVisible" v-loading="loading">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        项目详情
      </template>
      <br>
      <!---->
      <el-form :model="pageVo" :rules="rules" label-position="left" label-width="120px" ref="form">
        <div class="title">基本信息</div>
          <el-form-item label="项目名称" prop="name">
            <el-col :span='8'>
              <el-input v-model="pageVo.name" placeholder="请输入内容"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="项目模板名称"  prop="formId">
            <el-col :span='8'>
                <el-select
                  v-model="pageVo.formId"
                  placeholder="请选择"
                  clearable
                  filterable>
                  <el-option
                    v-for="item in formOptions"
                    :label="item.name"
                    :key="item.id"
                    :value="item.id">
                  </el-option>
                </el-select>
            </el-col>
          </el-form-item>
      </el-form>
        <div class="title">人员分配</div>
        <p style="margin: 0 0 20px; font-size: 14px; color: #666;">请将负责该项目的人员在左侧表格中勾选，并点击“加入" 按钮添加至右侧表格</p>
        <div style="padding:20px 0" class="transfer-class">
          <el-transfer
            ref="userList"
            filterable
            :props="{
              key: 'ocuUserId',
              label: 'ocuUserName'
            }"
            :titles="['所有人员', '项目人员']"
            filter-placeholder="请输入"
            :button-texts="['移除','加入']"
            v-model="userListChecked"
            :data="userList">
          </el-transfer>
        </div>
      <el-button type="primary" :loading="submitBusy" @click="submit">
        <i class="iconfont icon-save"></i> 保存
      </el-button>
    </d2-container>
  </transition>
</template>
<script>
  import { required } from "@/libs/rules";
  export default {
    name: 'detail',
    data () {
      return {
        formOptions: [],
        pageVo:{},
        isVisible: false,
        loading: false,
        userList:[],
        userListChecked: [],
        submitBusy: false,
        rules: {
          name: [
            { required: true, message: "项目名称必填", trigger: 'blur' }
          ],
          formId: [
            {required: true, message: "项目模板名称必选", trigger: 'change'}
          ]
        },
      }
    },

    computed: {
      unionId () {
        return this.$route.params.unionId
      }
    },

    methods: {
      open (item) {
        this.pageVo = {};
        this.formOptions = item.formOptions
        if(this.$refs.userList){
          this.$refs.userList.data = [];
        };
        //移除校验结果
        this.$refs.form && this.$refs.form.clearValidate();
        let vo = {
          siteId:item.siteId
        };
        if (item.id) {
          vo.id=item.id;
        };
        //获取页面数据
        this.$api.pim.project.queryProjectDetail(vo).then(res => {
          if (res.code === 0) {
            this.pageVo = res.data;
            let _userListChecked=[];
            res.data.userPermissionList.map(item=>{
              if(item.checked){
                _userListChecked.push(item.ocuUserId);
              }
            });
            //初始化缺陷配置穿梭框
            this.userList = res.data.userPermissionList;
            this.$refs.userList.data = this.userList;
            this.userListChecked = _userListChecked;
            this.$nextTick(() => {
              this.isVisible = true;
              this.loading = false;
            })
          } else {
            this.$message.error("获取数据失败！")
          }
        })
      },
      //返回
      back () {
        this.isVisible = false;
        this.$emit("ok");
      },

      submit () {
        if (this.submitBusy) {
          return false
        }
        this.$refs.form.validate((valid) => {
          if (!valid) { return};
          const getUserPermissionList = () =>{
            this.userList.map(item=>{
              item.checked = this.userListChecked.indexOf(item.ocuUserId) != -1
            })
            return this.userList;
          };
          let vo = {
            ...this.pageVo,
            unionId: this.unionId,
            siteId: this.siteId,
            userPermissionList:getUserPermissionList()
          };
          this.submitBusy = true;
          this.$api.pim.project.saveProject(vo).then(res => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "保存成功！"
              });
              setTimeout(() => {
                this.submitBusy = false;
                this.back();
              }, 1000);
            } else {
              this.$message.error(res.message);
              this.submitBusy = false
            }
          })
        })
      }
    },

    mounted () {
    }
  }
</script>

<style lang="scss" scope>
  .title {
    border-bottom: .01rem solid #dcdfe6;
    padding-bottom: 2rem;
    margin-bottom: 2rem;
  }
</style>

