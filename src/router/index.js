import Vue from 'vue'
import VueRouter from 'vue-router'

import DrinkList from '../views/DrinkList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: DrinkList
  },
  {
    path: '/queue',
    component: () => import(/* webpackChunkName: "order-queue" */ '../views/OrderQueue.vue')
  },
  {
    path: '*',
    component: DrinkList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
