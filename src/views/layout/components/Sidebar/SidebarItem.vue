<template>
  <div class="menu-wrapper">
    <template v-for="item in routes" v-if="!item.hidden">

      <router-link v-if="hasChildren(item.children)" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path" v-bind:class="[$route.path.includes(item.path) ? 'active-background' : '']">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path" :key="item.name">
        <template slot="title">
          <svg-icon v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></svg-icon>
          <span v-if="item.meta&&item.meta.title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" v-if="!child.hidden">
          <!--<sidebar-item :is-nest="true" class="nest-menu" v-if="child.children&&child.children.length>0" :routes="[child]" :key="child.path"></sidebar-item>-->
          <router-link :to="child.path" :key="child.name">
            <el-menu-item :index="child.path" v-bind:class="[$route.path.includes(child.path) ? 'active-background' : '']">
              <svg-icon v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></svg-icon>
              <span v-if="child.meta&&child.meta.title">{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>

    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    },
    isNest: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hasChildren(children) {
      if (!children) {
        return true
      }
      return false
    }
  }
}
</script>

<style>
  .active-background{
    background-color: #ecf5ff!important;
    border-right: 2px solid rgb(64, 158, 255);

    transition: border-right-width 0.5s;
    -webkit-transition: border-right-width 0.5s;	/* Safari 和 Chrome */
  }
  .active-background:hover{
    border-right-width: 20px;
  }
  #app .el-submenu .el-menu-item {
    min-width: 219px !important;

  }
  #app .el-submenu .el-menu-item:hover {
    background-color: #ecf5ff !important;
  }
</style>

