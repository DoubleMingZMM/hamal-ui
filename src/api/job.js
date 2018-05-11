import request from '@/utils/request'

export function getJobList(queryParams) {
  return request({
    url: '/api/task/query/v1',
    method: 'get',
    params: queryParams
  })
}

export function addJob(queryParams) {
  return request({
    url: '/api/task/add/v1',
    method: 'post',
    data: queryParams
  })
}

export function getExacutorList(queryParams) {
  return request({
    url: '/api/taskGroup/query/v1',
    method: 'get'
  })
}

export function getJobDetail(queryParams) {
  return request({
    url: '/api/task/detail/v1',
    method: 'get',
    params: {
      id: queryParams
    }
  })
}

export function updateJob(queryParams) {
  return request({
    url: '/api/task/alter/v1',
    method: 'post',
    data: queryParams
  })
}

export function pauseJob(queryParams) {
  return request({
    url: '/api/task/pause/v1',
    method: 'post',
    data: {
      id: queryParams
    }
  })
}

export function resumeJob(queryParams) {
  return request({
    url: '/api/task/resume/v1',
    method: 'post',
    data: {
      id: queryParams
    }
  })
}

export function executeJob(queryParams) {
  return request({
    url: '/api/task/trigger/v1',
    method: 'post',
    data: {
      id: queryParams
    }
  })
}

export function getDataSourceList(queryParams) {
  return request({
    url: '/api/dataSource/query/v2',
    method: 'get'
  })
}

export function getDataTableList(queryParams) {
  return request({
    url: '/api/table/query/v2',
    method: 'post',
    data: {
      datasourceId: queryParams
    }
  })
}

