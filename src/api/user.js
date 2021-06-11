// 用户有关的请求
import axios from '@/utils/request'

// 登录注册
export function login (mobile, code) {
  return axios({
    method: 'post',
    url: '/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 获取用户信息
export function getUserInfo () {
  return axios.get('/v1_0/user/profile')
}

// 更新用户信息
export function updateUserInfo (data) {
  return axios({
    method: 'patch',
    url: '/v1_0/user/profile',
    data
  })
}
