/**
 * Created by wengyian on 2018/4/24.
 */

import request from '@/utils/request'

// 获取数据表信息
export function getList(data) {
  return request({
    url: '/api/table/query/v1',
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

// 编辑注册表
export function edit(data) {
  return request({
    url: '/api/table/alter/v1',
    method: 'post',
    data: data
  })
}

// 删除注册表
export function del(data) {
  return request({
    url: '/api/table/delete/v1',
    method: 'post',
    data: data
  })
}

// 根据数据源获取所有列表
export function queryAllTables(data) {
  return request({
    url: '/api/dataSource/queryAllTables/v1',
    method: 'post',
    data: data
  })
}

// 查询所有字段
export function queryAllColumns(data) {
  return request({
    url: '/api/dataSource/queryAllColumns/v1',
    method: 'post',
    data: data
  })
}

// 数据表详情
export function detail(data) {
  return request({
    url: '/api/table/detail/v1',
    method: 'post',
    data: data
  })
}
