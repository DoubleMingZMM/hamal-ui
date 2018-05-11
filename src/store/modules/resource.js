/**
 * Created by wengyian on 2018/4/18.
 */
import { getList, add, edit, del } from '@/api/resource'
import { getList as getDatasource } from '@/api/datasource'

const resource = {
  namespaced: true,
  state: {
    list: [],
    totalRow: 1,
    datasourceList: []
  },

  mutations: {
    RESOURCE_SET_TABLE: (state, params) => {
      state.totalRow = params.totalRow
      state.list = params.list || []
    },

    RESOURCE_SET_DATASOURCE: (state, params) => {
      state.datasourceList = params.list
    }
  },

  actions: {
    // 获取资源列表信息
    getResourceList({ commit }, data) {
      return new Promise((resolve, reject) => {
        getList(data).then(res => {
          const data = res.data
          commit('RESOURCE_SET_TABLE', data)
          resolve()
        }).catch(err => {
          if (err !== 'error') {
            reject(err)
          }
        })
      })
    },

    // 删除资源
    deleteResource({ dispatch }, data) {
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

    // 注册资源
    addResource({ dispatch }, data) {
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

    // 编辑资源
    editResource({ dispatch }, data) {
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

    // 获取数据源数据 不分页
    getDatasource({ commit }, data) {
      return new Promise((resolve, reject) => {
        getDatasource(data).then(res => {
          commit('RESOURCE_SET_DATASOURCE', res.data)
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

export default resource
