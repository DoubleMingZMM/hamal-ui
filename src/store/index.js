import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import tagsView from './modules/tagsView'
import user from './modules/user'
import log from './modules/log'
import datasource from './modules/datasource'
import resource from './modules/resource'
import job from './modules/job'
import table from './modules/table'
import tableAdd from './modules/tableAdd'
import node from './modules/node'
import component from './modules/component'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    tagsView,
    user,
    log,
    datasource,
    resource,
    job,
    table,
    tableAdd,
    node,
    component
  },
  getters
})

export default store
