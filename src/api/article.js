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

/**
 * 获取文章详情
 * @param {*} id 文章id
 * @returns promise
 */
export const getArticleDetail = id => {
  return axios.get('/v1_0/articles/' + id)
}

/**
 * 对文章点赞
 * @param {*} id 文章id
 * @returns promise
 */
export const giveALike = id => {
  return axios({
    method: 'post',
    url: '/v1_0/article/likings',
    data: {
      target: id
    }
  })
}

/**
 * 取消对文章点赞
 * @param {*} id 文章id
 * @returns
 */
export const cancelLike = id => {
  return axios({
    method: 'delete',
    url: '/v1_0/article/likings/' + id
  })
}

/**
 * 取消对文章不喜欢
 * @param {*} id 文章id
 * @returns
 */
export const cancelDisLike = id => {
  return axios({
    method: 'delete',
    url: '/v1_0/article/dislikes/' + id
  })
}

/**
 * 获取评论
 * @param {*} artId 文章的id
 * @param {*} offset 上一次返回的id，用于分页。如果是第一页，可以为null
 * @returns
 */
export function getCommentList (artId, offset) {
  return axios({
    method: 'get',
    url: '/v1_0/comments',
    params: {
      type: 'a',
      source: artId,
      offset
    }
  })
}

/**
 * 发表文章评论
 * @param {*} artId 文章id
 * @param {*} content 评论内容
 * @returns
 */
export function addComment (artId, content) {
  return axios({
    method: 'post',
    url: '/v1_0/comments',
    data: {
      target: artId,
      content
    }
  })
}

/**
 * 对评论点赞
 * @param {*} commentId 评论的id
 * @returns
 */
export function addCommentZan (commentId) {
  return axios({
    url: '/v1_0/comment/likings',
    method: 'post',
    data: {
      target: commentId
    }
  })
}

/**
 * 取消评论点赞
 * @param {*} commentId 评论的id
 * @returns
 */
export function cancelCommentZan (commentId) {
  return axios({
    url: '/v1_0/comment/likings/' + commentId,
    method: 'DELETE'
  })
}

/**
 * 获取评论回复
 * @param {*} commentId 评论的id
 * @param {*} offset 分页用，不传从第一页开始
 * @returns
 */
export function getReplyList (commentId, offset) {
  return axios({
    url: '/v1_0/comments',
    method: 'get',
    params: {
      type: 'c',
      source: commentId,
      offset
    }
  })
}

/**
 * 添加评论回复
 * @param {*} commentId 回复的评论的id
 * @param {*} content 评论内容
 * @param {*} articleId 评论所属文章的id
 * @returns
 */
export function addReply (commentId, content, articleId) {
  return axios({
    method: 'post',
    url: '/v1_0/comments',
    data: {
      target: commentId,
      content,
      art_id: articleId
    }
  })
}
