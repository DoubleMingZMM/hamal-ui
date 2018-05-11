<template>
  <div>
    <el-form :model="component.exceptionForm" :rules="exceptionRules" ref="exceptionForm" label-width="150px">
      <el-form-item label="尝试错误次数" prop="errorCount">
        <el-input-number v-model="component.exceptionForm.errorCount" controls-position="right" :min="0" :max="6"></el-input-number>
      </el-form-item>
      <el-form-item label="尝试时间间隔" prop="exceptionTryConnnectTimeInterval">
        <el-input-number v-model="component.exceptionForm.exceptionTryConnnectTimeInterval" controls-position="right" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="并发数" prop="taskConcurrency">
        <el-input-number v-model="component.exceptionForm.taskConcurrency" controls-position="right" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="最大流通字节数" prop="channelFlowMaxBytes">
        <el-input-number v-model="component.exceptionForm.channelFlowMaxBytes" controls-position="right" :min="1" :max="30"></el-input-number>
      </el-form-item>
      <el-form-item label="最大异常记录数" prop="errorCount">
        <el-input-number v-model="component.exceptionForm.errorCount" controls-position="right" :min="0" :max="1000"></el-input-number>
      </el-form-item>
      <el-form-item label="最大异常百分比" prop="errorPercentage">
        <el-input-number v-model="component.exceptionForm.errorPercentage" controls-position="right" :min="0" :max="1000"></el-input-number>
      </el-form-item>
    </el-form>
    <div style="text-align: right;margin-top: 12px;">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="next" type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'exceptionConfig',
    components: {
    },
    props: {
    },
    data() {
      return {
        exceptionRules: {
        }
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
      ...mapMutations([
        'SET_CURRENTSTEP'
      ]),
      next() {
        let currentStep = this.component.currentStep
        if (currentStep++ >= 5) {
          currentStep = 5
        }
        this.$store.commit('component/SET_CURRENTSTEP', {
          currentStep: currentStep
        })
      },
      pre() {
        let currentStep = this.component.currentStep
        if (currentStep-- <= 0) {
          currentStep = 0
        }
        this.$store.commit('component/SET_CURRENTSTEP', {
          currentStep: currentStep
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
