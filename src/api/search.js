// 搜索相关接口
import axios from '@/utils/request'

/**
 * 获取搜索建议
 * @param {*} keyword 关键词
 * @returns promise
 */
export function getSuggestion (keyword) {
  return axios({
    method: 'get',
    url: '/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
