import 'sass/app.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import Api from './api'

Vue.config.productionTip = false

Vue.use(Api)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
