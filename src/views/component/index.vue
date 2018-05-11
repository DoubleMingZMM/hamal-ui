<template>
  <div class="app-container calendar-list-container">
    <el-steps :active="component.currentStep" finish-status="finish" process-status="finish">
      <el-step title="源数据源配置" icon="el-icon-edit" style="font-size: 14px;"></el-step>
      <el-step title="目标数据源配置" icon="el-icon-upload"></el-step>
      <el-step title="映射配置" icon="el-icon-picture"></el-step>
      <el-step title="异常配置" icon="el-icon-picture"></el-step>
      <el-step title="调度配置" icon="el-icon-picture"></el-step>
      <el-step title="展示配置参数" icon="el-icon-picture"></el-step>
    </el-steps>
    <distribute-component v-bind:type="component.currentStep"></distribute-component>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import DistributeComponent from './distributeComponent'
export default {
  components: {
    DistributeComponent
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'component'
    ])
  },
  created() {
  },
  methods: {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
</style>
