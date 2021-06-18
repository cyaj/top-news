import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import NotFound from '@/views/404'
import Home from '@/views/Layout/Home'
import QA from '@/views/Layout/QA'
import Video from '@/views/Layout/Video'
import User from '@/views/Layout/User'
import UserEdit from '@/views/Layout/User/edit'
import Search from '@/views/Search'
import Result from '@/views/Search/Result'
import Article from '@/views/Article'
import store from '@/store'
Vue.use(VueRouter)

// 解决路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

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
    path: '/user/edit',
    component: UserEdit
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/search/result',
    component: Result
  },
  {
    path: '/article/:id',
    component: Article
  },
  {
    path: '*',
    component: NotFound
  }
]

const router = new VueRouter({
  routes
})

const loginUrls = ['/user', '/user/edit']

// 配置导航守卫
router.beforeEach(function (to, from, next) {
  // 身份token
  const token = store.state.user.token.token
  if (token) return next()
  if (loginUrls.includes(to.path)) {
    router.push({
      path: '/login',
      query: {
        back: to.fullPath
      }
    })
  } else {
    next()
  }
})
export default router
