import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import channel from './modules/channel'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV === 'development',
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user,
    channel
  }
})
