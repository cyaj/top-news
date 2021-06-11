// user模块

import { getToken, setToken, removeToken } from '@/utils/storage'
import { getUserInfo } from '@/api/user'

export default {
  namespaced: true,
  state: {
    token: getToken(),
    userInfo: {}
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    removeToken (state) {
      removeToken()
      state.token = {}
    },
    setUserInfo (state, payload) {
      state.userInfo = payload
    }
  },
  actions: {
    async getUserInfo (context) {
      const res = await getUserInfo()
      context.commit('setUserInfo', res.data)
    }
  }
}
