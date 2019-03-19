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

  getTaskListByPage (vo) {
    return axios.post('/task/getTaskListByPage.json', vo)
  },

  getTaskDetailInfo (id) {
    return axios.get(`/task/getTaskDetailInfo.json?id=${id}`)
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
  queryUsers () {
    return axios.post('/sys/organization/findOrganizationTreeData.json')
  },

  /*
  * OKR目标管理
  * @return {*}
  */
  queryOKRTreeData () {
    return axios.post('/manage/okrObject/findAllOkrTreeData.json')
  }

  // /**
  //  * 任务列表
  //  * @return {*}
  //  */
  // queryTaskList (vo) {
  //   return axios.post('/task/getTaskListByPage.json')
  // }
}
