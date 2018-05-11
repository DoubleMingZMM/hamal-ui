import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
const _import = require('./_import_' + process.env.NODE_ENV)
import NProgress from 'nprogress' // progress bar
import { getToken } from '@/utils/auth' // getToken from cookie
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import ThirdRoute from '../views/layout/components/ThirdRoute'

/** note: submenu only apppear when children.length>=1
 *   detail see  https://panjiachen.github.io/vue-element-admin-site/#/router-and-nav?id=sidebar
 **/

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']     will control the page roles (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if true ,the page will no be cached(default is false)
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  {
    path: '/etl',
    redirect: '/dashboard',
    component: Layout,
    meta: { title: 'ETL', icon: 'dashboard', noCache: true },
    children: [{
      path: '/dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: '首页', icon: 'dashboard', noCache: true }
    }, {
      path: '/datasource_mg',
      name: 'datasource_mg',
      hasThirdRoute: true,
      component: ThirdRoute,
      redirect: '/datasource',
      meta: { title: '数据源管理', icon: 'icon', noCache: true },
      children: [{
        path: '/datasource',
        component: _import('datasource/index'),
        name: 'datasource',
        meta: { title: '数据源', icon: 'dashboard', noCache: true }
      }, {
        path: '/meta',
        component: _import('meta/index'),
        name: 'meta',
        meta: { title: '元信息', icon: 'dashboard', noCache: true }
      }, {
        path: '/dataTree',
        component: _import('dataTree/index'),
        name: 'dataTree',
        meta: { title: '数据展示', icon: 'dashboard', noCache: true }
      }]
    }, {
      path: '/resource',
      component: _import('resource/index'),
      name: 'resource',
      meta: { title: '资源管理', icon: 'icon', noCache: true }
    }, {
      path: '/table',
      component: _import('table/index'),
      name: 'table',
      meta: { title: '数据表管理', icon: 'icon', noCache: true }
    }, {
      path: '/tableCreate/add',
      component: _import('table/add'),
      name: 'tableCreate',
      meta: { title: '新增数据表', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/tableEdit/edit',
      component: _import('table/add'),
      name: 'tableEdit',
      meta: { title: '编辑数据表', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/component',
      component: _import('component/index'),
      name: 'component',
      meta: { title: '组件管理', icon: 'dashboard', noCache: true }
    }, {
      path: '/job',
      component: _import('job/index'),
      name: 'job',
      meta: { title: '调度管理', icon: 'icon', noCache: true }
    }, {
      path: '/job/create',
      component: _import('job/create'),
      name: 'create',
      meta: { title: '任务新增', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/job/edit/:id',
      component: _import('job/edit'),
      name: 'edit',
      meta: { title: '任务编辑', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/job/detail/:id',
      component: _import('job/detail'),
      name: 'detail',
      meta: { title: '任务详情', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/log',
      component: _import('log/index'),
      name: 'log',
      meta: { title: '日志管理', icon: 'icon', noCache: true }
    }, {
      path: '/log/detail/:id',
      component: _import('log/detail'),
      name: 'detail',
      meta: { title: '日志详情', icon: 'icon', noCache: true },
      hidden: true
    }, {
      path: '/node',
      component: _import('node/index'),
      name: 'node',
      meta: { title: '节点管理', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '*',
    redirect: '/dashboard',
    hidden: true
  }
]

const router = new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export default router

const whiteList = ['/login'] // 白名单，以后直接进入

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if (!getToken()) { // determine if there has token todo 先不做登录
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        next()
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓，可删
        /* if (hasPermission(store.getters.roles, to.meta.roles)) {
         next()//
         } else {
         next({ path: '/401', replace: true, query: { noGoBack: true }})
         }*/
        next()
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
