/**
 * Created by wengyian on 2018/4/23.
 */

import { getList, del } from '@/api/table'

const table = {
  namespaced: true,
  state: {
    list: [],
    totalRow: 1
  },

  mutations: {
    TABLE_SET_TABLE: (state, params) => {
      state.totalRow = params.totalRow
      state.list = params.list
    }
  },

  actions: {
    // 获取数据表
    getTableList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(res => {
          commit('TABLE_SET_TABLE', res.data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 删除数据表
    deleteTable({ commit }, data) {
      return new Promise((resolve, reject) => {
        del(data).then(() => {
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    }
  }
}

export default table
