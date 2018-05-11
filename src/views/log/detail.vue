<template>
  <div>
  <sticky className="sub-navbar draft">
    <el-button icon="el-icon-back" @click="goBack">返回日志务列表</el-button>
  </sticky>
  <div class="app-container calendar-list-container">
    <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
      <el-col :span="11" style="border-bottom: 1px dotted #d9d9d9;">end：{{log.end}}</el-col>
      <el-col :span="12" :offset="1" style="border-bottom: 1px dotted #d9d9d9;">fromLineNum：{{log.fromLineNum}}</el-col>
    </el-row>
    <el-row style="height: 30px;line-height: 30px;margin-bottom: 8px;font-size: 14px;">
      <el-col :span="11">toLineNum：{{log.toLineNum}}</el-col>
    </el-row>
    <el-collapse>
      <el-collapse-item title="调度结果" name="1" class="el-collapse-item__header">
        <pre style="padding: 0 16px;white-space: pre-wrap;word-wrap: break-word;font-size: 14px;">{{log.logContent}}</pre>
      </el-collapse-item>
    </el-collapse>

  </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Sticky from '@/components/Sticky' // 粘性header组件
  export default {
    components: {
      Sticky
    },
    data() {
      return {
        queryParams: {
          executorAddress: '',
          triggerTime: '',
          logId: '',
          fromLineNum: 1
        },
        loading: false,
        handleCode: 0,
        end: false,
        time: ''
      }
    },
    computed: {
      ...mapGetters([
        'log'
      ])
    },
    watch: {
      log: {
        handler: function(val, oldval) {
          this.queryParams = {
            executorAddress: val.executorAddress,
            triggerTime: val.triggerTime,
            logId: val.logId,
            fromLineNum: val.fromLineNum
          }
          this.handleCode = val.handleCode
          this.end = val.end
        },
        deep: true // 对象内部的属性监听，也叫深度监听
      }
    },
    created() {
      // 一进页面通过id来查询所需要的参数,然后开始查询详情
      this.getParams()
    },
    destroyed() {
      clearInterval(this.time)
    },
    methods: {
      getParams() {
        this.loading = true
        this.$store.dispatch('log/GetLogParams', this.$route.params.id).then(() => {
          if (this.handleCode === 0) {
            setInterval(this.getLogDetailInterval, 1000)
          } else {
            this.getLogDetail()
          }
        }).catch(() => {
          this.loading = false
        })
      },
      getLogDetail() {
        this.$store.dispatch('log/GetLogDetail', this.queryParams).then(() => {
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },
      getLogDetailInterval() {
        if (this.end) {
          this.$store.dispatch('log/GetLogDetail', this.queryParams).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          clearInterval(this.time)
        }
      },
      goBack() {
        this.$router.push({ path: '/log/index' })
      }
    }
  }

</script>

<style>
  .el-collapse-item__header{
    background-color: #f5f7fa;
    font-size: 14px;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px, rgba(0, 0, 0, 0.04) 0px 0px 6px 0px;
  }
  .el-collapse-item__wrap{
    border-left: 1px solid rgb(235, 238, 245);
    border-right: 1px solid rgb(235, 238, 245);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 2px 4px 0px, rgba(0, 0, 0, 0.04) 0px 0px 6px 0px;
  }
  .el-collapse{
    border-left: 1px solid rgb(235, 238, 245);
    border-right: 1px solid rgb(235, 238, 245);
    font-size: 14px;
  }
</style>
