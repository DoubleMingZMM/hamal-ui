<template>
  <el-row class="fontSize14">
    <el-row>
      <el-col :span="3" style="position:relative">
        <dataSourceMenu @selectNode="selectNode"></dataSourceMenu>
      </el-col>
      <el-col :span="21">
        <div>
          <div class="menuHeader">

          </div>

          <div>
            <!--<router-view></router-view>-->
            <div v-if="selectIndex === '1'">
              <dataSource></dataSource>
            </div>
            <div v-if="selectIndex === '2'">
              <dataSourceTableList></dataSourceTableList>
            </div>
            <div v-if="selectIndex === '3'">
              <dataSourceTable></dataSourceTable>
            </div>
            <div v-if="selectIndex === '4'">
              <dictionaryTable></dictionaryTable>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

 <!--   <el-row class="filter-container" type="flex" justify="space-between">
      <el-col :span="4" class="filter-content">
        <el-input ref="searchInput" placeholder="关键字搜索" @keyup.enter.native="handleSearch">
          <i slot="suffix"
             class="el-input__icon el-icon-search search-icon"
             @click="handleSearch"
          ></i>
        </el-input>
      </el-col>
      <el-col :span="8" class="button-content">
        <el-button type="primary" @click="add">新增</el-button>
        &lt;!&ndash;<el-button type="danger" @click="handleBatchDelete">批量删除</el-button>&ndash;&gt;
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="sourceTable"
        :data="datasource.list"
        style="width: 100%"
        border
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
      >
        <el-table-column
          prop="datasourceName"
          label="数据源名称"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="interfaceVisitMode"
          label="接口访问方式"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          prop="datasourceIp"
          label="IP"
          min-width="200"
        >
        </el-table-column>
        <el-table-column
          prop="datasourcePort"
          label="端口"
          min-width="120"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="200"
          align="center"
        >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">
              编辑
            </el-button>
            <el-button size="mini" type="primary" @click="seeMeta(scope.$index, scope.row)">
              元信息
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">
              删除
            </el-button>
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
        :total="datasource.totalRow"
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
        <el-form-item label="数据源名称" prop="datasourceName">
          <el-input v-model="dialogForm.datasourceName" placeholder="请输入数据源名称"></el-input>
        </el-form-item>
        <el-form-item label="数据源类型" prop="datasourceType">
          <el-select v-model="dialogForm.datasourceType"
                     placeholder="请选择数据源类型">
            <el-option
              v-for="v in datasourceType"
              :key="v"
              :label="v"
              :value="v"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="接口访问方式" prop="interfaceVisitMode">
          <el-select v-model="dialogForm.interfaceVisitMode"
                     placeholder="请选择接口访问方式">
            <el-option
              v-for="v in interfaceVisitMode"
              :label="v"
              :key="v"
              :value="v"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="IP" prop="datasourceIp">
          <el-input v-model="dialogForm.datasourceIp" placeholder="请输入 IP"></el-input>
        </el-form-item>
        <el-form-item label="端口" prop="datasourcePort">
          <el-input v-model="dialogForm.datasourcePort" placeholder="请输入端口"></el-input>
        </el-form-item>
        <el-form-item label="数据源描述" prop="description">
          <el-input type="textarea" :row="2" v-model="dialogForm.description" placeholder="请输入描述"></el-input>
        </el-form-item>
        <el-form-item label="数据库用户名" prop="datasourceUser">
          <el-input v-model="dialogForm.datasourceUser" placeholder="请输入数据库用户名"></el-input>
        </el-form-item>
        <el-form-item label="数据库密码" prop="datasourcePw">
          <el-input type="password" v-model="dialogForm.datasourcePw" placeholder="请输入数据库密码"></el-input>
        </el-form-item>
        <el-form-item label="数据库名" prop="datasourceDB">
          <el-input v-model="dialogForm.datasourceDB" placeholder="请输入数据库密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          @click="handleConnection"
          type="primary">
          测试连接
        </el-button>
        <el-button
          @click="handleSubmit"
          type="primary">
          确定
        </el-button>
        <el-button @click="handleCancel">
          取消
        </el-button>
      </div>
    </el-dialog>-->
  </el-row>
</template>
<style lang="scss">
  @import './dataSourceStyle';
</style>

