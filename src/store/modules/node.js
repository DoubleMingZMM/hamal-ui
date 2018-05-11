import { getNodeList, addNode, deleteNode, getNodeDetail, editNode } from '@/api/node'

const node = {
  namespaced: true,
  state: {
    total: 0,
    list: [],

    editNodeForm: {
      appName: '',
      title: '',
      order: 0,
      addressType: '0',
      addressList: ''
    }
  },

  mutations: {
    SET_LIST: (state, params) => {
      state.total = params.total
      state.list = params.list
    },
    SET_NODEFORM: (state, params) => {
      state.editNodeForm = params
    }
  },

  actions: {
    // 获取节点列表
    GetNodeList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getNodeList(queryParams).then(response => {
          const res = response
          const values = {
            total: res.data.length,
            list: res.data
          }
          commit('SET_LIST', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加节点
    AddNode({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        addNode(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加节点
    DeleteNode({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        deleteNode(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取节点信息
    GetNodeDetail({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getNodeDetail(queryParams).then(response => {
          const res = response
          const values = {
            ...res.data,
            addressType: res.data.addressType.toString()
          }
          commit('SET_NODEFORM', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 添加节点
    EditNode({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        editNode(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default node
