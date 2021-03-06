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
   * POST /task/getTaskListByUser.json
   * 寻找项目列表
   * @return {*}
   */

  queryTaskListByPage (vo) {
     return axios.post('/task/getTaskListByUser.json', vo
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
    //
    if(condition.searchStartEndDate && condition.searchStartEndDate.length==2){
      condition.reportStartDayStr = condition.searchStartEndDate[0];
      condition.reportEndDayStr = condition.searchStartEndDate[1];
      delete condition.searchStartEndDate;
    }
    if(condition.reportUserIdList!=='' && condition.reportUserIdList!==undefined ){
      condition.reportUserIdList = [condition.reportUserIdList];
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
  /**
   * 获取统计页面顶部统计数据
   * @return {*}
   */
  getDailyStastics(vo){
    if(vo.searchStartEndDate && vo.searchStartEndDate.length==2){
      vo.queryStartDate = new Date(vo.searchStartEndDate[0])
      vo.queryEndDate = new Date(vo.searchStartEndDate[1])
      delete vo.searchStartEndDate;
    }
    return axios.post('/api/daily/getDailyStastics.json', vo)
  },
  /**
   * 管理员历史报工-审核日报
   * @return {*}
   */
  auditDaily (vo) {
    return axios.post('/api/daily/auditDaily.json', vo
    )
  },
}
