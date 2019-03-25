export default function (instance) {
  return {
    saveTask (taskArray) {
      return instance
        .post('/api/daily/saveDailyList.json', taskArray)
        .then(response => response.data)
    },

    getTaskListByCondition (query) {
      return instance
        .post('/task/getTaskListByCondition.json', query)
        .then(response => response.data)
    }
  }
}
