<template>
  <div class="app-wrapper" :class="{hideSidebar:!sidebar.opened}">
    <div class="app-content">
    <div style="width: 100%;height:60px;background-color: #304156;padding:0 10px;">
      <img src="../../assets/logo.png" class="logo" alt="logo"/>
      <div class="title">数据资源管理平台</div>
      <el-menu style="float:left;margin-left: 60px;border-bottom:none;"
               mode="horizontal"
               background-color="rgb(48, 65, 86)"
               @select="handleSelect"
               text-color="rgb(210, 210, 210)"
               :default-active="rpath"
               active-text-color="#fff">
        <router-link v-for="item in constantRouterMap" :to="item.path" :key="item.path">
          <el-menu-item :index="item.path" v-if="!item.hidden" class="el-menu-item">
            <span>{{item.meta&&item.meta.title}}</span>
          </el-menu-item>
        </router-link>
      </el-menu>

      <div class="right-menu">
        <el-dropdown class="avatar-container right-menu-item" trigger="click">
          <div class="avatar-wrapper">
            <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/">
              <el-dropdown-item>
                首页
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="logout" style="display:block;">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
      <div style="clear:both;display:table;width:100%;height: calc(100vh - 100px);">
      <div style="display:table-row;">
        <sidebar class="sidebar-container" style="border-right:solid 1px #e6e6e6;display:table-cell;width:100%;"></sidebar>
        <div class="main-container" style="overflow-y:auto;display:table-cell;">
          <navbar></navbar>
          <app-main></app-main>
        </div>
      </div>
    </div>
    </div>
    <Footer class="app-footer">
      Hamal-ui &copy; {{year}}
    </Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { Navbar, Sidebar, AppMain } from './components'
import { constantRouterMap } from '@/router'

export default {
  name: 'layout',
  data() {
    return {
      constantRouterMap: constantRouterMap,
      year: new Date().getFullYear()
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    ...mapGetters([
      'rpath',
      'avatar'
    ]),
    sidebar() {
      return this.$store.state.app.sidebar
    }
  },
  methods: {
    handleSelect(key) {
      this.$store.commit('SET_RPATH', {
        rpath: key
      })
    },
    logout() {
      this.$store.dispatch('user/LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-content{
    min-height: calc(100vh - 40px)
  }
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }
  .logo{
    float: left;
    height: 60px;
    width: 60px;
    padding:10px;
  }
  .title{
    height: 60px;
    float:left;
    line-height: 60px;
    color: white;
    font-size: 18px;
    font-weight: bold;
  }
  .el-menu-demo:hover{
    background-color: #ecf5ff!important;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 10px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
  .el-menu-item{
    border-bottom: none;
  }
  .el-menu-item:hover{
    background-color: rgb(38, 52, 69)!important;
  }
  .app-footer{
    height: 40px;
    line-height: 40px;
    text-align: center;
    background-color: #e8eaee;
  }
</style>
