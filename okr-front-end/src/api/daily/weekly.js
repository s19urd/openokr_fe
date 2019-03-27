import axios from 'axios'

export default {
  /**
   * 按人员所属查询列表
   * @return {*}
   */
  getStatisticByOrg (vo) {
    return axios.post('/api/weekly/sta/getStatisticByOrg.json',vo)
  },
  /**
   * 月报折线图查询
   * @param {*}
   */
  getStatisticChartByOrg (vo) {
    return axios.post('/api/weekly/sta/getWeeklyChartByOrg.json', vo)
  },
  /**
   * 产品月报折线图查询
   * @param {*}
   */
  getStatisticChartByTask (vo) {
    return axios.post('/api/weekly/sta/getWeeklyChartByTask.json', vo)
  },
  /**
  * 按产品类别查询列表
  */
 getStatisticByTask(vo) {
    console.log(vo)
    return axios.post('/api/weekly/sta/getStatisticByTask.json', vo)
  },
  /**
   * 获取站点列表
   */
  getSiteList(unionId) {
    return axios.get('/common/getSiteList.json', {
      params: {
        unionId
      }
    })
  }
}