import { addJob } from '@/api/component'

const component = {
  namespaced: true,
  state: {
    currentStep: 2,
    allTypes: ['MySql', 'Oracle'],
    allDatas: ['数据源1', '数据源2'],
    allTables: ['表1', '表2'],
    jobDesc: '',
    jobCron: '',
    cron: {},
    effectTime: '',
    deactivateTime: '',
    mappingInfos: [{
      sourceCode: 1,
      sourceColumn: 'test',
      targetCode: 1,
      targetColumn: 'test'
    }],
    sourceForm: {
      dbId: 1, // 暂未用到
      tableId: 1, // 暂未用到
      sourceType: '',
      sourceData: '',
      sourceTable: '',
      jdbcUrl: 'jdbcUrl',
      username: 'username',
      password: 'password',
      table: 'table',
      cuttingColumn: 'splitPk',
      cuttingSum: 0,
      increaseField: '',
      incrementColumn: ['增量1', '增量2'],
      incrementTime: '',
      whereInfo: 'where',
      extractSql: 'querySql',
      extractWay: '0'
    },
    targetForm: {
      dbId: 2, // 暂未用到
      tableId: 2, // 暂未用到
      targetType: '',
      targetData: '',
      targetTable: '',
      jdbcUrl: 'jdbcUrl',
      username: 'username',
      password: 'password',
      table: 'table',
      preSql: '',
      postSql: '',
      batchCount: 0
    },
    exceptionForm: {
      channelFlowMaxBytes: 2,
      errorCount: 500,
      errorPercentage: 0,
      exceptionTryConnnectTimeInterval: 3,
      exceptionTryTimes: 3,
      taskConcurrency: 1
    },
    dispatchForm: {
      effectTimeDate: '',
      effectTimeHour: '',
      deactivateTimeDate: '',
      deactivateTimeHour: '',
      isEnable: 1
    }
  },

  mutations: {
    SET_CURRENTSTEP: (state, payload) => {
      state.currentStep = payload.currentStep
    }
  },

  actions: {
    // 新增任务
    AddJob({ commit }, queryParams) {
      return new Promise((resolve, reject) => {
        addJob(queryParams).then(() => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default component
