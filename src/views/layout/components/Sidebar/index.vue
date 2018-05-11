<template>
  <scroll-bar class="sidebar-style">
    <div class="group-title">
      {{title}}
    </div>
    <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" text-color="rgb(98, 104, 111)" style="padding-top: 15px;" active-text-color="#409EFF">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </scroll-bar>
</template>

<script>
import { constantRouterMap } from '@/router'
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar',
      'rpath'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    routes() {
      console.log(this.$route.path)
      return constantRouterMap.filter(v => v.path === this.rpath)[0].children
    },
    title() {
      return constantRouterMap.filter(v => v.path === this.rpath)[0].meta.title
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  .sidebar-style .scroll-wrapper{
    position: static!important;
  }

  .group-title{
    /* padding: 20px; */
    font-size: 20px;
    /* color: rgb(64, 158, 255); */
    font-weight: bold;
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    color: rgb(98, 104, 111);
    border-bottom: solid 1px #e6e6e6;
    overflow: hidden;
  }
</style>
