import axios from 'axios'

export default {
  /**
   * 查询当前用户权限列表
   * @return {*}
   */
  getCurrentUserRole() {
    return axios.post('/sys/getCurrentUserRole.json' )
  },
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

  queryTaskListByPage (vo) {
     return axios.post('/task/getTaskListByCondition.json', vo
     )
  },

  /**
   * 全部报工-表格
   * @return {*}
   */
  allDailyWork (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    //收款管理页面有这个字段
    if(condition.searchStartEndDate && condition.searchStartEndDate.length==2){
      condition.deportTimeBegin = condition.searchStartEndDate[0];
      condition.deportTimeEnd = condition.searchStartEndDate[1];
      delete condition.searchStartEndDate;
    }
    return axios.post('/api/daily/getDailyPage.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 全部报工-搜索
   * @return {*}
   */
  getSearchConditionList (vo) {
    return axios.post('/task/getSearchConditionList.json', vo
    )
  },

}
