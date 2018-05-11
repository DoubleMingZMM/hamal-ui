<template>
  <div style="margin-top: 24px;">
    <source-config v-if="type === 0"></source-config>
    <target-config v-if="type === 1"></target-config>
    <mapping-config v-if="type === 2"></mapping-config>
    <exception-config v-if="type === 3"></exception-config>
    <dispatch-config v-if="type === 4"></dispatch-config>
    <show-config v-if="type === 5"></show-config>
  </div>
</template>

<script>
  import sourceConfig from './sourceConfig'
  import targetConfig from './targetConfig'
  import mappingConfig from './mappingConfig'
  import exceptionConfig from './exceptionConfig'
  import dispatchConfig from './dispatchConfig'
  import showConfig from './showConfig'

  export default {
    name: 'DistributeComponent',
    components: {
      sourceConfig,
      targetConfig,
      mappingConfig,
      exceptionConfig,
      dispatchConfig,
      showConfig
    },
    props: {
      type: Number
    },
    data() {
      return {
      }
    },
    computed: {
    },
    created() {
    },
    methods: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
