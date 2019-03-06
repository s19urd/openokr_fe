import axios from 'axios'

export default {

 /**
  *       http://localhost:8892/devLogin.json?username=admin
  * 登陆接口
  * @return {*}
  */
  login () {
    return axios.post('http://localhost:8892/devLogin.json?username=admin')
  }
}