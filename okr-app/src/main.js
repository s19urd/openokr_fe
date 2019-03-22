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
  render: h => h(App)
}).$mount('#app')
