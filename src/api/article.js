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
    // v1_1
    url: '/v1_1/articles',
    params: {
      channel_id: id,
      timestamp,
      with_top: 1
    }
  })
}

/**
 * 对文章不喜欢
 * @param {Number} id 文章id
 * @returns promise
 */
export const dislikeArticle = id => {
  return axios.post('/v1_0/article/dislikes', { target: id })
}

/**
 * 举报文章
 * @param {Number} id 文章id
 * @param {Number} type 举报类型
 * @returns promise
 */
export const reportArticle = (id, type) => {
  return axios({
    method: 'post',
    url: '/v1_0/article/reports',
    data: {
      target: id,
      type
    }
  })
}
