<template>
  <el-dialog
    class="createTaskForm"
    :visible="dialogVisible"
    width="60%"
    @close="close">
    <el-form :model="taskForm" label-width="85px">
      <el-form-item label="任务名称：">
        <el-input class="maxWidth" placeholder="请输入任务名称" v-model="taskForm.taskName"></el-input>
      </el-form-item>
   
     
      <el-row
        :gutter="14"
        class="sharProjectItem"
        v-for="(item, index) in taskForm.shareProjectList"
        :key="index"
        >
       
          <el-col :span="7">
            <el-form-item label="分摊名称：">
              <el-select v-model="item.projetName" placeholder="请选择项目名称">
                <el-option
                  v-for="item in projectList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="分摊类别:">
              <el-select v-model="item.projetType" placeholder="请选择">
                <el-option
                  v-for="item in projetTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="7">
            <el-form-item label="分摊比例：">
              <el-input placeholder="例如:4.0" v-model="item.ratio"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="2" class="alignCenter">
            <button class="button remove" @click="deleteShareTaskItem(item, index)"  v-if="taskForm.shareProjectList.length !== 1">
              <i class="el-icon-remove"></i>
            </button>
          </el-col>
      </el-row>
      
      <el-col :span="1" class="plusIcon">
        <button class="button add" @click="addShareTaskItem">
          <i class="el-icon-circle-plus"></i>
        </button>
      </el-col>

  
      <el-form-item label="起止时间：">
        <el-date-picker
          v-model="taskForm.date"
          type="daterange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>
  

      <el-form-item label="jira标签: ">
        <el-input class="maxWidth" placeholder="请填写jira标签" v-model="taskForm.jiraLabel"></el-input>
      </el-form-item >

    </el-form>

    <div slot="footer" class="dialog-footer">
      <p class="tipText"><i class="el-icon-warning"></i>不要忘记和目标关联哦！</p>
      <div class="buttonWarp">
        <el-button @click="cancel">取消</el-button>
        <el-button type="primary" @click="confirm">保存</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
  export default {
    name: 'create-task-form',

    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        taskForm: {
          taskName: '',
          date: '',
          jiraLabel: '',
          shareProjectList: [
            {
              shareTask: '',
              projetName: '',
              projetType: '',
              ratio: ''
            }
          ]
        },
        projectList: [],
        projetTypeList: [],
        initItem: {
          shareTask: '',
          projetName: '',
          projetType: '',
          ratio: ''
        }
      } 
    },

    methods: {
      addShareTaskItem () {
        let temp = Object.assign({}, this.initItem)
        this.taskForm['shareProjectList'].push(temp)
      },

      deleteShareTaskItem (item, index) {
        if (this.taskForm['shareProjectList'].length === 0) {
          this.$message.warining('已经是最后一条了')
          return null
        }
        this.taskForm['shareProjectList'].splice(index, 1)
      },

      cancel () {
        this.$emit('update:dialogVisible', false)
      },

      confirm () {
        this.$emit('update:dialogVisible', false)
      },

      close () {
        this.$emit('update:dialogVisible', false)
      }
    }
  }
</script>

<style lang="scss" scope>
  .createTaskForm {
    .el-icon-remove,
    .el-icon-circle-plus {
      font-size: 20px;
    }

    .button {
      position: relative;
      z-index: 1;
      border: none;
      background: transparent;
      outline:none;

      &.add {
        margin-top: -3px;
      }

      &.remove {
        margin-top: 3px;
      }
    }

    .el-icon-remove {
      color: #ff000099;
    }

    .el-icon-circle-plus {
      border: solid 2px transparent;
    }

    .plusIcon {
      float: right;
      margin-top: -60px;
      padding-left: 16px;
    }

    .tipText {
      font-size: 12px;
      color: #545454;
      
      .el-icon-warning {
        margin-right: 6px;
      }
    }

    .el-input {
      &.maxWidth {
        width: 140px;
      }
    }

    .dialog-footer {
      display: flex;
      justify-content: space-between;
    }
  }

  .alignCenter {
    text-align: center;
  }
</style>


