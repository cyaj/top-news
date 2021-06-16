// 频道模块
import { getChannelList, getAllChannelList } from '@/api/channel'
export default {
  namespaced: true,
  state: {
    channelList: [],
    allChannelList: []
  },
  mutations: {
    setChannelList (state, payload) {
      state.channelList = payload
    },
    setAllChannelList (state, payload) {
      state.allChannelList = payload
    },
    addChannel (state, payload) {
      state.channelList.push(payload)
    },
    delChannel (state, payload) {
      state.channelList = state.channelList.filter(item => item.id !== payload.id)
    }
  },
  actions: {
    async getChannelList (context) {
      const res = await getChannelList()
      context.commit('setChannelList', res.data.channels)
    },
    async getAllChannelList (context) {
      const res = await getAllChannelList()
      context.commit('setAllChannelList', res.data.channels)
    }
  },
  getters: {
    // 全部频道 - 用户频道 = 可选频道
    optionalChannelList (state) {
      return state.allChannelList.filter(item => {
        return !(state.channelList.find(ele => ele.id === item.id))
      })
      // 另一种方法
      // return state.allChannelList.filter(channel => {
      //   return state.channelList.findIndex(item => item.id === channel.id) === -1
      // })
    }
  }
}
