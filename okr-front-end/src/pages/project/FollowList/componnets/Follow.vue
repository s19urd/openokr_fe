<template>
  <transition name="edit">
      <d2-container v-show="isVisible" v-loading="loading" class="edit-panel">
          <template slot="header">
              <i title="后退" class="el-icon-back" @click="back"></i>
              项目详情
          </template>
          <div class="form-wrap">
              <div class="page-title-wrap">
                  <h1 class="page-title">
                      <span>{{pageVo.projectName}}</span>
                      <el-button v-if="pageVo.canEdit==='0'&& !editable" @click="editable=true" type="primary" class="fr">编辑</el-button>
                      <template v-if="editable">
                          <el-button @click="getProjectDetail" type="" class="fr mr10">取消</el-button>
                          <el-button @click="saveOrUpdate" type="primary" :loading="submitBusy"  class="fr mr10">保存</el-button>

                      </template>
                  </h1>
                  <el-row>
                      <el-col :span="12">项目模板名称：{{pageVo.typeName}}</el-col>
                      <el-col :span="12">更新时间：{{pageVo.updateTime}}</el-col>
                  </el-row>
              </div>

              <el-tabs v-if="pageVo.projectId" tab-position="top" style="height: 200px;"  v-model="activeName" >
                  <el-tab-pane v-for="(labelItem,index) in pageVo.pimFormVO.pimFormLabelVOs" :label="labelItem.name" :name="'label'+index" :key="index">
                      <div class="model-wrap" v-for="(modelItem,modeIndex) in labelItem.pimFormModuleVOs" :key="modeIndex">
                          <h2 v-if="modelItem.name" class="model-title">{{modelItem.name}}</h2>
                              <el-row>
                                  <el-col v-for="(fieldItem,fieldIndex) in modelItem.pimFormDetailVOs" :span="12*(parseInt(fieldItem.longness||0)+1)" :key="fieldIndex">
                                      <el-form :model="fieldItem" ref="pageForm"  :rules="rules[fieldItem.id]" :label-width="labelWidth">
                                          <el-form-item
                                              :label="fieldItem.label+'：'"
                                              prop="value"
                                              >
                                              <template v-if="editable" name="编辑模式">
                                                  <template v-if="fieldItem.controlType ==='0'">
                                                      <el-input
                                                        v-if="fieldItem.dataType!=='5'"
                                                        :placeholder="fieldItem.tips"
                                                        v-model="fieldItem.value">
                                                          <template v-if="fieldItem.numberType === '3' && fieldItem.coinType === '0'" slot="prepend">¥</template>
                                                          <template v-if="fieldItem.numberType === '3' && fieldItem.coinType === '1'" slot="prepend">$</template>
                                                          <template v-if="fieldItem.numberType === '3' && fieldItem.coinType === '2'" slot="prepend">€</template>
                                                          <template v-if="fieldItem.numberType === '3' && fieldItem.coinType === '3'" slot="prepend">¥</template>
                                                          <template v-if="fieldItem.numberType === '3' && fieldItem.coinType === '4'" slot="prepend">￡</template>
                                                          <template v-if="fieldItem.numberType === '2' && fieldItem.dataType === '4'" slot="append">%</template>
                                                      </el-input>
                                                      <template v-else>
                                                          <el-time-picker
                                                              v-if="fieldItem.timeType==='1'" style="width: 100%"
                                                              v-model="fieldItem.value"
                                                              value-format="hh:mm:ss"
                                                              :placeholder="fieldItem.tips">
                                                          </el-time-picker>
                                                          <el-date-picker
                                                              v-else  style="width: 100%"
                                                              v-model="fieldItem.value"
                                                              :type="fieldItem.timeType==='0'?'date':'datetime'"
                                                              :value-format="fieldItem.timeType==='0'?'yyyy-MM-dd':'yyyy-MM-dd hh:mm:ss'"
                                                              :placeholder="fieldItem.tips">
                                                          </el-date-picker>
                                                      </template>
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='1'">
                                                      <el-input v-model="fieldItem.value" :placeholder="fieldItem.tips" :rows="3" type="textarea"></el-input>
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='2'">
                                                      <el-select clearable v-model="fieldItem.value" :placeholder="fieldItem.tips" style="width: 100%">
                                                          <el-option
                                                              v-for="item in fieldItem.pimFormDetailExtVOs"
                                                              :key="item.id"
                                                              :label="item.extValue"
                                                              :value="item.id">
                                                          </el-option>
                                                      </el-select>
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='3'">
                                                      <el-select multiple v-model="fieldItem.pimFormDetailExtValues" :placeholder="fieldItem.tips" clearable style="width: 100%;" >
                                                          <el-option
                                                              v-for="item in fieldItem.pimFormDetailExtVOs"
                                                              :key="item.id"
                                                              :label="item.extValue"
                                                              :value="item.id">
                                                          </el-option>
                                                      </el-select>
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='4'">
                                                      <el-upload
                                                          :ref="'upload_'+fieldItem.id"
                                                          :action="$api.common.uploadUrl"
                                                          :data="{targetDir:'projectAttachment'}"
                                                          :headers="{token:token}"
                                                          :file-list="fieldItem.fileList">
                                                          <el-button size="small" type="primary">附件上传</el-button>
                                                      </el-upload>
                                                      <div v-if="fieldItem.attachmentList.length>0">
                                                          <i class="el-icon-info" style="color:#E6A23C"></i>
                                                          <span style="margin-right: 20px; color: #666; display: none">【{{fieldItem.label}}】提供了附件模板，请下载模板。</span>
                                                          <a
                                                              target="_blank"
                                                              style="margin-right: 20px"
                                                              v-for="(attachment, index) in fieldItem.attachmentList"
                                                              :key="index"
                                                              :download="attachment.fileName"
                                                              :href="getFileUrl(attachment)">
                                                              模板下载
                                                          </a>
                                                      </div>
                                                  </template>
                                              </template>

                                              <template v-else name="只读模式">
                                                  <template v-if="fieldItem.controlType==='0' || fieldItem.controlType==='1' ">
                                                      {{fieldItem.value}}
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='2' || fieldItem.controlType==='3'">
                                                      <el-tag
                                                        :key="extIndex"
                                                        v-for="(ext, extIndex) in getSelectLablel(fieldItem)"
                                                        >{{ext.extValue}}</el-tag>
                                                  </template>
                                                  <template v-if="fieldItem.controlType==='4'">
                                                      <div
                                                          class="attachmentList"
                                                          :key="fileIndex"
                                                          v-for="(file,fileIndex) in fieldItem.pimProjectDetailVOS">
                                                          <a :href="getFileUrl(file)" style="color:#555">
                                                              <i class="el-icon-tickets" style="vertical-align: middle"></i>
                                                              <span class="fileName"  style="vertical-align: middle">{{file.attachmentVO.fileName}}</span>
                                                          </a>
                                                      </div>
                                                  </template>
                                              </template>
                                          </el-form-item>
                                      </el-form>
                                  </el-col>
                              </el-row>
                      </div>
                  </el-tab-pane>
              </el-tabs>

          </div>
      </d2-container>
  </transition>
