<template>
  <div>
    <nav-bar
      title="报工汇总"
      left-text="返回"
      @click-left="back"
      :fixed="true"
      :z-index="1"
      left-arrow>
      <icon name="search" slot="right" size="20px" @click="searchShow = !searchShow" />
    </nav-bar>

    <div class="pageContent">
      <search
        v-model="keyWord"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="searchShow = false"
        v-show="searchShow"
      />

      <tabs v-model="currentTab" color="#1989fa">
        <tab title="本周报工">
          <collapse v-model="activeCollapse">
            <collapse-item v-for="(work, key, index) in currentWeekList" :key="index" :name="index" :title="key + ' ' + work[0].weekday" :value="'总工时：' + countWork(work) + 'h'">
              <swipe-cell :right-width="65" :on-close="onClose" v-for="(item, index) in work" :key="index" :id="item.id">
                <cell-group>
                  <cell :value="item.duration + 'h'">
                    <template slot="title">
                      <span class="custom-text">{{ item.taskName }}</span>
                      <Tag plain type="primary" v-if="item.auditStatus == '00'">{{ item.auditStatusStr }}</Tag>
                      <Tag plain type="success" v-else-if="item.auditStatus == '01'">{{ item.auditStatusStr }}</Tag>
                      <Tag plain type="danger" v-else>{{ item.auditStatusStr }}</Tag>
                    </template>
                  </cell>
                </cell-group>
                <span slot="right">删除</span>
              </swipe-cell>
              <div class="collapse-bd">
                <span class="tip">滑动任务可删除</span>
                <Button type="info" size="mini" @click="editWork(key)">编辑</Button>
              </div>
            </collapse-item>
          </collapse>

          <div class="inner">
            <Button size="large" type="info" @click="$router.push({ name: 'EditWork' })">+ 添加报工</Button>
          </div>

        </tab>
        <tab title="历史报工">
          <inlineCalendar :dayClick="dayClick"/>
        </tab>
      </tabs>
    </div>

  </div>
</template>

<script>
import Vue from 'vue'
import { NavBar, Icon, Tab, Tabs, Button, Collapse, CollapseItem, Cell, CellGroup, SwipeCell, Dialog, Tag, Toast, Search } from 'vant'

export default {
  name: '',
  data () {
    return {
      currentTab: 0,
      activeCollapse: [],
      currentWeekList: {},
      searchShow: false,
      keyWord: '',
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
    Tag,
    Toast,
    Search,
  },
  mounted () {
    this.currentWeek()
  },
  methods: {
    back () {
      this.$router.replace({ name: 'Login' })
    },
    countWork (work) {
      return work.reduce((acc, el) => {
        return acc + el.duration
      }, 0)
    },
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

      // console.log(Vue.filter('dateFormat')(monday, 'yyyy-MM-dd'))
      // console.log(Vue.filter('dateFormat')(sunday, 'yyyy-MM-dd'))

      let query = {
        currentPage: '',
        pageSize: '',
        reportStartDayStr: Vue.filter('dateFormat')(monday, 'yyyy-MM-dd'),
        reportEndDayStr: Vue.filter('dateFormat')(sunday, 'yyyy-MM-dd')
      }

      Vue.api.historyWork.getHistoryWork(query).then(res => {
        // console.log(res.data.data)
        const arr = (res.data && res.data.data) || []
        // this.currentWeekList = this.dateToArr(this.dateToObj(arr))
        this.currentWeekList = this.dateToObj(arr)
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
    // dateToArr (obj) {
    //   const result = []
    //   for (const key in obj) {
    //     const tmpObj = {}
    //     if (obj.hasOwnProperty(key)) {
    //       // console.log(key)
    //       tmpObj.reportDay = key
    //       tmpObj.weekday = obj[key][0].weekday
    //       tmpObj.data = obj[key]
    //       result.unshift(tmpObj)
    //     }
    //   }
    //   console.log(result)
    //   return result
    // },
    onClose (clickPosition, instance) {
      // console.log(clickPosition)
      // console.log(instance)
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
            Vue.api.historyWork.deleteTask(instance.$attrs.id).then(res => {
              if (res.code === 0) {
                Toast('删除成功')
                this.currentWeek()
              } else {
                Toast(`${res.message}`)
              }
            })
            instance.close()
          })
          break
      }
    },
    editWork (day) {
      // console.log(day)
      this.$router.push({ name: 'EditWork', query: { day } })
    },
    onSearch (keyWord) {
      console.log(keyWord)
    },
    dayClick (date) {
      console.log(date)
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
.custom-text {
  margin-right: 10px;
}
.collapse-bd {
  padding: 10px 0 0;
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
