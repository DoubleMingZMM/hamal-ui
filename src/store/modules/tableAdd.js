/**
 * Created by wengyian on 2018/4/24.
 */

import { getList } from '@/api/datasource'
import { queryAllTables, queryAllColumns, register, detail, edit } from '@/api/table'

const tableAdd = {
  namespaced: true,
  state: {
    datasourceList: [],
    tableList: [],
    columnList: []
  },

  mutations: {
    TABLEADD_SET_LIST: (state, params) => {
      state.datasourceList = params.list
    },

    TABLEADD_SET_TABLE_LIST: (state, params) => {
      state.tableList = params.list
    },

    TABLEADD_SET_COLUMNS_LIST: (state, params) => {
      state.columnList = params.list
    }
  },

  actions: {
    // 获取数据源列表
    getTableDS({ commit }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(res => {
          commit('TABLEADD_SET_LIST', res.data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 获取数据表列表xinx
    getDSTableList({ commit }, data) {
      return new Promise((resolve, reject) => {
        queryAllTables(data).then(res => {
          commit('TABLEADD_SET_TABLE_LIST', res.data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 获取所有字段信息
    getAllColumns({ commit }, data) {
      return new Promise((resolve, reject) => {
        queryAllColumns(data).then(res => {
          commit('TABLEADD_SET_COLUMNS_LIST', res.data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 新增数据表
    registerTable({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        register(data).then(res => {
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 获取数据表详情
    getTableDetail({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        detail(data).then(res => {
          resolve(res)
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 编辑注册表
    editTable({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        edit(data).then(res => {
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}

export default tableAdd
