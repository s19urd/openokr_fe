export default function(instance) {
  return {
    getHistoryWork(query) {
      return instance
        .post('/api/daily/getDailyPage.json', query)
        .then(response => response.data)
    },
    deleteTask(id) {
      return instance
        .get('/api/daily/deleteDailyList.json', { params: { id } })
        .then(response => response.data)
    },
  }
}
