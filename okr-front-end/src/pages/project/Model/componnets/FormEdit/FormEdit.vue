<template>
  <div :style="{width:width}" class="form-edit-wrap">
    <div class="label-list">
      <h4 class="label-list-title">
        <i class="el-icon-tickets el-icon-home"></i>
        <span>一级页签</span>
        <el-button type="text" @click="addLabel" class="fr mr10">新增页签</el-button>
      </h4>
      <div class="labels">
        <draggable v-model="pageVo.pimFormLabelVOs" @update="labelDragEnd">
          <transition-group tag="div" name="fade" >
            <div
              class="label-item"
              v-for="(item,index) in pageVo.pimFormLabelVOs"
              @click="changeLabel(index)"
              :key="'label'+index"
              :class="{active:index==currLabelIndex}">
              <span class="label-name" :title="item.name"><i class="el-icon-sort"></i>{{item.name}}</span>
              <i @click.stop="deleteLabel(item,index)" class="el-icon-close label-delete"></i>
            </div>
          </transition-group>
        </draggable>
      </div>
    </div>
    <div class="label-detail" v-if="currLabel">
      <h4 class="label-detail-title">表格内容</h4>
      <el-form label-width="100px" :model="currLabel" ref="saveForm">
        <el-form-item label="页签：" :rules="currLabelRule" class="label-name">
          <el-input placeholder="请输入页签名称" @blur="changeLabelName" v-model="currLabel.name"></el-input>
        </el-form-item>
        <div class="part-wrap">
          <transition-group tag="div" name="fade">
            <div class="part-item" v-for="(modelItem,index) in currLabel.pimFormModuleVOs" :key="'modelItem'+index">
              <el-row>
                <el-col :span="24" class="" style="padding:30px 20px 0 0">
                  <el-form-item label="模块标题：">
                    <el-input placeholder="请输入模板标题" v-model="modelItem.name"></el-input>
                  </el-form-item>
                </el-col>
                <el-col
                  class="mb20 field-item"
                  v-for="(fieldItem,fieldIndex) in modelItem.pimFormDetailVOs"
                  :key="'modelItem'+index+'field'+fieldIndex"
                  :span="12*((parseInt(fieldItem.longness))+1)"
                >
                  <el-input placeholder="请输入字段名称" v-model="fieldItem.label"></el-input>
                  <el-row class="field-item-btns">
                    <el-button v-if="fieldIndex!=0" title="上移" @click="sortPrev(index,fieldIndex)" icon="el-icon-caret-top" circle size="small"></el-button>
                    <el-button v-if="fieldIndex!=modelItem.pimFormDetailVOs.length-1" title="下移" @click="sortNext(index,fieldIndex)" icon="el-icon-caret-bottom" circle  size="small"></el-button>
                    <el-button title="编辑" @click.stop="editField(index,fieldIndex)" icon="el-icon-edit-outline" circle  size="small"></el-button>
                    <el-button title="删除" @click.stop="deleteField(fieldItem,fieldIndex,index)" icon="el-icon-circle-close-outline" circle  size="small"></el-button>
                  </el-row>
                </el-col>
                <div class="field-item field-add-wrap">
                  <el-col :span="12">
                    <el-button class="btn-part-add" @click="addField(index)">+ 添加字段</el-button>
                  </el-col>
                </div>
              </el-row>
              <i class="el-icon-close part-delete" @click="deleteModel(modelItem,index)" title="删除模块"></i>
            </div>
          </transition-group>
          <div class="part-item part-add-wrap" style="margin-bottom: 0; padding-bottom: 40px">
            <el-button class="btn-part-add" @click="addModel">+ 添加模块</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div v-else class="label-detail" style="text-align: center; color: #999; padding-top: 100px">
      <p>暂无可显示内容</p>
      <el-button @click="addLabel">新增页签</el-button>
    </div>
    <el-dialog
      title="编辑字段"
      :visible.sync="dialogFormVisible" width="600px"
      label-position="right"
      @close="cancelFieldDialog"
      :append-to-body="true">
      <el-form :model="fieldForm" ref="fieldForm" :rules="fieldFormRules" label-width="120px">
        <div class="field-form-top">
          <el-form-item label="表单控件类型"  prop="controlType" >
            <el-select
              v-model="fieldForm.controlType"
              @change="changeFieldType">
              <el-option
                v-for="item in controlTypeOptions"
                :key="item.label"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <template v-if="fieldForm.controlType==='0'">
            <el-form-item label="数据类型" prop="dataType">
              <el-select
                v-model="fieldForm.dataType"
                @change="changeDataType"
                placeholder="请选择">
                <el-option
                  v-for="item in dataTypeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <template  v-if="fieldForm.dataType==='4'">
              <el-form-item label="数字类型设置" prop="numberType">
                <el-select v-model="fieldForm.numberType">
                  <el-option
                    v-for="item in numberTypeOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="小数点后位数" prop="numberDecimalPoint" v-if="fieldForm.numberType !== '0'">
                <el-input style="width: 40px; margin-right: 5px"  v-model="fieldForm.numberDecimalPoint"></el-input> 位
              </el-form-item>
              <el-form-item label="货币符号" prop="coinType" v-if="fieldForm.numberType === '3'">
                <el-select v-model="fieldForm.coinType">
                  <el-option
                    v-for="item in coinTypeOptions"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </template>
            <el-form-item label="时间类型设置"  prop="timeType" v-if="fieldForm.dataType==='5'" >
              <el-select v-model="fieldForm.timeType" >
                <el-option
                  v-for="item in timeTypeOptions"
                  :key="item.label"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </template>
          <template v-if="fieldForm.controlType==='2' || fieldForm.controlType==='3'">
            <el-form-item label="选项值"  prop="pimFormDetailExtVOs" >
              <div v-for="(item,index) in fieldForm.pimFormDetailExtVOs" class="d2-mb-10" style="position: relative">
                <el-input
                  placeholder="请输入选项名称"
                  v-model="item.extValue"
                  style="width: 200px;"></el-input>
                <el-radio
                  style="margin-left: 40px"
                  v-if="fieldForm.controlType==='2'"
                  v-model="item.isDefault"
                  @click.native="cancelDefaultOption($event,fieldForm.pimFormDetailExtVOs)"
                  @chang="changeDefaultOption(fieldForm.pimFormDetailExtVOs,index)"
                  label="1">
                  设为默认值
                </el-radio>
                <i class="el-icon-close option-delete" @click="deleteOption(index)" title="删除模块"></i>
              </div>
              <el-button type="text" @click="addOption">新增选项</el-button>
            </el-form-item>
          </template>
          <el-form-item label="附件模板" v-if="fieldForm.controlType==='4'">
            <el-upload v-if="fieldForm.attachmentList.length==0"
              :action="$api.common.uploadUrl"
              :data="{targetDir:'projectAttachment'}"
              :headers="{token:token}"
              :file-list="fieldForm.attachmentList"
              :limit="1"
              :on-success="saveAttachmentList"
              :on-remove="(res, list) => this.fieldForm.attachmentList = list"
              :on-exceed="handleUploadExceed">
              <el-button size="small" type="primary">模板上传</el-button>
            </el-upload>
            <div v-else class="attachmentList" :key="index" v-for="(file, index) in fieldForm.attachmentList">
              <i class="el-icon-tickets" style="vertical-align: middle"></i>
              <span class="fileName"  style="vertical-align: middle">
                {{file.fileName}}
              </span>
              <i class="el-icon-close file-delete"  style="vertical-align: middle" @click="deleteFile()"></i>
            </div>
          </el-form-item>
        </div>
        <div class="field-form-bottom">
          <el-form-item label="字段显示" prop="label">
            <el-input placeholder="请输入字段名称" v-model="fieldForm.label" ></el-input>
          </el-form-item>
          <el-form-item label="输入提示" prop="">
            <el-input placeholder="" v-model="fieldForm.tips" ></el-input>
          </el-form-item>
          <el-form-item label="是否必填" prop="">
            <el-radio-group v-model="fieldForm.isMust">
              <el-radio label="0">非必填</el-radio>
              <el-radio label="1">必填</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="占位样式" prop="longness">
            <el-radio-group v-model="fieldForm.longness">
              <el-radio label="0" :disabled="fieldForm.controlType=='1' || fieldForm.controlType=='4'">半行长度</el-radio>
              <el-radio label="1">整行长度</el-radio>
            </el-radio-group>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelFieldDialog">取 消</el-button>
        <el-button type="primary" @click="saveField">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import formMixin from "@/mixins/form.mixin";
  import draggable from 'vuedraggable'
  import { required } from '@/libs/rules';
  import { cloneDeep } from 'lodash';
  export default {
    name: "FormEdit",
    components: {},
    mixins: [
      formMixin
    ],
    props: {
      value: Object,
      width:{
        type: String,
        default: '100%'
      },
    },
    components: {
      draggable
    },
    data() {
      return {
        currLabelIndex:-1,
        pageVo:{},
        currLabel:{},
        currLabelRule: {
          name: { required: true, message: '请输入页签名字', trigger:'blur' }
        },
        dialogFormVisible:false,
        editFieldPosition:[0,0],
        fieldForm:{},
        fieldFormBefore:{},
        fieldFormRules:{
          controlType: required,
          dataType: required,
          timeType: required,
          numberType: required,
          numberDecimalPoint:[
            { required: true, message: '请填写', trigger:'blur' },
            { pattern: /^\d{1}$/, message: '请输入1到9的整数',trigger: 'blur' }
          ],
          coinType: required,
          label: required,
          longness: required,
          pimFormDetailExtVOs:[
            {validator:this.validatorExt, trigger: 'blur',},
          ]
        },
        //是否提供模板
        supplyAttachment:'0',
        controlTypeOptions:[
          {label:'单行文本框',value:'0'},
          {label:'多行文本',value:'1'},
          {label:'单选下拉框',value:'2'},
          {label:'复选下拉框',value:'3'},
          {label:' 附件上传',value:'4'},
        ],
        coinTypeOptions:[
          {label:'人民币',value:'0'},
          {label:'美元',value:'1'},
          {label:'欧元',value:'2'},
          {label:'日元',value:'3'},
          {label:'英镑',value:'4'},
        ],
        dataTypeOptions:[
          {label:'文本',value:'1'},
          {label:'手机号码',value:'2'},
          {label:'邮箱',value:'3'},
          {label:'数字',value:'4'},
          {label:'时间',value:'5'},
        ],
        numberTypeOptions:[
          {label:'整数',value:'0'},
          {label:'小数',value:'1'},
          {label:'百分比',value:'2'},
          {label:'货币',value:'3'},
        ],
        timeTypeOptions:[
          {label:'年月日',value:'0'},
          {label:'时分秒',value:'1'},
          {label: '年月日时分秒',value:'2'}
        ]
      };
    },
    computed: {
    },
    methods: {
      //新增页签
      addLabel(){
        this.pageVo.pimFormLabelVOs.push({
          name:'新页签',
          pimFormModuleVOs:[]
        })
        if(this.currLabelIndex==-1){
          this.currLabelIndex = 0;
        }
      },
      //切换页签
      changeLabel(index){
        this.currLabelIndex = index;
      },
      //拖拽页签
      labelDragEnd(evt){
        let currindex = this.currLabelIndex;
        let oldIndex = evt.oldIndex;
        let newIndex = evt.newIndex;

        if(currindex==oldIndex){
          this.currLabelIndex = newIndex;
          return
        }
        if(currindex==newIndex){
          this.currLabelIndex = oldIndex;
          return
        }
        if( currindex > oldIndex && currindex < newIndex ){
          this.currLabelIndex--
        }
        if(currindex < oldIndex &&  currindex > newIndex ){
          this.currLabelIndex++
        }
      },
      //删除页签
      deleteLabel(item,index){
        let name = item.name?'页签【'+ item.name +'】':'该页签';
        this.$msgbox({
          title: '提示',
          message: `确定要删除${name}？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            if(this.currLabelIndex==index){
              this.currLabelIndex = 0;
            }
            this.pageVo.pimFormLabelVOs.splice(index,1);
            if(this.pageVo.pimFormLabelVOs==0){
              this.currLabelIndex = -1;
            }
          }
        }).catch(() => {
        });
      },
      //修改页签
      changeLabelName(event){
        if(!event.target.value){
          this.$message.error('页签不能为空');
          this.currLabel.name='页签';
          return;
        }
        // this.currLabel.name = event.target.value;
      },
      //新增模块
      addModel(){
        this.currLabel.pimFormModuleVOs.push({
          name:'',
          pimFormDetailVOs:[]
        })

      },
      //删除模块
      deleteModel(modelItem,index){
        let name = modelItem.name?'模块【'+ modelItem.name +'】':'该模块';
        this.$msgbox({
          title: '提示',
          message: `确定要删除${name}？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.currLabel.pimFormModuleVOs.splice(index,1);
          }
        }).catch(() => {
        });
      },
      //新增字段
      addField(index){
        this.editFieldPosition = [index,this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs.length];
        this.fieldForm={
          controlType:'0',
          dataType:'1',
          longness:"0",
          isMust: '0',
          attachmentList:[],
          pimFormDetailExtVOs:[],
        };
        this.supplyAttachment = '0';
        this.dialogFormVisible = true;
        this.fieldFormBefore = false;
      },
      //上移
      sortPrev(index,fieldIndex){
        let pimFormDetailVOs =  this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs;
        let changeVo =  pimFormDetailVOs.splice(fieldIndex,1)[0];
        pimFormDetailVOs.splice(fieldIndex-1,0,changeVo);

      },
      //下移
      sortNext(index,fieldIndex){
        let pimFormDetailVOs =  this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs;
        let changeVo =  pimFormDetailVOs.splice(fieldIndex+1,1)[0];
        pimFormDetailVOs.splice(fieldIndex,0,changeVo);
      },
      //添加选项
      addOption(){
        this.fieldForm.pimFormDetailExtVOs.push({
          extValue:'',
          isDefault:'0'
        })
      },
      //取消默认选项
      cancelDefaultOption(event,list){
        if(event.target.value){
          return false;
        }
        list.map((item)=>{
          item.isDefault = 0;
        })
      },
      //修改默认选项
      changeDefaultOption(list,currIndex){
        list.map((item,index)=>{
          if(currIndex!=index){
            item.isDefault = 0;
          }else{

          }
        })
      },
      //删除选项
      deleteOption(index){
        this.fieldForm.pimFormDetailExtVOs.splice(index,1);
      },
      //验证选项
      validatorExt(rule, value, callback){
        let extValueArr = [];
        let haoSame= false;
        let hasEmpty = false
        let list = this.fieldForm.pimFormDetailExtVOs;
        if(list && list.length==0){
          callback(new Error('至少需要一个选项'));
          return;
        }
        list.map(o =>{
          if(o.extValue===''){
            hasEmpty = true;
          }
          if(extValueArr.indexOf( o.extValue)== -1){
            extValueArr.push(o.extValue)
          }else{
            haoSame = true;
          }
        });
        if(hasEmpty){
          callback(new Error('选项填写不完整'));
          return;
        }
        if(haoSame){
          callback(new Error('选项不能重复'));
        }else{
          callback();
        }


      },
      changeFieldType(type){
        //多行文本只能选择整行显示
        this.fieldForm.longness = (type==='1' || type==='4')?'1':'0';

      },
      changeDataType(){},
      //删除字段
      deleteField(fieldItem,fieldIndex,index){
        let label = fieldItem.label?'字段【'+ fieldItem.label +'】':'该字段';
        this.$msgbox({
          title: '提示',
          message: `确定要删除${label}？`,
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(action => {
          if (action === 'confirm') {
            this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs.splice(fieldIndex,1);
          }
        }).catch(() => {
        });
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
      //删除附件
      deleteFile(){
        this.fieldForm.attachmentList = [];
      },

      //编辑字段
      editField(index,fieldIndex){
        this.editFieldPosition = [index,fieldIndex];
        this.fieldForm = this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs[fieldIndex];
        this.fieldFormBefore = cloneDeep(this.fieldForm);
        this.dialogFormVisible = true;
      },

      //取消字段保存
      cancelFieldDialog(){
        this.dialogFormVisible = false;
        if(!this.fieldFormBefore){
           return false;
        }
        //取消时候把数据回填回去
        let index = this.editFieldPosition[0],fieldIndex = this.editFieldPosition[1];
        this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs[fieldIndex]= this.fieldFormBefore;
      },
      //保存字段
      saveField(){
        this.$refs.fieldForm.validate((valid) => {
          if (!valid) {
            return false
          }
          let index = this.editFieldPosition[0],fieldIndex = this.editFieldPosition[1];
          if(!this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs){
            this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs = [];
          }
          this.currLabel.pimFormModuleVOs[index].pimFormDetailVOs[fieldIndex]= this.fieldForm;
          this.dialogFormVisible = false;
        });
      }
    },
    watch: {
      currLabelIndex(val) {
        if(val==-1){
          this.currLabel =  false;
        }else{
          this.currLabel = this.pageVo.pimFormLabelVOs[val];
        }

      },
      value(val){
        this.pageVo = val;
        if(this.pageVo.pimFormLabelVOs && this.pageVo.pimFormLabelVOs.length!=0){
          this.currLabelIndex = 0;
        }else{
          this.currLabelIndex = -1;
        }
      }
    },
    mounted() {
      this.pageVo = this.value;
    }
  };

</script>

<style type="text/scss" lang="scss" scoped>
  .form-edit-wrap{
    position: relative;
    border: #ccc solid 1px;
    padding: 0;
    font-size: 14px;
  }
  .label-list{
    position: absolute;
    width: 250px;
    height: 100%;
    left: 0;
    top: 0;
    .label-list-title{
      line-height: 40px;
      padding: 0;
      margin: 0;
      border-bottom: #ccc solid 1px;
      .el-icon-home{
        color:#409eff;
        margin: 0 10px;
      }
    };
    .label-item{
      width: 100%;
      line-height: 60px;
      height: 60px;
      .label-name{
        display: block;
        float: left;
        padding-left: 20px;
        width: 180px;
        overflow: hidden;
        height: 60px;
      }
      .label-delete{
        margin:20px 15px 0 0;
        float: right;
        transition: all .4s;
        line-height: 20px;
        text-align: center;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        cursor: pointer;
      };
    }
    .label-item.active{
      color: #409eff;
    }
    .label-item:hover{
      background: #F2F6FC;
      .label-delete{
        color: #0c77f8;
        background: #d1dbe5;
      }
    }
  }
  .label-detail{
    min-height: 500px;
    margin-left: 250px;
    border-left: #ccc solid 1px;
    .label-detail-title{
      line-height: 40px;
      padding: 0 0 0 20px;
      margin: 0;
      border-bottom: #ccc solid 1px;
    }
    .label-name{
      padding: 22px 20px 0;
    }
  }
  .part-wrap{
    padding: 0 5px;
    .part-item{
      border-top: #ccc solid 1px;
      margin-bottom: 20px;
      padding:20px;
      position: relative;
      .part-delete{
        position: absolute;
        right: 10px;
        top:10px;
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
      .part-delete:hover{
        background: #0c77f8;
        color: #fff;
      }
    }
    .btn-part-add{
      width: 100%;
      border: #d1dbe5 dashed 1px;
    }
  }
  .mb20{ margin-bottom: 20px;}
  .field-item{
    padding-right: 20px;
    position: relative;
    .field-item-btns{
      position: absolute;
      right: 28px;
      top:11px;
      .el-button{
        width: 20px;
        height: 20px;
        font-size: 16px;
        padding: 0;
        line-height: 20px;
        margin-left:3px;
        border:none;
      }
    }
  }
  .option-delete,.file-delete{
    margin-left: 50px;
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
  .field-form-top{
    padding-bottom: 20px;
    border-bottom: #ddd solid 1px;
    margin-bottom: 20px;
  }
  .attachmentList{
    position: relative;
    height: 40px;
    line-height: 40px;
    .fileExt{
      width: 40px;
      text-align: center;
      background: #d1dbe5;
      display:none;

    }
    .fileName{
      width: 200px;
      height: 40px;
      display: inline-block;
      overflow: hidden;
      text-indent: 10px;
    }
    .file-delete{
      margin-left: 20px;
    }
  }
</style>
