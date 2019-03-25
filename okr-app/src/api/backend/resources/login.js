export default function (instance) {
  return {
    loginCheck () {
      return instance
        .get('/checkLoginStatus.json')
        .then(response => response.data)
    },

    signIn (userInfo) {
      // console.log(userInfo)
      return instance
        .post('/devLogin.json', userInfo)
        .then(response => response.data)
    }
  }
}
