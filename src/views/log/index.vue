<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-select style="width: 140px;" class="filter-item" v-model="queryParams.jobGroup" @change="selectTaskGroup">
        <el-option key="0" label="全部" value="0"></el-option>
        <el-option v-for="item in log.taskGroupList" :key="item.id" :label="item.appName" :value="item.id.toString()">
        </el-option>
      </el-select>
      <el-select style="width: 140px;" class="filter-item" v-model="queryParams.jobId">
        <el-option key="0" label="全部" value="0"></el-option>
        <el-option v-for="item in log.jobGroupList" :key="item.id" :label="item.jobDesc" :value="item.id.toString()">
        </el-option>
      </el-select>
      <el-select style="width: 140px;" class="filter-item" v-model="queryParams.logStatus">
        <el-option v-for="item in logStatusType" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select>
      <el-date-picker style="vertical-align: middle;margin-bottom: 10px;"
        v-model="queryParams.filterTime"
        type="datetimerange"
        :picker-options="pickerOptions"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right">
      </el-date-picker>
      <el-button class="filter-item" type="primary" @click="handleFilter" v-waves icon="el-icon-search">搜 索</el-button>
    </div>

    <el-table :key='tableKey' :data="log.list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="任务ID" min-width="65">
        <template slot-scope="scope">
          <span>{{scope.row.jobId}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="触发时间">
        <template slot-scope="scope">
          <span>{{scope.row.triggerTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="调度结果">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.triggerCode === 200" type="success">成功</el-tag>
          <el-tag v-else-if="scope.row.triggerCode === 500" type="danger">失败</el-tag>
          <el-tag v-else-if="scope.row.triggerCode === 0" type="info">尚未执行</el-tag>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="调度备注">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="showLookModal(scope.row.triggerMsg)">查看</el-button>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="执行时间">
        <template slot-scope="scope">
          <span>{{scope.row.handleTime | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="执行结果" min-width="95">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.handleCode === 200" type="success">成功</el-tag>
          <el-tag v-else-if="scope.row.handleCode === 500" type="danger">失败</el-tag>
          <el-tag v-else-if="scope.row.handleCode === 0" type="info">尚未执行</el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="执行备注" min-width="100">
        <template slot-scope="scope">
          <span>{{scope.row.handleMsg}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button v-if="scope.row.triggerCode !== 500" type="primary"
                     size="mini" @click="showHandleModal(scope.row.id)">执行</el-button>
          <el-button v-if="scope.row.triggerCode === 200 && scope.row.handleCode === 0"
                     size="mini" type="danger" @click="showFinishModal(scope.row.id)">中止</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background @current-change="handleCurrentChange"
                     :current-page="listQuery.page" layout="total, prev, pager, next, jumper" :total="log.total">
      </el-pagination>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import waves from '@/directive/waves'
  import ElTag from '../../../node_modules/element-ui/packages/tag/src/tag' // 水波纹指令

  export default {
    components: {
      ElTag
    },
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        // jobGroupType: [{ key: '0', label: '全部' }, { key: '1', label: 'hcfdm-etl' }, { key: '2', label: '示例执行器' }],
        // jobIdType: [{ key: '0', label: '全部' }, { key: '1', label: 'hcfdm-job' }, { key: '2', label: '示例job' }],
        logStatusType: [{ key: '-1', label: '全部' }, { key: '1', label: '成功' }, { key: '2', label: '失败' }, { key: '3', label: '运行中' }],
        tableKey: 0,
        listLoading: false,
        queryParams: {
          start: 0,
          length: 10,
          jobGroup: '0',
          jobId: '0',
          logStatus: '-1',
          filterTime: ''
        },
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },

        listQuery: {
          page: 1,
          limit: 10,
          sort: 0
        },
        total: null,
        importanceOptions: [1, 2, 3],
        statusOptions: ['published', 'draft', 'deleted'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: 'Edit',
          create: 'Create'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      }
    },
    computed: {
      ...mapGetters([
        'log'
      ])
    },
    created() {
      // 刚一进页面就查询执行器列表
      this.getTaskGroupList()
      // 刚一进页面就查询任务列表
      this.getJobGroupList()
      // 刚一进页面就会调用获取列表数据的接口
      this.getList()
    },
    methods: {
      getTaskGroupList() {
        this.$store.dispatch('log/GetTaskGroupList').then(() => {
        }).catch(() => {
        })
      },
      getJobGroupList() {
        this.$store.dispatch('log/GetJobGroupList', this.queryParams.jobGroup).then(() => {
        }).catch(() => {
        })
      },
      getList() {
        this.listLoading = true
        this.$store.dispatch('log/GetLogList', this.queryParams).then(() => {
          this.listLoading = false
          // this.$router.push({ path: '/log/index' })
        }).catch(() => {
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.queryParams.start = val - 1
        this.getList()
      },
      handleFilter() {
        this.getList()
      },
      selectTaskGroup() {
        // 查询任务列表
        this.getJobGroupList()
      },

      showHandleModal(id) {
        this.$router.push({ path: `/log/detail/${id}` })
      },
      showFinishModal(id) {
        this.$confirm(`此操作将终止该调度, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('log/KillTrigger', id).then(() => {
            this.$message({
              type: 'success',
              message: '终止成功!'
            })
            this.getList()
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
      showLookModal(value) {
        this.$alert(value, '调度备注', {
          confirmButtonText: '取消'
        })
      }
    }
  }
</script>
