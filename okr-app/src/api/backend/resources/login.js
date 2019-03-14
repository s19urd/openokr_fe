export default function (instance) {
  return {
    saveTask (taskArray) {
      return instance
        .post('/devLogin.json?username=admin', taskArray)
        .then(response => response.data)
    },

    signIn (userInfo) {
      console.log(userInfo)
      return instance
        .post('/devLogin.json', userInfo)
        .then(response => response.data)
    }
  }
}
