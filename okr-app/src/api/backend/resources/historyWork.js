export default function (instance) {
  return {
    getHistoryWork (query) {
      return instance
        .post('/api/daily/getDailyPage.json', query)
        .then(response => response.data)
    }
  }
}
