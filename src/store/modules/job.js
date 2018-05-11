import { getJobList, addJob, getExacutorList, getJobDetail, updateJob, pauseJob, resumeJob, executeJob,
  getDataSourceList, getDataTableList } from '@/api/job'

const log = {
  namespaced: true,
  state: {
    total: 0,
    list: [],

    exacutorList: [], // 运行节点

    jobGroupList: [], //

    jobForm: {}, // 任务详情

    jobDetail: {}, // 任务详情

    fieldInfosList: [], // 增量列表

    addJob: {
      sourceForm: {
        datasourceId: '',
        tableId: '',
        tableName: ''
      }, // 源表数据

      dataSourceList: [],

      dataTableList: [],

      targetForm: {
        datasourceId: '',
        tableId: '',
        tableName: ''
      } // 目标数据
    },

    editJob: {
      sourceForm: {
        datasourceId: '',
        tableId: '',
        tableName: ''
      }, // 源表数据

      dataSourceList: [],

      dataTableList: [],

      targetForm: {
        datasourceId: '',
        tableId: '',
        tableName: ''
      } // 目标数据
    }
  },

  mutations: {
    SET_LIST: (state, params) => {
      state.total = params.total
      state.list = params.list
    },
    SET_EXACUTORLIST: (state, params) => {
      state.exacutorList = params.exacutorList
    },
    SET_JOBFORM: (state, params) => {
      state.jobForm = params.jobForm
    },
    UPDATE_JOBFORM: (state, params) => {
      state.jobForm = {
        ...state.jobForm,
        ...params
      }
    },
    SET_JOBDETAIL: (state, params) => {
      state.jobDetail = {
        ...state.jobForm,
        ...params
      }
    },
    SET_ADDDATASOURCELIST: (state, params) => {
      state.addJob.dataSourceList = params.list
    },
    SET_EDITDATASOURCELIST: (state, params) => {
      state.editJob.dataSourceList = params.list
    },
    SET_ADDDATATABLELIST: (state, params) => {
      state.addJob.dataTableList = params.list
    },
    SET_EDITDATATABLELIST: (state, params) => {
      state.editJob.dataTableList = params.list
    },
    SET_STABLENAME: (state, params) => {
      state.addJob.sourceForm.tableName = params.tableName
    },
    SET_TTABLENAME: (state, params) => {
      state.addJob.targetForm.tableName = params.tableName
    },
    SET_SEDITTABLENAME: (state, params) => {
      state.editJob.sourceForm.tableName = params.tableName
    },
    SET_TEDITTABLENAME: (state, params) => {
      state.editJob.targetForm.tableName = params.tableName
    },
    SET_FIELDINFOSLIST: (state, params) => {
      state.fieldInfosList = params.fieldInfosList
    }
  },

  actions: {
    // 获取日志列表
    GetJobList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getJobList(queryParams).then(response => {
          const res = response.data
          const values = {
            total: res.recordsTotal,
            list: res.rows
          }
          commit('SET_LIST', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新增任务
    AddJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        addJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 更新任务
    UpdateJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        updateJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取执行器列表
    GetExacutorList({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getExacutorList(queryParams).then(response => {
          const res = response.data
          const values = {
            exacutorList: res
          }
          commit('SET_EXACUTORLIST', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 任务表单详情
    GetJobDetail({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getJobDetail(queryParams).then(response => {
          const res = response.data

          const effectTimeArr = res.effectTime ? res.effectTime.split(' ') : []
          const deactivateTimeArr = res.deactivateTime ? res.deactivateTime.split(' ') : []
          const values = {
            jobForm: {
              sourceId: res.sourceId, // 不在页面显示
              targetId: res.targetId, // 不在页面显示
              jobDesc: res.jobDesc,
              sourceName: res.sourceName,
              targetName: res.targetName,
              jobGroup: res.jobGroup,
              groupName: res.groupName,
              increField: res.increField,
              jobCron: res.jobCron,
              effectTimeDate: effectTimeArr[0],
              effectTimeHour: effectTimeArr[1],
              deactivateTimeDate: deactivateTimeArr[0],
              deactivateTimeHour: deactivateTimeArr[1],
              isRunNow: res.isRunNow === 1,
              isClear: res.isClear === 1,
              tryTimes: res.tryTimes,
              tryInterval: res.tryInterval,
              maxErrors: res.maxErrors,
              extractType: res.extractType.toString(),
              sql: res.sql,
              cron: res.cron,
              remark: res.remark
            }
          }
          commit('SET_JOBFORM', values)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 任务展示详情
    ShowJobDetails({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        getJobDetail(queryParams).then(response => {
          const res = response.data

          commit('SET_JOBDETAIL', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 终止任务
    PauseJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        pauseJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 启动任务
    ResumeJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        resumeJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 立即执行任务
    ExecuteJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        executeJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有数据源
    GetDataSourceList({ commit }, values) {
      const { type, queryParams } = values
      return new Promise((resolve, reject) => {
        getDataSourceList(queryParams).then(response => {
          const res = response.data
          if (type === 'addJob') {
            commit('SET_ADDDATASOURCELIST', res)
          } else if (type === 'editJob') {
            commit('SET_EDITDATASOURCELIST', res)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有数据表
    GetDataTableList({ commit }, values) {
      const { type, queryParams } = values
      return new Promise((resolve, reject) => {
        getDataTableList(queryParams).then(response => {
          const res = response.data
          if (type === 'addJob') {
            commit('SET_ADDDATATABLELIST', res)
          } else if (type === 'editJob') {
            commit('SET_EDITDATATABLELIST', res)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default log
