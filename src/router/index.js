import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
const Login = () => import('@/views/Login')
const Layout = () => import('@/views/Layout')
const NotFound = () => import('@/views/404')
const Home = () => import('@/views/Layout/Home')
const QA = () => import('@/views/Layout/QA')
const Video = () => import('@/views/Layout/Video')
// 用户相关组件
const User = () => import(/* webpackChunkName: "user" */ '@/views/Layout/User')
const UserEdit = () => import(/* webpackChunkName: "user" */ '@/views/Layout/User/edit')
const Chat = () => import(/* webpackChunkName: "user" */ '@/views/Layout/User/chat')
// 搜索相关组件
const Search = () => import(/* webpackChunkName: "search" */ '@/views/Search')
const Result = () => import(/* webpackChunkName: "search" */ '@/views/Search/Result')

const Article = () => import('@/views/Article')
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
        component: Home,
        meta: {
          isKeepAlive: true // 是否缓存
        }
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
    path: '/user/chat',
    component: Chat
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
