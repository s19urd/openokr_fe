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
