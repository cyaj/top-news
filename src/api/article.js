// 文章相关请求
import axios from '@/utils/request'

/**
 * 获取频道的推荐文章
 * @param {Number} id
 * @param {Number} timestamp
 * @returns Promise
 */
export const getArticleList = (id, timestamp) => {
  return axios({
    method: 'get',
    url: '/v1_1/articles',
    params: {
      channel_id: id,
      timestamp,
      with_top: 1
    }
  })
}
