<template>
  <el-row class="resource-content">
    <el-row class="filter-container" type="flex" justify="space-between">
      <el-col :span="4" class="filter-content">
        <el-input ref="searchInput" placeholder="关键字搜索" @keyup.enter.native="handleSearch">
          <i slot="suffix"
             class="el-input__icon el-icon-search search-icon"
             @click="handleSearch"
          ></i>
        </el-input>
      </el-col>
      <el-col :span="8" class="button-content">
        <el-button type="primary" @click="handleAdd">新增</el-button>
        <!-- 暂时不提供批量删除的入口 里面的方法是按照 [] 结构所写 到时候有具体需求在处理-->
        <!--<el-button type="danger" @click="handleBatchDelete">批量删除</el-button>-->
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="resourceTable"
        :data="resource.list"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
      >
        <!--<el-table-column-->
          <!--type="selection"-->
          <!--width="55"-->
          <!--align="center"-->
        <!--&gt;</el-table-column>-->
        <el-table-column
          prop="resourceName"
          min-width="200"
          label="资源名称"
        >
        </el-table-column>
        <el-table-column
          prop="dataUpdateFrequency"
          min-width="120"
          label="数据更新频率"
        >
        </el-table-column>
        <el-table-column
          prop="registerTime"
          min-width="200"
          label="注册时间"
          :formatter="formateDate"
        >
        </el-table-column>
        <el-table-column
          prop="resourceDescription"
          min-width="200"
          label="资源描述"
        >
        </el-table-column>
        <el-table-column
          prop="resourceRemark"
          min-width="200"
          label="资源标识"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="280"
          align="center"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="handleRegister(scope.$index, scope.row)"
            >注册数据表</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="pagination-container">
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="filter.currentPage"
        layout="total, prev, pager, next, jumper"
        :total="resource.totalRow"
        :page-size="pageSize"
      ></el-pagination>
    </el-row>
    <el-dialog
      :title="dialogType === 1 ? '新增' : '编辑'"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="dialogForm"
        :rules="rules"
        ref="dialogForm"
        label-width="120px"
        class="dialog-form"
      >
        <el-form-item label="资源名称" prop="resourceName">
          <el-input v-model="dialogForm.resourceName" placeholder="请输入资源名称"></el-input>
        </el-form-item>
        <el-form-item label="数据更新频率" prop="dataUpdateFrequency">
          <el-select v-model="dialogForm.dataUpdateFrequency" placeholder="请选择数据更新频率">
            <el-option
              v-for="v in frequency"
              :value="v"
              :key="v"
              :label="v"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源描述" prop="resourceDescription">
          <el-input
            type="textarea"
            :rows="2"
            placeholder="请输入描述"
            v-model="dialogForm.resourceDescription"
          ></el-input>
        </el-form-item>
        <el-form-item label="资源标识" prop="resourceRemark">
          <el-input
            placeholder="请输入资源标识"
            v-model="dialogForm.resourceRemark"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="dialog-footer" slot="footer">
        <el-button
          @click="handleSubmit"
          type="primary"
        >确定</el-button>
        <el-button
          @click="handleCancel"
        >取消</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'resource',

    data() {
      return {
        filter: {
          resourceName: '',
          currentPage: 1
        },
        listLoading: false,
        pageSize: 10,
        dialogForm: {},
        dialogVisible: false,
        dialogType: 1, // 1 新增   2 编辑
        rules: {
          resourceName: [{
            required: true, message: '资源名称不能为空', trigger: 'change'
          }],
          dataUpdateFrequency: [{
            required: true, message: '数据更新频率不能为空', trigger: 'change'
          }],
          resourceDescription: [{
            required: true, message: '资源描述不能为空', trigger: 'change'
          }],
          resourceRemark: [{
            required: true, message: '资源标识不能为空', trigger: 'change'
          }]
        },
        selectionList: [],
        frequency: ['每分钟', '每天', '每周'],
        registerForm: {},
        registerRules: {
          tableName: [{
            required: true, message: '数据表名称不能为空', trigger: 'change'
          }],
          tableChName: [{
            required: true, message: '数据表中文名称不能为空', trigger: 'change'
          }],
          datasourceId: [{
            required: true, message: '关联数据源不能为空', trigger: 'change'
          }],
          tableFieldInfo: [{
            required: true, message: '表字段信息不能为空', trigger: 'change'
          }],
          rowSeparator: [{
            required: true, message: '行分隔符不能为空', trigger: 'change'
          }],
          columnSeparator: [{
            required: true, message: '列分隔符不能为空', trigger: 'change'
          }]
        },
        registerVisible: false,
        resourceId: -1, // -1 表示么有
        datasourceList: [] // 注册数据表的数据源信息
      }
    },

    created() {
      this.getList()
      this.getDataSourceList()
    },

    mounted() {
    },

    computed: {
      ...mapGetters([
        'resource'
      ])
    },

    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        this.$store.dispatch('resource/getResourceList', this.filter).then(() => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

      // table 选中变化
      handleSelectionChange(rows) {
        this.selectionList = rows.map(v => v.resourceId)
      },

      // table 页码变化
      handleCurrentChange(val) {
        this.filter = {
          ...this.filter,
          currentPage: val
        }
        this.getList()
      },

      // 编辑某项
      handleEdit(index, row) {
        this.dialogType = 2
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
        // 此处需要一份新数据 不能直接沿用 row 否者会与页面的数据双绑 编辑时也会改变列表
        this.dialogForm = { ...row }
        this.dialogVisible = true
      },

      // 删除某项
      handleDelete(index, row) {
        this.deleteResource({
          resourceId: row.resourceId
        })
      },

      // 新增按钮
      handleAdd() {
        this.dialogType = 1
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
        this.dialogForm = {}
        this.dialogVisible = true
      },

      // 批量删除
      handleBatchDelete() {
        if (this.selectionList.length === 0) {
          this.$message({
            type: 'warning',
            message: '请选择要删除的数据源'
          })
        } else {
          // todo 暂时不支持这个批量删除 到时候需要的时候 再具体该着 selectionList
          this.deleteResource(this.selectionList)
        }
      },

      deleteResource(data) {
        this.$confirm('是否确定删除所选数据?', '确认删除', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('resource/deleteResource', data).then(() => {
            // 没有批量删除了 所以这个也不需要了
            // this.selectionList = this.selectionList.filter(v => !data.include(v))
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getList()
          })
        }).catch(err => {
          if (err !== 'cancel') {
            this.$message({
              type: 'error',
              message: err.message
            })
          }
        })
      },

      // 弹窗确定
      handleSubmit() {
        this.$refs.dialogForm.validate(valid => {
          if (valid) {
            const actionType = this.dialogType === 1 ? 'addResource' : 'editResource'
            const data = { ...this.dialogForm }
            Reflect.deleteProperty(data, 'currentPage')
            Reflect.deleteProperty(data, 'pageSize')
            Reflect.deleteProperty(data, 'startRow')
            this.$store.dispatch(`resource/` + actionType, data).then(() => {
              const message = this.dialogType === 1 ? '新增成功' : '编辑成功'
              this.$message({
                type: 'success',
                message: message
              })
              this.dialogVisible = false
              this.getList()
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.message
              })
            })
          } else {
            return false
          }
        })
      },

      // 弹窗取消
      handleCancel() {
        this.dialogVisible = false
      },

      // 关键字搜索
      handleSearch() {
        const val = this.$refs.searchInput.$refs.input.value
        if (this.filter.currentPage === 1) {
          this.filter = {
            currentPage: 1,
            resourceName: val
          }
          // 重新获取列表
          this.getList()
        } else {
          this.filter = {
            currentPage: 1,
            resourceName: val
          }
        }
      },

      // 格式化时间
      formateDate(row, column, cellValue) {
        const date = new Date(cellValue)
        const Y = date.getFullYear()
        let M = date.getMonth() + 1
        let D = date.getDate()
        let h = date.getHours()
        let m = date.getMinutes()
        let s = date.getSeconds()
        M = M <= 9 ? `0${M}` : M
        D = D <= 9 ? `0${D}` : D
        h = h <= 9 ? `0${h}` : h
        m = m <= 9 ? `0${m}` : m
        s = s <= 9 ? `0${s}` : s
        return `${Y}-${M}-${D} ${h}:${m}:${s}`
      },

      // 注册数据表按钮
      handleRegister(index, row) {
        // this.registerVisible = true
        // this.resourceId = row.resourceId
        this.$router.push({
          path: '/table/add',
          query: {
            resourceId: row.resourceId
          }
        })
      },

      // 注册数据表提交
      handleRegisterSubmit() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            // todo 提交数据
            const queryData = {
              ...this.registerForm,
              resourceId: this.resourceId
            }
            // console.log('queryDate===>', queryData)
            this.$store.dispatch('resource/registerTable', queryData).then(() => {
              this.registerVisible = false
              this.resourceId = -1
              this.registerForm = {}
            }).catch(err => {
              this.$message({
                type: 'error',
                message: err.message
              })
            })
          } else {
            return false
          }
        })
      },

      // 注册数据表取消
      handleRegisterCancel() {
        this.registerVisible = false
        this.resourceId = -1
      },

      // 获取数据源信息
      getDataSourceList() {
        // 一页数据 100000 模拟不分页
        this.$store.dispatch('resource/getDatasource', {
          currentPage: 1,
          pageSize: 100000
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .resource-content{
    margin: 24px;
    .button-content {
      text-align: right;
    }
    .search-icon {
      cursor: pointer
    }
    .pagination-container{
      text-align: right;
    }
  }
  .dialog-form{
    max-width: 400px;
  }
</style>
