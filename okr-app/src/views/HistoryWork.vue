<template>
  <div>
    <nav-bar
      title="报工汇总"
      left-text="返回"
      @click-left="back"
      :fixed="true"
      :z-index="1"
      left-arrow>
      <icon name="search" slot="right" size="20px" />
    </nav-bar>

    <div class="pageContent">
      <tabs v-model="currentTab" color="#1989fa">
        <tab title="本周报工">
          <!-- <cell-group>
            <cell :title="work.reportDay + ' ' + work.weekday" value="内容" v-for="(work, key, index) in currentWeekList" :key="index" />
          </cell-group> -->
          <collapse v-model="activeCollapse">
            <collapse-item v-for="(work, key, index) in currentWeekList" :key="index" :name="index" :title="work.reportDay + ' ' + work.weekday" :value="'总工时'">
              <swipe-cell :right-width="65" :on-close="onClose" v-for="(item, index) in work.data" :key="index">
                <cell-group>
                  <cell :title="item.taskName" :value="item.duration + 'h'" />
                </cell-group>
                <span slot="right">删除</span>
              </swipe-cell>
              <div class="collapse-bd">
                <span class="tip">滑动任务可删除</span>
                <Button type="info" size="mini" @click="editWork(work.reportDay)">编辑</Button>
              </div>
            </collapse-item>
          </collapse>

          <div class="inner">
            <Button size="large" type="info" @click="$router.push({ name: 'DailyWork' })">+ 添加报工</Button>
          </div>

        </tab>
        <tab title="历史报工">内容 2</tab>
      </tabs>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs, Button, Collapse, CollapseItem, Cell, CellGroup, SwipeCell, Dialog } from 'vant'

export default {
  name: '',
  data () {
    return {
      currentTab: 0,
      activeCollapse: [],
      currentWeekList: {},
    }
  },
  components: {
    NavBar,
    Icon,
    Tab,
    Tabs,
    Button,
    Collapse,
    CollapseItem,
    Cell,
    CellGroup,
    SwipeCell,
    Dialog,
  },
  mounted () {
    this.currentWeek()
  },
  methods: {
    back () {
      this.$router.replace({ name: 'Login' })
    },
    addWork () {},
    currentWeek () {
      // 获取周一周天的时间
      let now = new Date()
      let nowTime = now.getTime()
      let nowDay = now.getDay()
      let oneDayTime = 24 * 60 * 60 * 1000
      let MondayTime = nowTime - (nowDay - 1) * oneDayTime
      let SundayTime = nowTime + (7 - nowDay) * oneDayTime
      let monday = new Date(MondayTime)
      let sunday = new Date(SundayTime)
      function formatDate (date) {
        let d = new Date(date)
        let month = '' + (d.getMonth() + 1)
        let day = '' + d.getDate()
        let year = d.getFullYear()
        if (month.length < 2) month = '0' + month
        if (day.length < 2) day = '0' + day
        return [year, month, day].join('-')
      }
      // console.log(formatDate(monday))
      // console.log(formatDate(sunday))

      let query = {
        currentPage: '',
        pageSize: '',
        reportStartDayStr: formatDate(monday),
        reportEndDayStr: formatDate(sunday)
      }

      Vue.api.historyWork.getHistoryWork(query).then(res => {
        // console.log(res.data.data)
        const arr = (res.data && res.data.data) || []
        this.currentWeekList = this.dateToArr(this.dateToObj(arr))
      })
    },
    dateToObj (arr) {
      // console.log(arr)
      const result = {}
      arr.map((el, index, arr) => {
        let reportDay = Vue.filter('dateFormat')(el.reportDay, 'yyyy-MM-dd')
        el.weekday = new Date(reportDay).toLocaleDateString('zh-CN', { weekday: 'short' })
        Array.isArray(result[reportDay]) || (result[reportDay] = [])
        result[reportDay].push(el)
      })
      console.log(result)
      return result
    },
    dateToArr (obj) {
      const result = []
      for (const key in obj) {
        const tmpObj = {}
        if (obj.hasOwnProperty(key)) {
          // console.log(key)
          tmpObj.reportDay = key
          tmpObj.weekday = obj[key][0].weekday
          tmpObj.data = obj[key]
          result.unshift(tmpObj)
        }
      }
      console.log(result)
      return result
    },
    onClose (clickPosition, instance) {
      switch (clickPosition) {
        case 'left':
        case 'cell':
        case 'outside':
          instance.close()
          break
        case 'right':
          Dialog.confirm({
            message: '确定删除吗？'
          }).then(() => {
            instance.close()
          })
          break
      }
    },
    editWork (day) {
      // console.log(day)
      this.$router.push({ name: 'DailyWork', query: { day } })
    },
  },
}
</script>

<style lang="scss">
.inner {
  padding: 15px;
}
.van-tab {
  font-size: 14px;
}
.pageContent {
  // margin-top: -46px;
  padding-top: 46px;
}
.van-collapse-item {
  // margin-bottom: 20px;
}
.van-collapse-item__content {
  // padding-left: 0;
  // padding-right: 0;
}
.collapse-bd {
  padding: 10px 15px 0;
  border-top: 1px solid #ebedf0;
  text-align: right;

  .tip {
    margin-right: 10px;
  }
}
.van-collapse-item .van-cell__title {
  font-size: 14px;
  text-align: left;
}
.van-swipe-cell .van-cell__title {
  font-size: 12px;
  white-space: nowrap;
}
.van-swipe-cell__left,
.van-swipe-cell__right {
  color: #fff;
  font-size: 15px;
  width: 65px;
  height: 44px;
  display: inline-block;
  text-align: center;
  line-height: 44px;
  background-color: #f44;
}
</style>