<script>
  import { mapGetters } from 'vuex'
  import dataSourceMenu from './components/dataSourceMenu'
  import dataSource from './components/dataSource'
  import dataSourceTable from './components/dataSourceTable'
  import dataSourceTableList from './components/dataSourceTableList'
  import dictionaryTable from './components/dictionaryTable'
  export default {
    name: 'datasource',
    components: {
      dataSourceMenu,
      dataSource,
      dataSourceTableList,
      dataSourceTable,
      dictionaryTable
    },
    data() {
      return {
        selectIndex: '1',
        filter: {
          currentPage: 1,
          datasourceName: ''
        },
        pageSize: 10,
        listLoading: false,
        dialogType: 1, // 1 表示新增  2表示编辑
        dialogVisible: false,
        dialogForm: {}, // 弹窗的值
        rules: {
          datasourceName: [{
            required: true, message: '请输入数据源名称', trigger: 'change'
          }],
          interfaceVisitMode: [{
            required: true, message: '请选择接口访问方式', trigger: 'change'
          }],
          datasourceIp: [{
            required: true, message: '请输入 IP', trigger: 'change'
          }, {
            validator: this.validateIp, trigger: 'change'
          }],
          datasourcePort: [{
            required: true, message: '请输入端口号', trigger: 'change'
          }, {
            validator: this.validatePort, trigger: 'change'
          }],
          datasourceUser: [{
            required: true, message: '请输入用户名', trigger: 'change'
          }],
          datasourcePw: [{
            required: true, message: '请输入密码', trigger: 'change'
          }],
          datasourceType: [{
            required: true, message: '数据源类型必选', trigger: 'change'
          }],
          datasourceDB: [{
            required: true, message: '数据源类型必选', trigger: 'change'
          }],
          description: [{
            required: true, message: '数据源描述必填', trigger: 'change'
          }]
        },
        selectionList: [], // 存在选中项的 id
        datasourceType: ['Oracle', 'Mysql', 'MongoDB', 'File'],
        interfaceVisitMode: ['JDBC', 'FTP']
      }
    },
    computed: {
      ...mapGetters([
        'datasource'
      ])
    },
    created() {
      this.getList()
    },

    mounted() {
    },

    methods: {
      selectNode(item) {
        console.log('父组件', item)
        this.selectIndex = item.type
      },
      // 获取列表
      getList() {
        this.listLoading = true
        this.$store.dispatch('datasource/getDatasourceList', this.filter).then(() => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

      // 选中某项的操作
      handleSelectionChange(rows) {
        this.selectionList = rows.map(v => v.datasourceId)
      },
      // 查看元信息
      seeMeta(index, row) {
        console.log(row)
        this.$router.push({path: '/meta', query: {datasourceId: row.datasourceId}})
      },
      // 编辑某项打开弹窗
      handleEdit(index, row) {
        // todo 给 dialogForm 赋值
        // 可能需要请求详情接口
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
        this.dialogType = 2
        const queryParams = {
          datasourceId: row.datasourceId
        }
        this.$store.dispatch('datasource/getDatasourceDetail', queryParams).then(res => {
          this.dialogForm = res.data
          this.dialogVisible = true
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
        // this.dialogForm = { ...row }
        // this.dialogVisible = true
      },

      // 删除某条数据
      handleDelete(index, row) {
        this.deleteDatasource({
          datasourceId: row.datasourceId
        })
      },

      // 批量删除
      handleBatchDelete() {
        if (this.selectionList.length) {
          // 没批量删除了 不过留着也没啥事 反正进不来 这个 selectionList 传参有问题
          this.deleteDatasource(this.selectionList)
        } else {
          this.$message({
            type: 'warning',
            message: '请选择要删除的数据源'
          })
        }
      },

      // 删除
      deleteDatasource(data) {
        this.$confirm('是否确定删除所选数据源？', '确认删除', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('datasource/deleteDatasource', data).then(() => {
            // 从 selectionList 中删除刚才提交的要删除的选中项
            // 因为可能是删除的某一项 所以不能直接初始化 selectionList
            this.selectionList = this.selectionList.filter(v => !data.include(v))
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

      // 页面变化
      handleCurrentChange(val) {
        this.filter = {
          ...this.filter,
          currentPage: val
        }
        this.getList()
      },

      // 关键字搜索
      handleSearch() {
        const val = this.$refs.searchInput.$refs.input.value
        if (this.filter.currentPage === 1) {
          this.filter = {
            currentPage: 1,
            datasourceName: val
          }
          // 重新获取列表
          this.getList()
        } else {
          this.filter = {
            currentPage: 1,
            datasourceName: val
          }
        }
      },

      // 新增打开弹窗
      add() {
        this.dialogType = 1
        // todo 给弹出层赋值
        this.dialogForm = {}
        this.$refs.dialogForm && this.$refs.dialogForm.resetFields()
        this.dialogVisible = true
      },

      // 弹出层取消
      handleCancel() {
        this.dialogVisible = false
        // todo 是否需要把 dialogForm 初始化
      },

      // 弹出层确定
      handleSubmit() {
        // todo form 表单的验证 数据的提交
        this.$refs.dialogForm.validate((valid) => {
          if (valid) {
            const actionType = this.dialogType === 1 ? 'addDatasource' : 'editDatasource'
            this.$store.dispatch(`datasource/` + actionType, this.dialogForm).then(() => {
              // 新增或编辑成功后，重新获取列表
              this.dialogVisible = false
              const message = this.dialogType === 1 ? '新增成功' : '编辑成功'
              this.$message({
                type: 'success',
                message: message
              })
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

      // 验证 ip
      validateIp(rule, value, callback) {
        const ipReg = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/
        if (!value) {
          callback(new Error('IP 不能为空'))
        } else {
          if (ipReg.test(value)) {
            callback()
          } else {
            callback(new Error('IP 格式错误'))
          }
        }
      },

      // 验证端口
      validatePort(rule, value, callback) {
        const portReg = /^([0-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-5]{2}[0-3][0-5])$/
        if (!value && (value !== 0)) {
          callback(new Error('端口不能为空'))
        } else {
          if (portReg.test(value)) {
            callback()
          } else {
            callback(new Error('端口格式错误'))
          }
        }
      },

      // 测试连接
      handleConnection() {
        // todo  需要验证数据吗
        this.$store.dispatch('datasource/testConnection', this.dialogForm).then(() => {
          this.$message({
            type: 'success',
            message: '连接成功'
          })
        }).catch(err => {
          // console.log('err===>', err)
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
  .dataSource-content {
    margin: 24px;
    .button-content {
      text-align: right;
    }
    .search-icon {
      cursor: pointer
    }
    .pagination-container {
      text-align: right;
    }
  }
  .dialog-form{
    max-width: 400px;
  }
</style>
