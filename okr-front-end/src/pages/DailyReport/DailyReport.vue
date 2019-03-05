<template>
  <d2-container>
    <template slot="header">this is header</template>
    
    <el-form class="">
      <div class="tip"><img src="public/image/okr/icon-happy.png"/>今天又完成工作了鸭！可以在备注信息里唠叨唠叨今天的收获呢！明天也要加油哦～</div>
      <div class="baseOperationWrap">
        <el-date-picker
          v-model="date"
          type="date"
          placeholder="请选择时间">
        </el-date-picker>
        <div class="buttonWrap">
          <!-- add -->
          <el-button type="default" icon="el-icon-circle-plus">新增KR</el-button>
          <!-- delete -->
          <el-button type="default" icon="el-icon-remove">删除</el-button>
          <!-- moveUp -->
          <el-button type="default" >上移</el-button>
          <!-- moveDown -->
          <el-button type="default" >下移</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        class="fillTable"
        :data="tableData"
      >
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>

        <el-table-column
          prop="name"
          label="项目/产品名称 "
          >
          <el-select placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-table-column>

        <el-table-column
          prop="name"
          label="报工时长"
          >
          <template slot-scope="scope">
            <el-input v-model="scope.row.hour" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="name"
          label="备注信息"
          >
          <template slot-scope="scope">
            <el-input v-model="scope.row.message" placeholder="请输入内容"></el-input>
          </template>
        </el-table-column>

      </el-table>
    </el-form>
  </d2-container>
</template>
<script>
  export default {
    name: 'report-working-hour',
    
    data () {
      return {
        date: '',
        tableData: [
          {
            projectName: '',
            workingHour: '',
            message: ''
          }
        ]
      }
    }
  }
</script>
<style lang="scss">
  .tip {
    padding: 22px 0px;
    border-bottom: 1px solid rgb(243, 243, 243);
  }

  .baseOperationWrap {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }

  .fillTable {
    margin-top: .2rem;
  }
</style>


