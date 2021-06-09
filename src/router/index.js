import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import NotFound from '@/views/404'
import Home from '@/views/Layout/Home'
import QA from '@/views/Layout/QA'
import Video from '@/views/Layout/Video'
import User from '@/views/Layout/User'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        component: Home
      },
      {
        path: 'qa',
        component: QA
      },
      {
        path: 'Video',
        component: Video
      },
      {
        path: 'User',
        component: User
      }
    ]
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
