import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (reportWorkingTime.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ReportWorkingTime" */ './views/Login.vue')
    },
    {
      path: '/About',
      name: 'About',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/HistoryWork',
      name: 'HistoryWork',
      // route level code-splitting
      // this generates a separate chunk (reportWorkingTime.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ReportWorkingTime" */ './views/HistoryWork.vue')
    },
    {
      path: '/HistoryWork/EditWork',
      name: 'EditWork',
      // route level code-splitting
      // this generates a separate chunk (reportWorkingTime.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "ReportWorkingTime" */ './views/EditWork.vue')
    },
  ]
})
