/**
 * Created by wengyian on 2018/4/18.
 */
import request from '@/utils/request'

// 获取资源列表
export function getList(data) {
  return request({
    url: '/api/resource/query/v1',
    method: 'post',
    data: data
  })
}

// 资源注册
export function add(data) {
  return request({
    url: '/api/resource/add/v1',
    method: 'post',
    data: data
  })
}

// 资源修改
export function edit(data) {
  return request({
    url: '/api/resource/alter/v1',
    method: 'post',
    data: data
  })
}

// 资源删除
export function del(data) {
  return request({
    url: '/api/resource/delete/v1',
    method: 'post',
    data: data
  })
}

// 注册数据表
export function register(data) {
  return request({
    url: '/api/table/add/v1',
    method: 'post',
    data: data
  })
}

