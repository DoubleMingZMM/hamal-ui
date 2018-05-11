const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  status: state => state.user.status,
  roles: state => state.user.roles,
  setting: state => state.user.setting,
  errorLogs: state => state.errorLog.logs,
  log: state => state.log,
  datasource: state => state.datasource,
  resource: state => state.resource,
  job: state => state.job,
  table: state => state.table,
  tableAdd: state => state.tableAdd,
  node: state => state.node,
  rpath: state => state.app.rpath
}
export default getters
