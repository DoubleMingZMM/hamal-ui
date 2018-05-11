<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews" v-if="!$route.hasThirdRoute">
        <router-view></router-view>
      </keep-alive>
      <third-route v-else></third-route>
    </transition>
  </section>
</template>

<script>
import { ThirdRoute } from './ThirdRoute'
export default {
  name: 'AppMain',
  components: {
    ThirdRoute
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews
    }
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
