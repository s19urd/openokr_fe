<template>
  <transition name="edit">
    <d2-container v-show="isVisible" v-loading="loading" class="edit-panel">
      <template slot="header">
        <i title="后退" class="el-icon-back" @click="back"></i>
        项目模板配置详情
      </template>
      <el-steps
        :active="active"
        simple
        finish-status="success"
        style="width:80%; margin: 25px auto"
      >
        <el-step title="项目模板名称"></el-step>
        <el-step title="项目模板表格配置"></el-step>
      </el-steps>
      <div class="form-wrap">
        <div v-show="active==0" style="padding:40px 0 30px 150px">
          <el-form label-width="120px" :model="pageVo" :rules="rules" ref="saveForm1">
            <el-form-item label="项目模板名称：" prop="name">
              <el-input placeholder="请输入项目模板名称" style="width: 300px;" v-model="pageVo.name"></el-input>
            </el-form-item>
            <el-form-item label="模板类型：" prop="type">
              <el-select v-model="pageVo.type" placeholder="请选择" style="width: 300px;" filterable>
                <el-option
                  v-for="item in typeOptions"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
              <div style="color: #999">模板类型可在“模板类型配置”菜单进行新增修改</div>
            </el-form-item>
          </el-form>
        </div>
        <div v-show="active==1" style="padding:20px">
          <form-edit ref="formEdit" v-model="pageVo"></form-edit>
        </div>
      </div>
      <template slot="footer">
        <div style="text-align: center">
          <el-button v-show="active !=0 " @click="prevPage">上一步</el-button>
          <el-button v-show="active !=1 " type="primary" @click="nextPage">下一步</el-button>
          <el-button v-show="active ==1" type="primary" :loading="submitBusy" @click="submit">
            <i class="iconfont icon-save"></i> 保存
          </el-button>
          <el-button @click="back">取消</el-button>
        </div>
      </template>
    </d2-container>
  </transition>
</template>

<script>
import listMixin from "@/mixins/list.mixin";
import formEdit from "./componnets/FormEdit";
import { required } from "@/libs/rules";

export default {
  // 如果需要缓存页面
  // name 字段需要设置为和本页路由 name 字段一致
  name: "Edit",
  components: { formEdit },
  mixins: [listMixin],
  data() {
    return {
      siteId: "",
      isVisible: false,
      loading: false,
      active: 1,
      typeOptions: [],
      rules: {
        name: [
          { required: true, message: "项目模板名称必填", trigger: ["blur"] }
        ],
        type: [
          {
            required: true,
            message: "模板类型必填",
            trigger: ["change", "blur"]
          }
        ]
      },
      pageVo: {},
      submitBusy: false
    };
  },
  computed: {
    unionId() {
      return this.$route.params.unionId;
    }
  },
  methods: {
    open(vo) {
      this.pageVo = {};
      if (vo.id) {
        this.getPageVo(vo.id);
      } else {
        this.pageVo = {
          name: "",
          type: "",
          pimFormLabelVOs: []
        };
        this.$nextTick(() => {
          //移除校验结果
          this.$refs.saveForm1 && this.$refs.saveForm1.clearValidate();
          this.isVisible = true;
          this.loading = false;
        });
      }
      this.active = 0;
      this.siteId = vo.siteId;
      this.typeOptions = vo.typeOptions;
    },
    //编辑时，获取项目数据
    getPageVo(id) {
      this.$api.pim.model.getFullForm(id).then(res => {
        if (res.code === 0) {
          this.pageVo = res.data;
        } else {
          this.$message.error("获取数据失败！");
        }
        this.$nextTick(() => {
          //移除校验结果
          this.$refs.saveForm1 && this.$refs.saveForm1.clearValidate();
          this.isVisible = true;
          this.loading = false;
        });
      });
    },
    //上一页
    prevPage() {
      this.active--;
    },
    //下一页
    nextPage() {
      //判断验证当前步骤数据有效性
      if (this.active == 0) {
        this.$refs.saveForm1.validate(valid => {
          if (!valid) {
            return false;
          }
          this.active++;
        });
      }
    },
    submit() {
      if (this.submitBusy) {
        return false;
      }
      let vo = {
        ...this.pageVo,
        unionId: this.unionId,
        siteId: this.siteId
      };
      this.submitBusy = true;
      this.$api.pim.model.saveForm(vo).then(res => {
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
          this.submitBusy = false;
        }
      });
    },
    back() {
      this.isVisible = false;
      this.$refs.formEdit.currLabelIndex = -1;
      this.$emit("ok");
    }
  },
  mounted() {}
};
</script>

<style type="text/scss" lang="scss" scoped>
.tab-cont {
  font-size: 14px;
  line-height: 40px;
  padding: 0;
  margin: 0;
  color: #999;
}
</style>
<style>
.transfer-class .el-transfer-panel {
  width: 320px;
  height: 450px;
}
.transfer-class .el-transfer-panel__list.is-filterable {
  height: 346px;
}
</style>