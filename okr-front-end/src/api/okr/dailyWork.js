import axios from 'axios'

export default {
  /**
   * 本周历史报工
   * @return {*}
   */
  historyDailyWork (historyList) {
    return axios.post('/api/daily/getDailyPage.json', historyList
    )
  },

  /**
   * 删除本周历史报工
   * @return {*}
   */

  deleteDailyList(vo) {
    return axios.get('/api/daily/deleteDailyList.json',
      {
        params: {
          id:vo.id
        }
      }
    )
  },
  /**
   * 提交每日报工
   * @return {*}
   */

  submitDailyWork (dailyList) {
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
        pageSize: 200
     })
   },

  /**
   * 全部报工
   * @return {*}
   */
  allDailyWork (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/api/daily/getDailyPage.json', {
      ...condition,
      ...pageInfo
    })
  },

}
