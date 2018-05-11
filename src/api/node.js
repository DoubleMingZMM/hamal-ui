import request from '@/utils/request'

export function getNodeList(queryParams) {
  return request({
    url: '/api/taskGroup/query/v1',
    method: 'get',
    params: queryParams
  })
}

export function addNode(queryParams) {
  return request({
    url: '/api/taskGroup/add/v1',
    method: 'post',
    data: queryParams
  })
}

export function deleteNode(queryParams) {
  return request({
    url: '/api/taskGroup/delete/v1',
    method: 'post',
    data: {
      id: queryParams
    }
  })
}

export function getNodeDetail(queryParams) {
  return request({
    url: '/api/taskGroup/detail/v1',
    method: 'get',
    params: {
      id: queryParams
    }
  })
}

export function editNode(queryParams) {
  return request({
    url: '/api/taskGroup/alter/v1',
    method: 'post',
    data: queryParams
  })
}

