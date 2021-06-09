// user模块

import { getToken, setToken, removeToken } from '@/utils/storage'

export default {
  namespaced: true,
  state: {
    token: getToken()
  },
  mutations: {
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    removeToken (state) {
      removeToken()
      state.token = {}
    }
  }
}
