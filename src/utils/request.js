import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'
const baseURL = 'http://toutiao-app.itheima.net'
const request = axios.create({
  baseURL,
  timeout: 5000
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const token = store.state.user.token.token
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response.data
}, async function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // token过期，需要刷新token
    const tokenObj = store.state.user.token
    if (!tokenObj.refresh_token) {
      // 没有刷新token，跳转登录页
      toLogin()
    }
    // 有刷新token，发送请求刷新token
    try {
      // 刷新成功
      const res = await axios({
        method: 'put',
        url: baseURL + '/v1_0/authorizations',
        headers: {
          Authorization: 'Bearer ' + tokenObj.refresh_token
        }
      })
      // 保存新token
      store.commit('user/setToken', {
        token: res.data.data.token,
        refresh_token: tokenObj.refresh_token
      })
      // 重新发送请求并返回
      // console.log(error.config)
      return request(error.config)
    } catch (error) {
      // 刷新失败，跳转登录
      toLogin()
    }
  } else {
    Toast.fail('请求信息失败，请稍后重新尝试')
    return Promise.reject(error)
  }
})

// 跳转登录页
function toLogin () {
  store.commit('user/removeToken')
  router.push({
    path: '/login',
    query: {
      back: router.currentRoute.fullPath
    }
  })
  Toast.fail('登录信息失效')
}

export default request
