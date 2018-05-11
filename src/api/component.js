import request from '@/utils/request'

export function addJob(queryParams) {
  debugger
  return request({
    url: '/api/v1/tasks',
    method: 'post',
    data: queryParams
  })
}
