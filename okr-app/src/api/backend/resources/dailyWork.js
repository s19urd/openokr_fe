export default function (instance) {
  return {
    saveTask (taskArray) {
      return instance
        .post('/okr-web/api/daily/saveDailyList.json', taskArray)
        .then(response => response.data)
    },

    queryTaskListByPage () {
      return instance
        .post('/okr-web/task/getTaskListByPage.json', {
          pageSize: 100
        })
    }
  }
}
