// 频道模块
import { getChannelList } from '@/api/channel'
export default {
  namespaced: true,
  state: {
    channelList: []
  },
  mutations: {
    setChannelList (state, payload) {
      state.channelList = payload
    }
  },
  actions: {
    async getChannelList (context) {
      const res = await getChannelList()
      context.commit('setChannelList', res.data.channels)
    }
  },
  getters: {

  }
}
