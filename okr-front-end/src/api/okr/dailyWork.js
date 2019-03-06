import axios from 'axios'

export default {
  /**
   * 提交每日报工
   * @return {*}
   */

  submitDailyWork (dailyList) {
    console.log(dailyList)
    return axios.post('/api/daily/saveDailyList.json', dailyList
    )
  },

  /**
   * POST /task/getTaskListByPage.json
   * 寻找项目列表
   * @return {*}
   */

   queryTaskListByPage () {
     return axios.post('/task/getTaskListByPage.json', {
        pageSize: 100
     })
   }
}
