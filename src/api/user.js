// 用户有关的请求
import axios from '@/utils/request'

/**
 * 登录注册
 * @param {string} mobile 手机号
 * @param {number} code 验证码
 * @returns Promise
 */
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

/**
 * 获取用户信息
 * @returns Promise
 */
export function getUserInfo () {
  return axios.get('/v1_0/user/profile')
}

// 更新用户信息
/**
 * 更新用户信息
 * @param {Object} data 要更新的信息，对象形式
 * @returns Promise
 */
export function updateUserInfo (data) {
  return axios({
    method: 'patch',
    url: '/v1_0/user/profile',
    data
  })
}

/**
 * 修改用户头像
 * @param {*} fd 包含图片new FormData
 * @returns
 */
export function uploadPhoto (fd) {
  return axios({
    method: 'patch',
    url: '/v1_0/user/photo',
    data: fd
  })
}
