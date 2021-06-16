// 操作localStorage
const TOKEN_NAME = 'top-news'
const CHANNEL_NAME = 'top-news-channel'

// 用户token
export function getToken () {
  return JSON.parse(localStorage.getItem(TOKEN_NAME)) || {}
}

export function setToken (token) {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}

export function removeToken () {
  localStorage.removeItem(TOKEN_NAME)
}

// 用户频道信息
export function setChannelList (channelList) {
  localStorage.setItem(CHANNEL_NAME, JSON.stringify(channelList))
}

export function getChannelList () {
  return JSON.parse(localStorage.getItem(CHANNEL_NAME))
}
