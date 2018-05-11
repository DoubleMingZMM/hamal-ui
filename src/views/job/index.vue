<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select style="width: 140px;margin-left: 10px;" class="filter-item" v-model="queryParams.jobGroup">
        <el-option key="0" label="全部" value="0"></el-option>
        <el-option v-for="item in job.exacutorList" :key="item.id" :label="item.appName" :value="item.id.toString()">
        </el-option>
      </el-select>
      <el-col :span="4" class="filter-content">
      <el-input ref="searchInput" placeholder="任务名称搜索" @keyup.enter.native="handleFilter" v-model="queryParams.jobDesc">
        <i slot="suffix"
           class="el-input__icon el-icon-search search-icon"
        ></i>
      </el-input>
      </el-col>
      <el-button class="filter-item" type="primary" @click="handleFilter" v-waves icon="el-icon-search">搜 索</el-button>
      <el-button class="filter-item" style="float: right;" @click="handleCreate"  v-waves type="success" icon="el-icon-plus">新增任务</el-button>
    </div>

    <el-table :key='tableKey' :data="job.list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="任务ID" min-width="65">
        <template slot-scope="scope">
          <span>{{scope.row.id}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="任务名称">
        <template slot-scope="scope">
          <router-link v-bind:to="'/job/detail/'+scope.row.id">{{scope.row.jobDesc}}</router-link>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="启用状态">
        <template slot-scope="scope">
          <span>{{scope.row.IsEnable}}</span>
          <span v-if="scope.row.isEnable === 1" style="color: #67C23A;">启用</span>
          <span v-if="scope.row.isEnable === 0" style="color: #F56C6C;">停用</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="运行状态">
        <template slot-scope="scope">
          <span v-if="scope.row.jobStatus === 'NORMAL'" style="color: #67C23A;">正常</span>
          <span v-if="scope.row.jobStatus === 'PAUSED'" style="color: #F56C6C;">停止</span>
          <span v-if="scope.row.jobStatus === 'NONE'" style="color: #909399;">结束</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="调度时间">
        <template slot-scope="scope">
          <span>{{scope.row.jobCron}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="上次运行时间" min-width="95">
        <template slot-scope="scope">
          <span>{{scope.row.lastRunningTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="运行节点" min-width="95">
        <template slot-scope="scope">
          <span>{{scope.row.groupName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="来源" min-width="95">
        <template slot-scope="scope">
          <span>{{scope.row.sourceName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="目标" min-width="95">
        <template slot-scope="scope">
          <span>{{scope.row.targetName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <div v-if="scope.row.isEnable === 1">
            <el-button size="mini" type="info">日志</el-button>
            <el-button size="mini" type="info" style="width: auto;" @click="executeJob(scope.row.id)">立即执行</el-button>
            <el-button size="mini" type="danger" v-if="scope.row.jobStatus === 'NORMAL'" @click="finishJob(scope.row.id)">停止</el-button>
            <el-button size="mini" type="success" v-if="scope.row.jobStatus === 'PAUSED'" @click="startJob(scope.row.id)">启动</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange"
                     layout="total, prev, pager, next, jumper" :total="job.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag' // 水波纹指令
  export default {
    directives: {
      waves,
      ElTag
    },
    data() {
      return {
        queryParams: {
          jobDesc: '',
          jobGroup: '0',
          start: 0,
          length: 10
        },
        tableKey: 0,
        listLoading: false
      }
    },
    filters: {
    },
    computed: {
      ...mapGetters([
        'job'
      ])
    },
    created() {
      // 获取执行器列表
      this.GetExacutorList()
      // 一进页面就开始查询任务接口
      this.getJobList()
    },
    methods: {
      GetExacutorList() {
        this.$store.dispatch('job/GetExacutorList').then(() => {
        }).catch(() => {
        })
      },
      getJobList() {
        this.listLoading = true
        this.$store.dispatch('job/GetJobList', this.queryParams).then(() => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleCreate() {
        this.$router.push({ path: '/job/create' })
      },
      executeJob(id) {
        this.$confirm(`此操作将立即执行该任务, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('job/ExecuteJob', id).then(() => {
            this.$message({
              type: 'success',
              message: '立即执行成功!'
            })
            this.getJobList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '立即执行失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消立即执行'
          })
        })
      },
      finishJob(id) {
        this.$confirm(`此操作将终止该任务, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('job/PauseJob', id).then(() => {
            this.$message({
              type: 'success',
              message: '终止成功!'
            })
            this.getJobList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '终止失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消终止'
          })
        })
      },
      startJob(id) {
        this.$confirm(`此操作将启动该任务, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('job/ResumeJob', id).then(() => {
            this.$message({
              type: 'success',
              message: '启动成功!'
            })
            this.getJobList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '启动失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消启动'
          })
        })
      },
      handleCurrentChange(val) {
        this.queryParams.start = val - 1
        this.getJobList()
      },
      handleFilter() {
        this.getJobList()
      }
    }
  }
</script>
