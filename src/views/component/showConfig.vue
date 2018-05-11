<template>
  <div class="showConfig">
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">任务名称：</span>
        <span class="span-content">深圳市拘留所出所登记信息表_ES_2</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">是否可用：</span>
        <span class="span-content">是</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">分割字段：</span>
        <span class="span-content">test</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">分割数量：</span>
        <span class="span-content">5</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">抽取方式：</span>
        <span class="span-content">增量</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">增量字段：</span>
        <span class="span-content">name</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">抽取方式：</span>
        <span class="span-content">增量</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">增量时间：</span>
        <span class="span-content">2018-06-07 17:23:55</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">where条件：</span>
        <span class="span-content">where</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">抽取SQL：</span>
        <span class="span-content">select test from dual</span>
      </el-col>
    </el-row>

    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">入库前SQL：</span>
        <span class="span-content">select test from dual</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">入库后SQL：</span>
        <span class="span-content">select test from dual</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">批量入库提交数：</span>
        <span class="span-content">1024</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">映射：</span>
        <span class="span-content">test -> test</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">并发数：</span>
        <span class="span-content">10</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">最大错误数：</span>
        <span class="span-content">60</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">通道流通最大字节：</span>
        <span class="span-content">60</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">最大错误百分比：</span>
        <span class="span-content">60%</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">尝试连接次数：</span>
        <span class="span-content">10</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">尝试连接时间间隔：</span>
        <span class="span-content">6分钟</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">cron表达式：</span>
        <span class="span-content">00 43 11 2,3,4 1,2,3 ?</span>
      </el-col>
      <el-col :span="15">
        <span class="span-title">生效时间：</span>
        <span class="span-content">2018-05-22 10:00:00</span>
      </el-col>
    </el-row>
    <el-row style="margin-bottom: 18px;">
      <el-col :span="9">
        <span class="span-title">失效时间：</span>
        <span class="span-content">2018-05-22 10:00:00</span>
      </el-col>
    </el-row>
    <div style="text-align: right;margin-top: 12px;">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="submit" type="primary">确  定</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'dispatchConfig',
    components: {
    },
    props: {
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
      ...mapMutations([
        'SET_CURRENTSTEP'
      ]),
      pre() {
        let currentStep = this.component.currentStep
        if (currentStep-- <= 0) {
          currentStep = 0
        }
        this.$store.commit('component/SET_CURRENTSTEP', {
          currentStep: currentStep
        })
      },
      submit() {
        if (this.component.dispatchForm.effectTimeDate && this.component.dispatchForm.effectTimeHour) {
          this.component.effectTime = this.component.dispatchForm.effectTimeDate + ' ' + this.component.dispatchForm.effectTimeHour
        }
        if (this.component.dispatchForm.deactivateTimeDate && this.component.dispatchForm.deactivateTimeHour) {
          this.component.deactivateTime = this.component.dispatchForm.deactivateTimeDate + ' ' + this.component.dispatchForm.deactivateTimeHour
        }
        const params = {
          jobDesc: this.component.jobDesc,
          jobCron: this.component.jobCron,
          cron: this.component.cron,
          effectTime: this.component.effectTime,
          deactivateTime: this.component.deactivateTime,
          isEnable: this.component.dispatchForm.isEnable,
          commandInfo: {
            ...this.component.exceptionForm,
            readerConfig: {
              ...this.component.sourceForm
            },
            writerConfigs: {
              ...this.component.targetForm
            },
            mappingInfos: this.component.mappingInfos
          }
        }
        delete params['commandInfo']['readerConfig']['sourceType']
        delete params['commandInfo']['readerConfig']['sourceData']
        delete params['commandInfo']['readerConfig']['sourceTable']
        delete params['commandInfo']['readerConfig']['jdbcUrl']
        delete params['commandInfo']['readerConfig']['username']
        delete params['commandInfo']['readerConfig']['password']
        delete params['commandInfo']['readerConfig']['table']
        delete params['commandInfo']['writerConfigs']['targetType']
        delete params['commandInfo']['writerConfigs']['targetData']
        delete params['commandInfo']['writerConfigs']['targetTable']
        delete params['commandInfo']['writerConfigs']['jdbcUrl']
        delete params['commandInfo']['writerConfigs']['username']
        delete params['commandInfo']['writerConfigs']['password']
        delete params['commandInfo']['writerConfigs']['table']
        this.$store.dispatch('component/AddJob', params).then(() => {
          // this.$router.push({ path: '/job/index' })
        }).catch(() => {
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .showConfig{
    .span-title{
      line-height: 24px;
      height: 24px;
      font-weight: 700;
      color: #828792;
      font-size: 14px;
      display: inline-block;
      /*width: 120px;
      text-align: right;*/
    }
    .span-content{
      color: #303133;
      font-size: 14px;
      height: 24px;
      line-height: 24px;
      display: inline-block;
    }
  }
</style>
