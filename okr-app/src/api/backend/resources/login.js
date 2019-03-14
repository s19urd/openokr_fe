export default function (instance) {
  return {
    saveTask (taskArray) {
      return instance
        .post('/okr-web/devLogin.json?username=admin', taskArray)
        .then(response => response.data)
    },

    signIn (userInfo) {
      console.log(userInfo)
      return instance
        .post('/okr-web/devLogin.json', userInfo)
        .then(response => response.data)
    }
  }
}
