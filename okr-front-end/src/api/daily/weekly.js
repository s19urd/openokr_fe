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
