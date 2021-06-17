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

/**
 * 获取搜索结果
 * @param {*} keyword 搜索关键词
 * @param {*} page 页数
 * @returns promise
 */
export function getSearchList (keyword, page = 1) {
  return axios({
    method: 'get',
    url: '/v1_0/search',
    params: {
      q: keyword,
      page,
      per_page: 10
    }
  })
}
