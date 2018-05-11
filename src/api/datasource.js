/**
 * * Created by wengyian on 2018/4/16.
 */
import request from '@/utils/request'

// 获取数据源列表
export function getList(data) {
  return request({
    url: '/api/dataSource/query/v1',
    method: 'post',
    data: data
  })
}

// 数据源注册 post 请求用 data get 用 params 有点神奇了。。。
export function add(data) {
  return request({
    url: '/api/dataSource/add/v1',
    method: 'post',
    data: data
  })
}

// 数据源修改
export function edit(data) {
  return request({
    url: '/api/dataSource/alter/v1',
    method: 'post',
    data: data
  })
}

// 删除数据源
export function del(data) {
  return request({
    url: '/api/dataSource/delete/v1',
    method: 'delete',
    data: data
  })
}

// 获取数据源详情
export function detail(data) {
  return request({
    url: '/api/dataSource/queryDetail/v1',
    method: 'post',
    data: data
  })
}

// 测试连接
export function connection(data) {
  return request({
    url: '/api/dataSource/connection/v1',
    method: 'post',
    data: data
  })
}