</template>

<script>
  import listMixin from "@/mixins/list.mixin";
  export default {
    // 如果需要缓存页面
    // name 字段需要设置为和本页路由 name 字段一致
    name: "Edit",
    components: {},
    mixins: [
      listMixin
    ],
    data() {
      return {
        siteId:'',
        isVisible:false,
        loading: false,
        detailVo:{},
        pageVo:{},
        pageForm:{},
        activeName:'label0',
        submitBusy:false,
        editable:false,
        rules:{
        },
        apiPrefix: process.env.VUE_APP_API||'',
      };
    },
    computed: {
      unionId() {
        return this.$route.params.unionId
      },
      labelWidth(){
        if(!this.pageVo.projectId){
          return '150px'
        }
        let maxLength = 4;
        this.pageVo.pimFormVO.pimFormLabelVOs.map(label=>{
          label.pimFormModuleVOs.map(model=>{
            model.pimFormDetailVOs.map(field=>{
              maxLength = Math.max(maxLength,field.label.length);
            })
          })
        });
        return  (maxLength*18)+'px'
      }
    },
    methods: {
      open(vo) {
        this.pageVo = {};
        if(!vo.id){
          this.$message.error('获取数据失败！');
          return;
        }
        this.detailVo ={
          projectId:vo.id,
          siteId:vo.siteId,
          unionId:this.unionId
        };
        //获取项目详情
        this.getProjectDetail()
      },
      getProjectDetail(){
        this.editable =false;
        this.$api.pim.follow.getProjectDetail(this.detailVo).then(res => {
          if(res.code===0){
            //处理单选下拉的默认值，附件的默认列表
            res.data.pimFormVO.pimFormLabelVOs.map(label=>{
              label.pimFormModuleVOs.map(model=>{
                model.pimFormDetailVOs.map(field=>{
                  this.rules[field.id] = this.getRules(field)
                  if(field.controlType==='2'&& !field.value){
                    field.pimFormDetailExtVOs.map(ext=>{
                      if(ext.isDefault ==='1'){
                        field.value = ext.id;
                      }
                    })
                  }
                  if(field.controlType==='4' && field.pimProjectDetailVOS){
                    field.fileList = field.pimProjectDetailVOS.map(fileItem=>{
                      return {
                        ...fileItem.attachmentVO,
                        name:fileItem.attachmentVO.fileName
                      }
                    })
                  }
                })
              })
            });
            this.pageVo = res.data;
            this.isVisible = true;
            this.editable = false;
            this.loading = false
          }else{
            this.$message.error(res.message);
          }
        });
      },
      getRules(field){
        let fieldRules = [];
        //必填
        if(field.isMust==='1' && field.controlType !== '4' && field.controlType !== '3'){
          fieldRules.push(
            { required: true, message: '请填写', trigger:[ 'blur','change'] }
          )
        }
        //文本
        if(field.controlType==='0'){
          //手机
          if(field.dataType==='2'){
            fieldRules.push(
              { pattern: /^1\d{10}$/, message: '手机号码错误',trigger: 'blur' }
            )
          }
          //邮箱
          if(field.dataType==='3'){
            fieldRules.push(
              { pattern: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/, message: '邮箱格式有误',trigger: 'blur' }
            )
          }
          //数字
          if(field.dataType==='4'){
            //整数判断
            if(field.numberType==='0'){
              fieldRules.push(
                { pattern: /^\d*$/, message: '请输入有效的整数',trigger: 'blur' }
              )
            }else{
              //小数，包括百分比和货币
              let reg =  eval(' /^([1-9]\\d*|0)(\.\\d{0,'+ field.numberDecimalPoint+'})?$/');
              fieldRules.push(
                { pattern: reg, message: '请输入有效的数值',trigger: 'blur' }
              )
            }
          }
        }

        //多选下拉框
        if (field.controlType === '3' && field.isMust === '1' ) {
          const Multiplevalidator = function(rule, value, callback) {
            if (field.pimFormDetailExtValues.length === 0) {
              callback(new Error('请选择'))
            } else {
              callback()
            }
          }
          fieldRules.push(
            { validator: Multiplevalidator }
          )
        }

        if(field.controlType === '4' && field.isMust==='1' ){
          let uploadRef = this.$refs['upload_'+field.id];
          const uploadValidator = function(rule, value, callback) {
            if (uploadRef && uploadRef[0].uploadFiles && uploadRef[0].uploadFiles.length === 0) {
              callback(new Error('请上传附件'))
            } else {
              callback();
            }
           }
          fieldRules.push(
            { validator: uploadValidator}
          )
        }
        return {
          value: fieldRules
        };
      },
      
      //保存项目跟进
      saveOrUpdate(){
        if (this.submitBusy) {
          return false;
        }
        let validArr = [];
        this.$refs.pageForm.map(function(_pageForm){
          let res = new Promise(function(resolve,reject){
            _pageForm.validate(valid => {
              if (valid) {
                resolve(true);
              }else{
                resolve(false);
              }
            })
          }).catch(function(e) {
            console.error(e)
          })
          validArr.push(res);
        })
        Promise.all(validArr).then(res=>{
          if(res.indexOf(false)==-1){
            let vo = {
              pimFormDetailVOList:[],
              projectId:this.pageVo.projectId,
            };

            const getFileList = (uploadFiles)=>{
              let fileList =[]
              uploadFiles.map(item=>{
                if(item.response && item.response.code===0){
                  fileList.push({
                    attachmentVO:item.response.data
                  });
                }else if(item.id){
                  //老数据
                  fileList.push({
                    attachmentVO:item
                  });
                }
              })
              return fileList;
            }
            this.pageVo.pimFormVO.pimFormLabelVOs.map(label=>{
              label.pimFormModuleVOs.map(model=>{
                model.pimFormDetailVOs.map(field=>{
                  //多选
                  if(field.controlType==='3'){
                    vo.pimFormDetailVOList.push({
                      id:field.id,
                      controlType:field.controlType,
                      pimFormDetailExtValues:field.pimFormDetailExtValues
                    })
                  }else if(field.controlType==='4'){
                    //附件
                    let uploadRef = this.$refs['upload_'+field.id];
                    vo.pimFormDetailVOList.push({
                      id:field.id,
                      controlType:field.controlType,
                      pimProjectDetailVOS:getFileList(uploadRef[0].uploadFiles)
                    })
                  }else{
                    //其他
                    vo.pimFormDetailVOList.push({
                      id:field.id,
                      controlType:field.controlType,
                      value:field.value
                    })
                  }
                })
              })
            });

            this.submitBusy = true;
            this.$api.pim.follow.saveOrUpdate(vo).then(res => {
              if (res.code === 0) {
                this.$message({
                  type: "success",
                  message: "保存成功！"
                });
                setTimeout(() => {
                  this.submitBusy = false;
                  this.editable = false;
                }, 1000);
                this.getProjectDetail();
              } else {
                this.$message.error(res.message);
                this.submitBusy = false;
              }
            });
          }
        })
      },
      //获取下拉框选择的选项 返回数组
      getSelectLablel(field){
        //单选
        if(field.controlType=='2'){
          if(!field.value){
            return []
          }
          return field.pimFormDetailExtVOs.filter(item=>{
            return item.id ===field.value
          });
        }
        //多选
        if(field.controlType=='3'){
          if(field.pimFormDetailExtValues.length==0){
            return [];
          }
          return field.pimFormDetailExtVOs.filter(item=>{
            return field.pimFormDetailExtValues.indexOf(item.id)!=-1;
          });
        }

      },
      back(){
        this.isVisible = false;
        this.$emit("ok");
      },
      //添加附件
      saveAttachmentList(res){
        if(res.code===0){
          let file = res.data;
          this.fieldForm.attachmentList.push({
            fileName :file.fileName,
            id:file.id,
            fileExt:file.fileExt,
            path:file.httppath
          })
        }else{
          this.$message.error(res.message);
        }
      },
      //附件下载
      getFileUrl(file){
        return file ? `${this.apiPrefix}/upload/attachment/downloadByUrl.htm?fileName=${file.fileName}fileUrl=${file.httppath}` : ''
      },
    },
    mounted() {

    }
  };
</script>

<style type="text/scss" lang="scss" scoped>
    .form-wrap{
        background: #fff;
    }
    .page-title-wrap{
       font-size: 14px;
       padding-bottom: 20px;
       .page-title{
           font-size: 20px;
           line-height: 40px;
       }
    }
    part-wrap{
        background: #fff;
        margin: 15px 0 0 0;
    }
    .model-title{
        line-height: 50px;
        font-size: 14px;
        padding-left: 10px;
        border-bottom: #d1dbe5 solid 1px;
        margin: 0 0 20px 0;
    }

    .attachmentList{
        position: relative;
        height: 40px;
        line-height: 40px;
        .fileName{
            width: 200px;
            height: 40px;
            display: inline-block;
            overflow: hidden;
            text-indent: 10px;
        }
        .file-delete{
            margin-left: 20px;
            transition: all .4s;
            line-height: 20px;
            text-align: center;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            cursor: pointer;
            font-size: 12px;
            background: #d1dbe5;
        }
    }
</style>