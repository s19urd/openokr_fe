<template>
  <el-dialog
    class="createTaskForm"
    :visible="dialogVisible"
    width="60%"
    @close="close">
    <el-form :model="taskForm" ref="taskForm">
      <el-form-item label="任务名称：" prop="taskName" class="isRequired">
        <el-input style="width: 350px; max-width: 100%" placeholder="请输入任务名称" v-model="taskForm.taskVO.taskName"></el-input>
      </el-form-item>

      <el-form-item label="起止时间:" class="dateItem isRequired">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="到"
          start-placeholder="开始时间"
          end-placeholder="结束时间">
        </el-date-picker>
      </el-form-item>

      <el-form-item label="预计耗时:" prop="estimateTime" label-width="80px" class="estimateTime">
        <el-input type="number" :min="0" placeholder="请输入预计耗时" v-model="taskForm.taskVO.estimateTime">
          <template slot="append">h</template>
        </el-input >
      </el-form-item>

      <el-form-item label="关联团队: ">
        <el-select v-model="taskForm.taskVO.belongTeam" placeholder="请选择项目名称">
          <el-option
            v-for="item in teamList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item >  
   
      <el-row
        :gutter="12"
        type="flex"
        align="middle"
        class="sharProjectItem"
        v-for="(item, index) in taskForm.apportionVOS"
        :key="index"
        >

         <el-col :span="8">
            <el-form-item label="分摊类别:" prop="categoryId">
              <el-select
                v-model="item.categoryId"
                placeholder="请选择"
                @change="changeReleatedProjectList(item)">
                <el-option
                  v-for="item in projetTypeList"
                  :key="item.id"
                  :label="item.categoryName"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="分摊名称：" prop="apportionNameId">
            <el-select v-model="item.apportionNameId" placeholder="请选择项目名称">
                <el-option
                  v-for="projectItem in item.projectReleatedList"
                  :key="projectItem.id"
                  :label="projectItem.name"
                  :value="projectItem.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="分摊比例：" prop="apportionRate">
              <el-input class="apportionRate" placeholder="例如:4.0" v-model="item.apportionRate">
                <template slot="append">%</template>
              </el-input>
            </el-form-item>
          </el-col>

          <el-col :span="1" class="remove">
            <button class="button" @click="deleteShareTaskItem(item, index)"  v-if="taskForm.apportionVOS.length !== 1">
              <i class="el-icon-remove"></i>
            </button>
          </el-col>

          <el-col :span="1" class="plusIcon" v-if="taskForm.apportionVOS.length-1 === index">
            <button class="button add" @click="addShareTaskItem">
              <i class="el-icon-circle-plus"></i>
            </button>
          </el-col>  
      </el-row>

      <el-form-item label="jira标签: " label-width="72px">
        <el-input class="jiraInputWidth" placeholder="请填写jira标签" v-model="taskForm.taskVO.jiraLabel"></el-input>
      </el-form-item >

      <el-input
        class="treeSearch"
        placeholder="输入关键字进行过滤"
        v-model="filterText">
      </el-input>

      <el-form-item label="参与人员: " class="userTreeItem">
        <el-tree
          class="userTree"
          :data="userTree"
          show-checkbox
          node-key="id"
          :default-expanded-keys="taskForm.userIds"
          :default-checked-keys="taskForm.userIds"
          @check="handleChange"
          :filter-node-method="filterNode"
          ref="userTree"></el-tree>
          <div class="selectedUser" v-if="selectedUserList.length > 0">
            <span class="text">选中参与人员：</span>
            <el-tag
             closable
             @close="handleClose(index, item.id)"
             v-for="(item, index) in selectedUserList"
             :key="item.id"
            >
            {{ item.name }}
            </el-tag>
          </div>

      </el-form-item >

      <el-form-item label="关联KR: ">
        <el-tree
          :data="KRTrees"
          show-checkbox
          node-key="id"
          :default-checked-keys="taskForm.krIds"
          ref="KRTrees"></el-tree>
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

    data () {
      return {
        dateRange: [],
        taskForm: {
          apportionVOS: [
            {
              apportionName: '',
              apportionNameId: '',
              categoryId: '',
              apportionRate: '',
              projectReleatedList: []
            }
          ],
          taskVO: {
            taskName: '',
            taskStartTime: '',
            taskEndTime: '',
            jiraLabel: '',
            estimateTime: 0,
            belongTeamName: ''
          },
          userIds: [],
          krIds: []
        },

        projetTypeList: [],
        initItem: {
          apportionName: '',
          apportionNameId: '',
          categoryId: '',
          apportionRate: '',
          projectReleatedList: []
        },
        userTree: [],
        KRTrees: [],
        teamList: [],
        flag: true,
        selectedUserList: [],
        filterText: ''
      } 
    },

    props: {
      dialogVisible: {
        type: Boolean,
        default: false
      },

      taskFormEdit: {
        type: Object,
        default: function () {
          return {
            isEdit: false,
            apportionVOS: [
              {
                apportionName: '',
                apportionNameId: '',
                categoryId: '',
                apportionRate: '',
                projectReleatedList: []
              }
            ],
            taskVO: {
              taskName: '',
              taskStartTime: '',
              taskEndTime: '',
              jiraLabel: '',
              estimateTime: 0,
              belongTeamName: ''
            },
            userIds: [],
            krIds: []
          }
        }
      }
    },

    methods: {
      addShareTaskItem () {
        let temp = Object.assign({}, this.initItem)
        this.taskForm['apportionVOS'].push(temp)
      },

      deleteShareTaskItem (item, index) {
        if (this.taskForm['apportionVOS'].length === 0) {
          this.$message.warining('已经是最后一条了')
          return null
        }
        this.taskForm['apportionVOS'].splice(index, 1)
      },

      changeReleatedProjectList (item) {
        this.$api.okr.task.getApportionSelectList(item.categoryId).then(res=> {
          // item.projectReleatedList = []
          item.projectReleatedList = res.data
          
          item.apportionNameId = res.data.length ? res.data[0].id : ''
          item.apportionName = res.data.length ? res.data[0].name : ''
        })
      },

      cancel () {
        this.$emit('update:dialogVisible', false)
      },

      validate () {
        let totalRate = 0
        this.flag = true
        if (this.taskForm) {
          if (!this.taskForm.taskVO['taskName']) {
            this.$message.warning('任务名称不能为空')
            this.flag = false
            return
          } 
          if (this.taskForm.apportionVOS.length > 0) {

            let apportionVOS = this.taskForm.apportionVOS
            apportionVOS.forEach(item => {
              if(!item.apportionNameId) {
                  this.$message.warning('分摊名称不能为空')
                  this.flag = false
                  return
              }
              else if(!item.categoryId) {
                  this.$message.warning('分摊类别不能为空')
                  this.flag = false
                  return
              }
              else if(!item.apportionRate) {
                  this.$message.warning('分摊比列不能为空')
                  this.flag = false
                  return
              }
            })
          }
          if (!this.taskForm.taskVO.taskStartTime || !this.taskForm.taskVO.taskEndTime) {
            this.$message.warning('时间不能为空')
            this.flag = false
            return
          }
        }

        (this.taskForm.apportionVOS).forEach(item => {
          totalRate += Number(item.apportionRate)
        })

        if (totalRate > 100) {
          this.$message.warning('百分比总和不能大于100%')
          this.flag = false
          return
        }
      },

      handleChange () {        
        let nodeList = this.$refs.userTree.getCheckedNodes()
        let selectedUserList = []
        if (nodeList.length > 0) {
          nodeList.forEach(item => {
            !item.children && selectedUserList.push({ name: item.label, id: item.id })
          })
        }
        this.selectedUserList = selectedUserList
      },
      
      handleClose (index, tag) {
        this.selectedUserList.splice(index, 1)
        this.taskForm['userIds'].splice(this.taskForm['userIds'].indexOf(tag), 1)
        this.$refs.userTree.setCheckedKeys(this.taskForm['userIds'])
      },

      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },

      confirm () {
        if(this.$refs.KRTrees) {
          this.taskForm['krIds'] = this.$refs.KRTrees.getCheckedKeys()
        }
        
        if (this.$refs.userTree) {
          this.taskForm['userIds'] = this.$refs.userTree.getCheckedKeys()
        }
        this.validate()
        if (this.flag) {
          this.$api.okr.task.saveTask(this.taskForm).then(res=> {
            this.$emit('update:dialogVisible', false)
            if (res.code === 0) {
              this.$message.success('保存成功！')
              this.$emit('update')
            } else {
              this.$message.success(res.message)
            }
          })
        }
      },

      close () {
        this.$emit('update:dialogVisible', false),
        this.$emit('update:taskFormEdit', {})
      }
    },

    watch: {
      dateRange () {
        if (this.dateRange.length && this.dateRange.length > 0) {
          
          this.taskForm.taskVO['taskStartTime'] = this.dateRange[0]
          this.taskForm.taskVO['taskEndTime'] = this.dateRange[1]
        }
      },

      filterText(val) {
        this.$refs.userTree.filter(val)
      }
    },

    mounted () {
      this.$api.okr.task.getApportionCategoryList().then(res=> {
        this.projetTypeList = res.data
        if (this.projetTypeList.length === 0) {

        }
      })

      this.$api.okr.task.getApportionCategoryList().then(res=> {
        this.projetTypeList = res.data
      })

      this.$api.okr.task.queryUsers().then(res => {
        this.userTree = res
        if (this.userTree.length > 0) {
          this.$nextTick(() => {
            this.handleChange()
          })
        }
      })

      this.$api.okr.task.queryOKRTreeData().then(res => {
        this.KRTrees = res
      })

      this.$api.okr.task.queryTeamList().then(res => {
        this.teamList = res.data
      })

      if (this.taskFormEdit.isEdit) {
        this.taskForm = Object.assign({}, this.taskFormEdit)
        this.dateRange[0] = this.taskForm.taskVO.taskStartTime
        this.dateRange[1] = this.taskForm.taskVO.taskEndTime
        if (this.taskForm.apportionVOS.length === 0) {
          let temp = Object.assign({}, this.initItem)
          this.taskForm.apportionVOS.push(temp)
        } else {
          this.taskForm.apportionVOS.map((item, index) => {
            this.$api.okr.task.getApportionSelectList(item.categoryId).then(res=> {
              item.projectReleatedList = res.data
            })
          })
        }
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

    .el-col {
      &.remove {
        transform: translateY(-50%);
      }
    }

    .el-form-item__label {
      text-align: left;
      width: 82px !important;
    }

    .el-form-item {
      &.isRequired {
        .el-form-item__label {
          &::before {
            content: '*';
            color: #f56c6c;
            margin-right: 4px;
            position: absolute;
            margin-left: -10px;
          }
        }
      }
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
    }

    .selectedUser {
      float: left;
      width: 40%;
      padding-top: 28px;
      padding-left: 82px;

      .text {
        display: inline-block;
        width: 100%;
      }
    }

    .userTreeItem {
      .el-form-item__label {
        margin-top: -40px;
      }
    }

    .treeSearch {
      margin-left: 82px;
    }

    .el-icon-remove {
      color: #ff000099;
    }

    .el-icon-circle-plus {
      border: solid 2px transparent;
    }

    .el-tree-node {
      margin-left: -8px;
    }

    .plusIcon {
      text-align: right;
      padding-right: 3px!important;
      transform: translateY(-50%);
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

    .dialog-footer {
      display: flex;
      justify-content: space-between;
    }

    .el-tree {
      float: left;

      &.userTree {
        padding-top: 28px;
        padding-left: 82px;
        padding-right: 82px;
      }

      .el-tree__empty-text {
        position: relative;
        left: 0;
        top: 0;
        margin-top: -13%;
        transform: none;
        display: block;
      }
    }

    .estimateTime {
      .el-input__inner {
        padding-right: 0;
      }
    }

    .el-input__inner {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }

  .el-select,
  .el-input {
    width: 188px;
    max-width: 100%;
  }

  .sharProjectItem {

    .apportionRate {
      &.el-input-group {
        width: 55%;
        min-width: 90px;

        .el-input-group__append {
          padding-left: 8px;
          padding-right: 8px;
        }
      }
    }
  }
</style>


