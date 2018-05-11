/**
 * Created by wengyian on 2018/4/16.
 */
import { getList, add, edit, del, detail, connection } from '@/api/datasource'

const datasource = {
  namespaced: true,
  state: {
    list: [],
    totalRow: 1
  },
  mutations: {
    DATASOURCE_SET_TABLE: (state, params) => {
      state.totalRow = params.totalRow
      state.list = params.list
    }
  },
  actions: {
    // 获取数据源列表信息
    getDatasourceList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(res => {
          commit('DATASOURCE_SET_TABLE', res.data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 新增数据源
    addDatasource({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        add(data).then(res => {
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 编辑数据源
    editDatasource({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        edit(data).then(res => {
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 删除数据源
    deleteDatasource({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        del(data).then(res => {
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 获取详情
    getDatasourceDetail({ dispatch }, data) {
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

    // 测试连接
    testConnection({ dispatch }, data) {
      return new Promise((resolve, reject) => {
        connection(data).then(res => {
          resolve()
        }).catch(err => {
          // err === error 的情况是request 请求抛出来的 不需要在处理一遍了
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    }
  }
}

export default datasource
