import Vue from 'vue'
import Router from 'vue-router'

import Auth from '../views/AuthView.vue'
import Analytics from '../views/AnalyticsView.vue'

Vue.use(Router)

const routes = [
  {
    path: '/auth',
    name: "Auth",
    component: Auth,
  },
  {
    path: '/analytics',
    name: "Analytics",
    component: Analytics,
  },
  {
    path: '*',
    redirect: {name: 'Auth'}
  },
]

const router = new Router({
  mode: "history",
  routes
})


export default router;