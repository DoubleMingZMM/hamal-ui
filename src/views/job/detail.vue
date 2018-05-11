<template>
  <div>
    <sticky className="sub-navbar draft">
      <el-button type="primary" @click="editJob">修改</el-button>
      <el-button icon="el-icon-back" @click="goBack">返回任务列表</el-button>
    </sticky>
    <div class="app-container calendar-list-container">
      <el-row style="height: 32px;line-height: 32px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">任务名称：{{job.jobDetail.jobDesc}}</el-col>
        <el-col :span="13" :offset="1">运行节点：{{job.jobDetail.jobGroup}}</el-col>
      </el-row>

      <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">是否立即执行：{{job.jobDetail.isRunNow === 1 ? '是' : '否'}}</el-col>
        <el-col :span="13" :offset="1">是否清空目标表：{{job.jobDetail.isClear === 1 ? '是' : '否'}}</el-col>
      </el-row>

      <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">尝试错误次数：{{job.jobDetail.tryTimes}}次</el-col>
        <el-col :span="13" :offset="1">尝试时间间隔：{{job.jobDetail.tryInterval}}分钟</el-col>
      </el-row>

      <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">最大一场记录数：{{job.jobDetail.maxErrors}}条</el-col>
        <el-col :span="13" :offset="1">Cron 表达式：{{job.jobDetail.jobCron}}</el-col>
      </el-row>

      <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">抽取类型：{{job.jobDetail.extractType === 1 ? '增量' : '全量'}}</el-col>
        <el-col :span="13" :offset="1">生效时间：{{job.jobDetail.effectTime}}</el-col>
      </el-row>

      <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
        <el-col :span="10">失效时间：{{job.jobDetail.deactivateTime}}</el-col>
        <el-col :span="13" :offset="1">备注：{{job.jobDetail.remark}}</el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'
  import Sticky from '@/components/Sticky' // 粘性header组件
  export default {
    components: {
      ElFormItem,
      Sticky
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapGetters([
        'job'
      ])
    },
    created() {
      // 刚一进页面就要查询任务详情的接口
      this.getJobDetail()
    },
    methods: {
      getJobDetail() {
        this.$store.dispatch('job/ShowJobDetails', this.$route.params.id).then(() => {
        }).catch(() => {
        })
      },
      goBack() {
        this.$router.push({ path: '/job/index' })
      },
      editJob() {
        this.$router.push({ path: `/job/edit/${this.$route.params.id}` })
      }
    }
  }
</script>

<style>
  .el-tabs__content{
    border-bottom: 1px solid #e4e7ed;
    border-left: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
    padding: 24px 0 0 0;
  }
  .el-tabs__header{
    margin: 0;
  }
  .el-checkbox{
    margin-right: 30px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>

