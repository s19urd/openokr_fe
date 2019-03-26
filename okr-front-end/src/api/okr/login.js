import axios from 'axios'

export default {

 /**
  * 确认用户是否登陆
  * @return {*}
  */
 isLogin () {
    return axios.get('/checkLoginStatus.json')
 },
}
