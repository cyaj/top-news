// 处理频道相关请求
import axios from '@/utils/request'

/**
 * 获取频道列表，可以不登录
 * @returns Promise
 */
export const getChannelList = () => {
  return axios.get('/v1_0/user/channels')
}
