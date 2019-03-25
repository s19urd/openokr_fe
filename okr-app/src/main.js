import 'sass/app.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Api from './api'
import Calendar from 'vue-mobile-calendar'
import Filter from './filter'

Vue.config.productionTip = false

Vue.use(Api)
Vue.use(Calendar)
Vue.use(Filter)

new Vue({
  router,
  store,
  created () {
    setTimeout(() => {
      this.$api.login.loginCheck().then(res => {
        // console.log(res)
        if (res && res.data) {
          // console.log(this.$router)
          // console.log(this.$router.history.current.name)
          this.$router.history.current.name === 'Login' && this.$router.replace({ name: 'HistoryWork' })
        } else {
          this.$router.replace({ name: 'Login' })
        }
      })
    }, 0)
  },
  render: h => h(App)
}).$mount('#app')
