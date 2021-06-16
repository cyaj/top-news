// 处理频道相关请求
import axios from '@/utils/request'

/**
 * 获取频道列表，可以不登录
 * @returns Promise
 */
export const getChannelList = () => {
  return axios.get('/v1_0/user/channels')
}

/**
 * 获取全部频道
 * @returns promise
 */
export const getAllChannelList = () => { return axios.get('/v1_0/channels') }

/**
 * 添加频道
 * @param {Array} channels 数组里是对象形式的频道信息，要包含id和顺序序号seq
 * @returns promise
 */
export const addChannel = channels => {
  return axios({
    method: 'PATCH',
    url: '/v1_0/user/channels',
    data: {
      channels
    }
  })
}

/**
 * 删除频道
 * @param {*} id 频道id
 * @returns promise
 */
export const delChannel = id => {
  return axios({
    method: 'DELETE',
    url: `/v1_0/user/channels/${id}`
  })
}
