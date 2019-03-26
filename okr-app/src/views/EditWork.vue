<template>
  <div>
    <nav-bar
      title="报工汇总"
      @click-left="back"
      :fixed="true"
      :z-index="1"
      left-arrow>
    </nav-bar>

    <div class="pageContent">
      <div class="tipWrap">
        <img alt="happyIcon" src="../assets/icon-happy.png">
        <p class="tip">可以在备注信息里唠叨唠叨今天的收获呢！</p>
      </div>

      <div class="报工日期">
        <Cell title="报工日期" is-link :value="selectedTime | dateFormat('yyyy-MM-dd')" @click="showPopup('calendar')"></Cell>
      </div>

      <div class="projectWorkingHour"
         v-for="(item, index) in totalProjectReport"
         :key="index"
         >
          <div class="itemTitleWrap">
            <h4 class="itemTitle">
              项目报工<i class="num">{{ index + 1 }}</i>
            </h4>
            <Button
              type="danger"
              v-if="index!== 0"
              @click="removeProjectItem(index)">
              删除
            </Button>
          </div>
        <cell-group v-if ="totalProjectReport.length > 0">
          <Cell title="项目/产品名称" is-link :value="item.taskName" @click="showPopup('projectList', index)"></Cell>
          <field
            v-model="item.duration"
            :min="0"
            max="24"
            type="number"
            label="报工时长"
            input-align="right"
            @focus="focus($event)">
          </field>
          <field v-model="item.remark" label="备注信息" rows="1" type="textarea" autosize></field>
        </cell-group>

        <popup
          v-model="show"
          position="bottom"
          :overlay="true">

          <template v-if="showType === 'calendar'">
            <calendar>
            </calendar>
            <inlineCalendar :dayClick="dayClick"/>
          </template>

          <picker
            v-if="showType === 'projectList'"
            :columns="projectList"
            title="项目/产品名称"
            :show-toolbar="true"
            :visible-item-count="6"
            confirm-button-text="确定"
            cancel-button-text="取消"
            @cancel="cancel"
            @confirm="confirm">
          </picker>
        </popup>
      </div>

      <div class="inner">
        <Button size="large" type="info" plain @click="add">+ 增加报工</Button>
      </div>
    </div>

    <div class="fixed-toolbar">
      <div class="sumWorkingHourWrap">
        <div class="sumWorkingHour">
          <label>今日汇总工时</label>
          <span class="time">{{ sumWorkingHour }}</span>
          <label>h</label>
        </div>
        <Button type="info" @click="submit" :disabled="disabled">提交报工</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import { NavBar, Popup, Cell, CellGroup, Picker, Field, Button, Toast } from 'vant'

