import axios from 'axios'

export default {
  /**
   * 项目模板列表
   * @returns {*}
   */
  queryPage (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/pim/form/queryPage.json',{
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 复制项目模板
   * @returns {*}
   */
  copyForm (vo) {
    return axios.post('/pim/form/copyForm.json',vo)
  },
  /**
   * 复制项目模板
   * @returns {*}
   */
  getFormList(vo) {
    return axios.post('/pim/form/getFormList.json',vo)
  },
  /**
   * 删除项目模板
   */
  deleteForm (id) {
    return axios.get('/pim/form/deleteForm.json',{
      params: {
        id
      }
    })
  },
  /**
   * 保存项目模板
   */
  saveForm (vo) {
    return axios.post('/pim/form/saveForm.json',vo)
  },
  /**
   * 获取项目模板详细信息
   */
  getFullForm (id) {
    return axios.get('/pim/form/getFullForm.json',{
      params: {
        id
      }
    })
  },


}

