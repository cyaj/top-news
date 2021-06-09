// 操作localStorage
const TOKEN_NAME = 'top-news'

export function getToken () {
  return JSON.parse(localStorage.getItem(TOKEN_NAME)) || {}
}

export function setToken (token) {
  localStorage.setItem(TOKEN_NAME, JSON.stringify(token))
}

export function removeToken () {
  localStorage.removeItem(TOKEN_NAME)
}
