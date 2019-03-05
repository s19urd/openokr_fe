import axios from 'axios'

export default {
  /**
   * 项目管理列表
   * @return {*}
   */
  qureyPage (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/pim/project/queryPage.json', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 项目详情
   * @return {*}
   */
  queryProjectDetail(vo) {
    return axios.post('/pim/project/getProjectDetail.json', vo)
  },

  /**
   * 删除项目
   * @return {*}
   */

   deleteProject (id) {
     return axios.get('/pim/project/deleteProject.json', {
       params: {
         id
       }
     })
   },
  /**
   * 归入档案
   * @return {*}
   */
  setProjectFile (vo) {
    return axios.post('/pim/project/setProjectFile.json', vo)
  },
  /**
   * 恢复跟进
   * @return {*}
   */
  setProjectFollow (vo) {
    return axios.post('/pim/project/setProjectFollow.json', vo)
  },
  /**
   * 保存项目
   * @return {*}
   */
  saveProject (vo) {
    return axios.post('/pim/project/saveProject.json', vo)
  }
}