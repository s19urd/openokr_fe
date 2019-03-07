import axios from 'axios'

export default {

 /**
  * 确认用户是否登陆
  * @return {*}
  */
 isLogin () {
    return axios.post('/sys/user/checkUserLogin.json')
  }
}