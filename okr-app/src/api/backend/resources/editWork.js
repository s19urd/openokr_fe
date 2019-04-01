export default function(instance) {
  return {
    saveTask(taskArray) {
      return instance
        .post('/api/daily/saveDailyList.json', taskArray)
        .then(response => response.data)
    },
    getTaskList(query) {
      return instance
        .post('/task/getTaskListByUser.json', query)
        .then(response => response.data)
    },
  }
}
