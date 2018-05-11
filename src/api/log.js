import request from '@/utils/request'

export function getLogList(queryParams) {
  return request({
    url: '/api/taskLog/query/v1',
    method: 'get',
    params: queryParams
  })
}

export function getLogDetail(queryParams) {
  return request({
    url: '/api/taskLog/view/v1',
    method: 'get',
    params: queryParams
  })
}

export function getLogParams(queryParams) {
  return request({
    url: '/api/taskLog/detail/v1',
    method: 'get',
    params: {
      logId: queryParams
    }
  })
}

export function killTrigger(queryParams) {
  return request({
    url: '/api/taskLog/kill/v1',
    method: 'post',
    params: {
      id: queryParams
    }
  })
}

export function getTaskGroupList(queryParams) {
  return request({
    url: '/api/taskGroup/query/v1',
    method: 'get'
  })
}

export function getJobGroupList(queryParams) {
  return request({
    url: '/api/taskLog/getJobsByGroup/v1',
    method: 'get',
    params: {
      jobGroup: queryParams
    }
  })
}
