<template>
  <div class="app-container calendar-list-container">

  <div class="filter-container">
    <el-button class="filter-item" type="success" @click="handleAddNode" v-waves style="float: right;" icon="el-icon-plus">新增节点</el-button>
  </div>

    <el-table :key='tableKey' :data="node.list" v-loading="listLoading" element-loading-text="给我一点时间"
              border fit highlight-current-row style="width: 100%">
      <el-table-column min-width="150px" align="center" label="标题">
        <template slot-scope="scope">
          <span>{{scope.row.title}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="150px" align="center" label="AppName">
        <template slot-scope="scope">
          <span>{{scope.row.appName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" min-width="100px" label="注册方式">
        <template slot-scope="scope">
          <span>{{scope.row.addressType === 1 ? '手动录入' : (scope.row.addressType === 0 ? '自动录入' : '')}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="排序">
        <template slot-scope="scope">
          <span>{{scope.row.order}}</span>
        </template>
      </el-table-column>
      <el-table-column min-width="110px" align="center" label="地址列表">
        <template slot-scope="scope">
          <span>{{scope.row.addressList }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button  type="primary" size="mini" @click="editNode(scope.row.id)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteNode(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-container">
      <el-pagination background layout="total, prev, pager, next, jumper" :total="node.total">
      </el-pagination>
    </div>

    <!--新增节点modal-->
    <el-dialog title="新增节点" :visible.sync="dialog.addNodeVisible">
      <el-form :model="addNodeForm" :rules="addNodeRules" ref="addNodeForm" label-width="100px">
        <el-form-item label="AppName" prop="appName">
          <el-input v-model="addNodeForm.appName" style="max-width:400px;" placeholder="请输入 AppName"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="addNodeForm.title" style="max-width:400px;" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="addNodeForm.order" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="注册方式" prop="addressType">
          <el-radio-group v-model="addNodeForm.addressType" size="medium" @change="changeAddressType">
            <el-radio border label="0">自动</el-radio>
            <el-radio border label="1">手动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址列表" prop="addressList" v-if="addNodeForm.addressType === '1'">
          <el-input type="textarea" v-model="addNodeForm.addressList" :rows="5"
                    style="max-width: 600px;" placeholder="请输入地址列表"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.addNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAddNodeForm('addNodeForm')">确 定</el-button>
      </div>
    </el-dialog>

    <!--修改节点modal-->
    <el-dialog title="新增节点" :visible.sync="dialog.editNodeVisible">
      <el-form :model="node.editNodeForm" :rules="editNodeRules" ref="editNodeForm" label-width="100px">
        <el-form-item label="AppName" prop="appName">
          <el-input v-model="node.editNodeForm.appName" style="max-width:400px;" placeholder="请输入 AppName"></el-input>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input v-model="node.editNodeForm.title" style="max-width:400px;" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="order">
          <el-input-number v-model="node.editNodeForm.order" controls-position="right"></el-input-number>
        </el-form-item>
        <el-form-item label="注册方式" prop="addressType">
          <el-radio-group v-model="node.editNodeForm.addressType" size="medium">
            <el-radio border label="0">自动</el-radio>
            <el-radio border label="1">手动</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址列表" prop="addressList" v-if="node.editNodeForm.addressType === '1'">
          <el-input type="textarea" v-model="node.editNodeForm.addressList" :rows="5"
                    style="max-width: 600px;" placeholder="请输入地址列表"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.editNodeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitEditNodeForm('editNodeForm')">确 定</el-button>
      </div>
    </el-dialog>
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
        tableKey: 0,
        listLoading: false,
        queryParams: {
          start: 0,
          length: 10
        },
        addNodeForm: {
          appName: '',
          title: '',
          order: 0,
          addressType: '0',
          addressList: ''
        },
        addNodeRules: {
          appName: [
            { required: true, message: '请输入 AppName', trigger: 'blur' },
            { min: 4, max: 64, message: 'AppName 长度在 4 到 64 个字符', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          order: [
            { required: true, message: '请输入排序方式', trigger: 'change' }
          ],
          addressType: [
            { required: true, message: '请选择注册类型', trigger: 'change' }
          ],
          addressList: [
            { required: true, message: '请输入地址列表', trigger: 'blur' }
          ]
        },
        editNodeRules: {
          appName: [
            { required: true, message: '请输入 AppName', trigger: 'blur' },
            { min: 4, max: 64, message: 'AppName 长度在 4 到 64 个字符', trigger: 'blur' }
          ],
          title: [
            { required: true, message: '请输入标题', trigger: 'blur' }
          ],
          order: [
            { required: true, message: '请输入排序方式', trigger: 'change' }
          ],
          addressType: [
            { required: true, message: '请选择注册类型', trigger: 'change' }
          ],
          addressList: [
            { required: true, message: '请输入地址列表', trigger: 'blur' }
          ]
        },
        dialog: {
          addNodeVisible: false,
          editNodeVisible: false
        }
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
        'node'
      ])
    },
    created() {
      // 刚一进页面就查询执行器列表
      this.getNodeList()
    },
    methods: {
      getNodeList() {
        this.$store.dispatch('node/GetNodeList').then(() => {
        }).catch(() => {
        })
      },
      handleAddNode() {
        this.dialog.addNodeVisible = true
      },
      submitAddNodeForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$store.dispatch('node/AddNode', this.addNodeForm).then(() => {
              this.dialog.addNodeVisible = false
              this.getNodeList()
              this.$message({
                type: 'success',
                message: '节点新增成功!'
              })
            }).catch(() => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitEditNodeForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let values
            if (this.node.editNodeForm.addressType === '0') {
              values = {
                ...this.node.editNodeForm,
                addressList: ''
              }
            } else {
              values = {
                ...this.node.editNodeForm
              }
            }
            this.$store.dispatch('node/EditNode', values).then(() => {
              this.dialog.editNodeVisible = false
              this.getNodeList()
              this.$message({
                type: 'success',
                message: '节点修改成功!'
              })
            }).catch(() => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      deleteNode(id) {
        this.$confirm(`此操作将删除该节点, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('node/DeleteNode', id).then(() => {
            this.$message({
              type: 'success',
              message: '节点删除成功!'
            })
            this.getNodeList()
          }).catch(() => {
            this.$message({
              type: 'error',
              message: '节点删除失败!'
            })
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除操作'
          })
        })
      },
      editNode(id) {
        this.$store.dispatch('node/GetNodeDetail', id).then(() => {
        }).catch(() => {
        })
        this.dialog.editNodeVisible = true
      },
      changeAddressType() {
        this.addNodeForm.addressList = ''
      }
    }
  }
</script>