export default {
  name: 'report-working-hour',
  components: {
    NavBar,
    Popup,
    Cell,
    CellGroup,
    Picker,
    Field,
    Button,
  },
  data() {
    return {
      show: false,
      showType: '',
      selectedTime: new Date(),
      popIndex: '',
      projectList: [],
      initProjectReport: {},
      totalProjectReport: [],
      inValid: false,
      disabled: false,
    }
  },
  computed: {
    sumWorkingHour() {
      let sumTemp = 0
      this.totalProjectReport.forEach(item => {
        sumTemp = sumTemp + Number(item.duration)
      })
      return sumTemp
    },
    queryDay() {
      return this.$route.query.day
    },
    pickableDays() {
      let result = []
      let now = new Date()
      let nowTime = now.getTime()
      let nowDay = now.getDay() || 7
      let oneDayTime = 24 * 60 * 60 * 1000
      let startMondayTime = nowTime - (nowDay + 6) * oneDayTime
      let endSundayTime = nowTime + (7 - nowDay) * oneDayTime
      result.push(startMondayTime, endSundayTime)
      return result
    },
  },
  methods: {
    back() {
      this.$router.replace({ name: 'HistoryWork' })
    },

    focus(event) {
      event.target.select()
    },

    dayClick(date) {
      let pickDay = Vue.filter('dateFormat')(date.$d, 'yyyy-MM-dd')
      // console.log(pickDay)
      // console.log(Vue.filter('dateFormat')(this.pickableDays[0], 'yyyy-MM-dd'))
      // console.log(Vue.filter('dateFormat')(this.pickableDays[1], 'yyyy-MM-dd'))
      if (Vue.filter('dateFormat')(this.pickableDays[0], 'yyyy-MM-dd') <= pickDay && pickDay <= Vue.filter('dateFormat')(this.pickableDays[1], 'yyyy-MM-dd')) {
        this.hidePopup()
        this.selectedTime = date.$d
      } else {
        Toast('只允许填报最近两周的报工噢')
      }
    },
    showPopup(type, index) {
      this.show = true
      this.showType = type
      this.popIndex = index
    },
    hidePopup() {
      this.show = false
    },
    cancel() {
      this.hidePopup()
    },
    confirm(value, index) {
      if (this.showType === 'projectList') {
        this.totalProjectReport[this.popIndex].taskName = value.text
        this.totalProjectReport[this.popIndex].taskId = value.taskId
      }
      this.hidePopup()
    },
    add() {
      let projectItem = Object.assign({}, this.initProjectReport)
      this.totalProjectReport.push(projectItem)
    },
    removeProjectItem(index) {
      this.totalProjectReport.splice(index, 1)
    },
    validate() {
      this.totalProjectReport.forEach(item => {
        if (!item.duration) {
          Toast('报工时长不能为空')
          this.inValid = true
          return null
        }
        if (!item.taskId) {
          Toast('任务不能为空')
          this.inValid = true
          return null
        }
        if (this.sumWorkingHour > 15) {
          Toast('今日报工时长不超过15个小时')
          this.inValid = true
          return null
        }
        this.inValid = false
      })
    },
    submit() {
      this.totalProjectReport.forEach(item => {
        item.reportDay = this.selectedTime
      })

      this.validate()

      if (this.inValid) return null

      Vue.api.editWork.saveTask(this.totalProjectReport).then(res => {
        if (res.code === 0) {
          Toast('保存成功')
          this.$router.replace({ name: 'HistoryWork' })
        } else {
          Toast(`${res.message}`)
          // 重置数据
          this.queryDay && (this.disabled = true)
        }
      })
    },
    loadQueryDay() {
      // 重置为查询日期
      this.selectedTime = new Date(this.queryDay)
      let query = {
        currentPage: '',
        pageSize: '',
        reportStartDayStr: this.queryDay,
        reportEndDayStr: this.queryDay,
      }
      Vue.api.historyWork.getHistoryWork(query).then(res => {
        // console.log(res.data.data)
        const arr = (res.data && res.data.data) || []
        console.log(arr)
        arr.length && (this.totalProjectReport = arr)
        // this.currentWeekList = this.dateToArr(this.dateToObj(arr))
      })
    },
  },
  mounted() {
    // 查询当前日期数据
    this.queryDay && this.loadQueryDay()

    const query = {
      isFilterTime: '1',
      currentPage: '',
      pageSize: '',
    }

    Vue.api.editWork.getTaskListByCondition(query).then(res => {
      let resPrject = res.data.data
      resPrject.forEach((item, index) => {
        this.projectList.push({ text: item.taskName, taskId: item.id })
      })
      this.initProjectReport = {
        taskName: this.projectList[0].text,
        taskId: this.projectList[0].taskId,
        duration: 8.0,
        remark: '',
        reportDay: '',
      }
      // 非查询日期模式时新增初始任务
      !this.queryDay && this.add()
    })
  },
}
</script>
<style lang="scss">
.inner {
padding: 15px;
}
.van-nav-bar__title {
  font-size: 18px;
}

.tipWrap {
  display: flex;
  padding: 5px 15px;
  vertical-align: middle;
  height: 25px;
  line-height: 25px;
  color: #4c84ff;
  font-size: 13px;
  background-color: #edf2ff;

  img {
    width: 25px;
    margin-right: 5px;
  }

  .tip {
    margin: 0;
  }
}

.pageContent {
  padding-top: 2.875rem;
  padding-bottom: 2.875rem;
}

.projectWorkingHour {
  .van-cell__title {
    flex-grow: .5;
    text-align: left;
  }
}
.van-cell__value {
  text-overflow: ellipsis;
  white-space: nowrap;
}

.itemTitleWrap {
  display: flex;
  justify-content: space-between;
}

.itemTitle {
  padding: 11px 15px;
  color: #848484;
  font-size: 14px;
  line-height: 22px;
  margin: 0;
  text-align: left;

  .num {
    display: inline-block;
    border: 1px solid #b5b5b5;
    border-radius: 50%;
    width: 13px;
    height: 13px;
    font-size: 12px;
    line-height: 14px;
    font-style: normal;
    font-weight: normal;
    text-align: center;
    margin-left: 5px;
  }
}

.delete {
  border: none;
}

.sumWorkingHourWrap {
  display: flex;
  justify-content: space-between;
  box-shadow: 0 0 0.05rem rgba(0,0,0,.1);
}

.sumWorkingHour {
  display: flex;
  align-items: center;
  padding-left: 5px;

  .time {
    margin-left: 6px;
    margin-right: 6px;
    color: #4c84ff;
  }
}

.fixed-toolbar {
  background: #fff;
  position: fixed;
  bottom: 0;
  width: 100%;
}

// .textBlue {
//   color: #4c84ff;
// }
</style>
