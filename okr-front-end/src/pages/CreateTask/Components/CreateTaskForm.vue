<template>
  <el-dialog
    class="createTaskForm"
    :visible="dialogVisible"
    width="60%"
    @close="close">
    <el-form :model="taskForm" :rules="rules"  ref="taskForm">
      <el-form-item label="任务名称：" prop="taskName">
        <el-input class="maxWidth" placeholder="请输入任务名称" v-model="taskForm.taskName"></el-input>
      </el-form-item>
   
        <el-row
          :gutter="12"
          class="sharProjectItem"
          v-for="(item, index) in taskForm.apportionVOS"
          :key="index"
          >

            <el-col :span="7">
              <el-form-item label="分摊名称：" prop="apportionNameId">
                <el-select v-model="item.apportionNameId" placeholder="请选择项目名称">
                  <el-option
                    v-for="item in projectList"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="7">
              <el-form-item label="分摊类别:" prop="categoryId">
                <el-select v-model="item.categoryId" placeholder="请选择">
                  <el-option
                    v-for="item in projetTypeList"
                    :key="item.id"
                    :label="item.categoryName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="6">
              <el-form-item label="分摊比例：" prop="apportionRate">
                <el-input class="apportionRate" placeholder="例如:4.0" v-model="item.apportionRate"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="2" class="alignCenter">
              <button class="button remove" @click="deleteShareTaskItem(item, index)"  v-if="taskForm.apportionVOS.length !== 1">
                <i class="el-icon-remove"></i>
              </button>
            </el-col>
        </el-row>
      
      <el-col :span="1" class="plusIcon">
        <button class="button add" @click="addShareTaskItem">
          <i class="el-icon-circle-plus"></i>
        </button>
      </el-col>

  
      <el-form-item label="起止时间：" class="dateItem">
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

      <!-- <el-form-item label="参与人员: ">
        <el-tree
          :data="releatedPerson"
          show-checkbox
          @check-change="handleCheckChange"></el-tree>
      </el-form-item > -->

      <!-- <el-form-item label="关联KR: ">
        <el-tree
          :data="releatedKR"
          show-checkbox
          @check-change="handleCheckChange"></el-tree>
      </el-form-item > -->

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
          // jiraLabel: '',
          apportionVOS: [
            {
              shareTask: '',
              apportionNameId: '',
              categoryId: '',
              apportionRate: ''
            }
          ]
        },
        projectList: [],
        projetTypeList: [],
        initItem: {
          shareTask: '',
          apportionNameId: '',
          categoryId: '',
          apportionRate: ''
        },

        releatedPerson: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],

        releatedKR: [ {
           label: '公司的kr',
           children: [
             { label: '部门1的Kr',
               children: [{
                 label: '部门1-1的Kr'
               }] },
             { label: '部门2的Kr' },
             { label: '部门3的Kr' }
           ]
         }
        ],

        rules: {
          taskName: [
            { required: true, message: '请选择任务名称', trigger: 'change' }
          ],
          apportionNameId: [
            { required: true, message: '请选择分摊项目' }
          ],
          categoryId: [
            { required: true, message: '请选择分摊类别', trigger: 'change' }
          ],
          apportionRate: [
            { required: true, message: '请填写分摊比例', trigger: 'blur' }
          ]
        }
      } 
    },

    methods: {
      addShareTaskItem () {
        let temp = Object.assign({}, this.initItem)
        this.taskForm['apportionVOS'].push(temp)
        console.log(this.taskForm.apportionVOS)
      },

      deleteShareTaskItem (item, index) {
        if (this.taskForm['apportionVOS'].length === 0) {
          this.$message.warining('已经是最后一条了')
          return null
        }
        this.taskForm['apportionVOS'].splice(index, 1)
      },

      cancel () {
        this.$emit('update:dialogVisible', false)
      },

      confirm () {
        // this.$refs['taskForm'].validate((valid) => {
        //   if (valid) {
        //     this.$api.okr.task.saveTask(this.taskForm).then(res=> {
        //       this.$emit('update:dialogVisible', false)
        //       console.log(res.data)
        //     })
        //   } else {
        //     return false
        //   }
        // })
        this.$api.okr.task.saveTask(this.taskForm).then(res=> {
          this.$emit('update:dialogVisible', false)
          console.log(res.data)
        })
      },

      close () {
        this.$emit('update:dialogVisible', false)
      },

      handleCheckChange(data, checked, indeterminate) {
        console.log(data, checked, indeterminate);
      },

      getApportionCategoryList () {
        this.$api.okr.task.getApportionCategoryList().then(res=> {
          this.projetTypeList = res.data
          console.log(res.data)
        })
      }
    },

    mounted () {
      this.$api.okr.task.getApportionSelectList().then(res=> {
        this.projectList = res.data
      })

      this.getApportionCategoryList()
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
        margin-left: -15px;
      }

      &.remove {
        transform: translateY(185%);
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
      margin-top: -57px;
    }

    .dateItem {
      margin-top: 10px;
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


