import request from '@/utils/request'

export function login(data) {
  return request('/user/login', data)
}

export function getInfo(token) {
  return request('/user/info', { token }, 2)
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
