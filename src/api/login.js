import request from '@/utils/request'

export function loginByUsername(data) {
  return request({
    url: '/api/user/login/v1',
    method: 'post',
    data: data
  })
}

export function logout() {
  return request({
    url: '/api/user/loginOut/v1',
    method: 'post'
  })
}

