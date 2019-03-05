import axios from 'axios'
import util from '@/libs/util'
export default {
  /**
   * 项目进度列表
   *  @return {*}
   */
  queryPage (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/pim/projectFollow/getProjectFollowList.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 导出项目
   *  @return {*}
   */
  export(vo) {
    let pargam = util.setUrlK(vo);
    window.open(`${process.env.VUE_APP_API_PREFIX}/pim/projectExport/exportProject.htm?${pargam}`,'_blank');
  },
  /**
   * 项目跟进列表
   *  @return {*}
   */
  getProjectDetail (vo) {
    return axios.post('/pim/projectFollow/getProjectDetail.json',vo)
  },
  /**
   * 项目跟进列表
   *  @return {*}
   */
  saveOrUpdate (vo) {
    return axios.post('/pim/projectFollow/saveOrUpdate.json',vo)
  },
}