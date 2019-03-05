<template>
  <transition name="edit">
    <d2-container v-show="isVisible"  v-loading="loading" class="edit-panel">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back">返回上级</i>
        {{pageVo.stationName}}
      </template>
      <div class="form-wrap">
        <!-- 求租详情 -->
        <h4 class="detail-title">求租详情</h4>
        <el-row class="detail-info">
          <el-col :span="8">
            <span class="key">品牌名称：</span>
            <span class="value" >{{pageVo.name}}</span>
          </el-col>
          <el-col :span="8">
            <span class="key">所属品类：</span>
            <span class="value" >{{pageVo.typeLevelOne + (pageVo.typeLevelTwo ? (' / '+pageVo.typeLevelTwo):'')}}</span>
          </el-col>
          <el-col :span="8">
            <span class="key">联系人：</span>
            <span class="value" >{{pageVo.contacts}}</span>
          </el-col>
          <el-col :span="8">
            <span class="key">联系电话：</span>
            <span class="value" >{{pageVo.contactPhone}}</span>
          </el-col>
          <el-col :span="8">
            <span class="key">求租意向：</span>
            <span class="value" >{{pageVo.intention}}</span>
          </el-col>
        </el-row>
        <!-- 品牌资料 -->
        <h4 class="detail-title">品牌资料</h4>
        <div class="attachmentVOList" v-for="(item,index) in pageVo.attachmentVOList" :key="item.id">
          {{(index+1)}}、
          <a @click="getFile(item)" >{{item.fileName}} <i class="el-icon-download"></i></a>
        </div>
        <!-- 处理意见 -->
          <h4 class="detail-title">处理意见</h4>
          <template prop="suggestion">
            <div class="auditOpinion">{{pageVo.auditOpinion}}</div>
          </template>
      </div>
    </d2-container>
  </transition>
</template>
<script>
  export default {
    name: 'PriceDetail',
    data () {
      return {
        isVisible: false,
        loading:true,
        pageVo: {},
      }
    },

    methods: {
      open(vo){
        console.log(vo);
        //清空搜索条件
        this.isVisible = true;
        this.loading = true;
        //获取列表数据和统计数据
        this.pageVo = vo;
        this.$nextTick(() => {
          this.$api.mall.inquiry.getRentApplyDetailById(vo.id).then(res=>{
            this.pageVo.attachmentVOList= res.data.attachmentVOList;
          });
        })
      },
      getFile(file){
        this.$api.common.getFile(file)
      },
      // 返回
      back () {
        this.isVisible = false;
        this.$emit("ok");
      },

    }
  }
</script>
<style type="text/scss" lang="scss" scoped>

  .detail-title{font-size: 14px; margin: 10px 0; }
  .detail-info{
    line-height: 35px;
    margin: 10px 0;
    font-size: 14px;
    color: #606266;
  }
  .attachmentVOList{
    line-height: 35px;
    font-size: 14px;
    color:#606266;
    a{
      cursor:pointer;
      i{
        color: #409EFF;
      }
    }

  }
  .attachmentVOList a:hover{
    color: #409EFF;
  }
  .auditOpinion{
    line-height:30px;
    color:#606266;
    font-size: 14px;
  }
</style>
