import { getLogList, getLogDetail, getLogParams, killTrigger, getTaskGroupList, getJobGroupList } from '@/api/log'

const log = {
  namespaced: true,
  state: {
    total: 0,
    list: [],

    logContent: '',
    fromLineNum: 0,
    end: false,

    executorAddress: '',
    triggerTime: '',
    logId: '',
    handleCode: '',

    taskGroupList: [],

    jobGroupList: []
  },

  mutations: {
    SET_LIST: (state, params) => {
      state.total = params.total
      state.list = params.list
    },
    SET_DETAIL: (state, params) => {
      state.logContent = params.logContent
      state.fromLineNum = params.toLineNum
      state.end = params.end
    },
    SET_PARAMS: (state, params) => {
      state.executorAddress = params.executorAddress
      state.triggerTime = params.triggerTime
      state.logId = params.logId
      state.handleCode = params.handleCode
    },
    SET_TASKGROUP: (state, params) => {
      state.taskGroupList = params.taskGroupList
    },
    SET_JOBGROUP: (state, params) => {
      state.jobGroupList = params.jobGroupList
    }
  },

  actions: {
    // 获取日志列表
    GetLogList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getLogList(queryParams).then(response => {
          const res = response.data
          const values = {
            total: res.recordsTotal,
            list: res.data
          }
          commit('SET_LIST', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetLogDetail({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getLogDetail(queryParams).then(response => {
          const res = response.data
          const values = {
            logContent: res.logContent,
            toLineNum: res.toLineNum,
            end: res.end
          }
          commit('SET_DETAIL', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetLogParams({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getLogParams(queryParams).then(response => {
          const res = response.data
          const values = {
            executorAddress: res.executorAddress,
            triggerTime: res.triggerTime,
            logId: res.id,
            handleCode: res.handleCode
          }
          commit('SET_PARAMS', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    KillTrigger({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        killTrigger(queryParams).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTaskGroupList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getTaskGroupList(queryParams).then(response => {
          const res = response.data
          const values = {
            taskGroupList: res
          }
          commit('SET_TASKGROUP', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetJobGroupList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getJobGroupList(queryParams).then(response => {
          const res = response.data
          const values = {
            jobGroupList: res
          }
          commit('SET_JOBGROUP', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default log
