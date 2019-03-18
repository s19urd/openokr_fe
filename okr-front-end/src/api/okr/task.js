import axios from 'axios'

export default {
  /**
   * 项目任务管理
   * @return {*}
   */
  saveTask (taskInfo) {
    console.log(taskInfo)
    return axios.post('/task/saveTask.json', {
      ...taskInfo
    })
  },

  getTaskListByPage () {
    return axios.post('/task/getTaskListByPage.json', {
      pageSize: 100
    })
  },

  getTaskDetailInfo (taskId) {
    return axios.get('/task/getTaskDetailInfo.json', taskId)
  },

  deleteTask (taskId) {
    return axios.get('/task/deleteTask.json', taskId)
  },

  getApportionCategoryList () {
    return axios.get('/task/getApportionCategoryList.json')
  },

  getApportionSelectList () {
    return axios.get('/task/getApportionSelectList.json')
  },

    /*
  * 项目相关用户信息
  * @return {*}
  */
  queryUserSelectInfo () {
    return axios.get('/sys/user/getUserSelectInfo.json')
  }
}
