import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import NotFound from '@/views/404'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

export default router
