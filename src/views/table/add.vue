<template>
  <el-row class="tableAdd-container">
    <el-form
      :model="form"
      :rules="formRules"
      ref="form"
      label-width="120px"
      class="form-container"
    >
      <el-form-item label="关联数据源" prop="datasourceId">
        <el-select
          v-model="form.datasourceId"
          placeholder="请选择关联数据源"
          @change="datasourceChange"
          :disabled="isEdit"
        >
          <el-option
            v-for="item in tableAdd.datasourceList"
            :key="item.datasourceId"
            :label="item.datasourceName"
            :value="item.datasourceId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据表名称" prop="tableName">
        <el-select
          v-model="form.tableName"
          placeholder="请选择数据表"
          @change="tableChange"
          :disabled="isEdit"
        >
          <el-option
            v-for="item in tableAdd.tableList"
            :key="item.tableName"
            :label="item.tableName"
            :value="item.tableName"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="数据表中文名称" prop="tableChName">
        <el-input v-model="form.tableChName" placeholder="请输入数据表中文名称"></el-input>
      </el-form-item>
      <el-form-item label="行分隔符" prop="rowSeparator">
        <el-input v-model="form.rowSeparator" placeholder="请输入行分隔符"></el-input>
      </el-form-item>
      <el-form-item label="列分隔符" prop="columnSeparator">
        <el-input v-model="form.columnSeparator" placeholder="请输入列分隔符"></el-input>
      </el-form-item>
      <el-form-item label="描述" prop="comment">
        <el-input type="textarea" v-model="form.comment" placeholder="请输入描述"></el-input>
      </el-form-item>
    </el-form>
    <el-row>
      <el-table
        v-loading="loading"
        ref="addTable"
        :data="tableAdd.columnList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          align="center"
        ></el-table-column>
        <el-table-column
        prop="fieldName"
        label="字段名"
        ></el-table-column>
        <el-table-column
        prop="fieldCNName"
        label="字段中文名"
        ></el-table-column>
        <el-table-column
        prop="comment"
        label="字段描述"
        ></el-table-column>
        <el-table-column
        prop="fieldType"
        label="字段类型"
        ></el-table-column>
      </el-table>
    </el-row>
    <el-row class="button-container">
      <el-button
        type="primary"
        @click="handleSubmit"
        :loading="btnLoading"
      >保存</el-button>
    </el-row>
  </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    name: 'tableAdd',

    data() {
      return {
        form: {},
        formRules: {
          datasourceId: [{
            required: true, message: '关联数据源必选', trigger: 'change'
          }],
          tableName: [{
            required: true, message: '数据表名称必选', trigger: 'change'
          }],
          tableChName: [{
            required: true, message: '数据表中文名称必选', trigger: 'change'
          }],
          rowSeparator: [{
            required: true, message: '行分隔符必填', trigger: 'change'
          }],
          columnSeparator: [{
            required: true, message: '列分隔符必填', trigger: 'change'
          }],
          comment: [{
            required: true, message: '描述必填', trigger: 'change'
          }]
        },
        loading: false,
        selectionList: [],
        isEdit: false,
        resourceId: '',
        datasourceId: '',
        tableId: '',
        btnLoading: false
      }
    },

    computed: {
      ...mapGetters([
        'tableAdd'
      ])
    },

    beforeDestroy() {
      this.$store.commit('TABLEADD_SET_TABLE_LIST', { list: [] })
      this.$store.commit('TABLEADD_SET_COLUMNS_LIST', { list: [] })
      this.$store.commit('TABLEADD_SET_LIST', { list: [] })
    },

    created() {
      // console.log('this.$route===>', this.$route)
      const { path, query } = this.$route
      const { resourceId, datasourceId = '', tableId = '' } = query
      this.resourceId = resourceId
      this.isEdit = (path === '/table/edit')
      if (this.isEdit) {
        this.form = {
          datasourceId: datasourceId ? Number(datasourceId) : ''
        }
        this.tableId = tableId ? Number(tableId) : ''
      }
    },

    mounted() {
      this.getdatasourceList()
      this.isEdit && this.getTableDetail()
    },

    methods: {
      getTableDetail() {
        const params = {
          tableId: this.tableId
        }
        this.$store.dispatch('tableAdd/getTableDetail', params).then(res => {
          const data = res.data
          const { list } = data
          const needData = ['tableName', 'tableChName', 'rowSeparator',
            'columnSeparator', 'comment']
          if (list) {
            needData.forEach(v => {
              this.form[v] = list[v]
            })
            this.$store.dispatch('tableAdd/getDSTableList', { datasourceId: list.datasourceId })
            this.loading = true
            const columnsParams = {
              datasourceId: this.form.datasourceId,
              tableName: this.form.tableName
            }
            this.$store.dispatch('tableAdd/getAllColumns', columnsParams).then(() => {
              this.loading = false
              if (list.fieldInfos && list.fieldInfos.length > 0) {
                this.selectionList = list.fieldInfos
                // console.log('this.$refs===>', this.$refs)
                const selectedName = []
                list.fieldInfos.forEach(v => {
                  const target = this.tableAdd.columnList.find(val => val.fieldName === v.fieldName)
                  if (target) {
                    selectedName.push(target)
                  }
                })
                // console.log('selectedName===>', selectedName)
                // console.log('this.selectionList===>', this.selectionList)
                this.$nextTick(() => {
                  selectedName.forEach(v => {
                    this.$refs.addTable.toggleRowSelection(v)
                  })
                })
              }
            }).catch(() => {
              this.loading = false
            })
            this.$nextTick(() => {
              this.$refs.form && this.$refs.form.clearValidate()
            })
          }
        }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      },

      getdatasourceList() {
        const params = {
          currentPage: 1,
          pageSize: 100000
        }
        this.$store.dispatch('tableAdd/getTableDS', params).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      },

      handleSelectionChange(val) {
        // todo 获取其中的哪个字段
        this.selectionList = val
      },

      // 选中数据源
      datasourceChange(val) {
        // 初始化数据表 和 字段信息
        this.form = {
          ...this.form,
          tableName: ''
        }
        this.selectionList = []
        this.$store.commit('TABLEADD_SET_TABLE_LIST', { list: [] })
        this.$store.commit('TABLEADD_SET_COLUMNS_LIST', { list: [] })
        this.$store.dispatch('tableAdd/getDSTableList', { datasourceId: val }).catch(err => {
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      },

      // 选中数据表名称
      tableChange(val) {
        // 初始化字段信息
        this.selectionList = []
        this.$store.commit('TABLEADD_SET_COLUMNS_LIST', { list: [] })
        const params = {
          datasourceId: this.form.datasourceId,
          tableName: val
        }
        // 如果有数据表中文名称 就自动填充
        if (val.tableChName) {
          this.form = {
            ...this.form,
            tableChName: val.tableChName
          }
        }
        this.loading = true
        this.$store.dispatch('tableAdd/getAllColumns', params).then(() => {
          this.loading = false
        }).catch(err => {
          this.loading = false
          this.$message({
            type: 'error',
            message: err.message
          })
        })
      },

      // 提交数据
      handleSubmit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            if (this.selectionList.length === 0) {
              this.$message({
                type: 'error',
                message: '字段信息必选'
              })
            } else {
              // todo 处理数据
              this.btnLoading = true
              const columnList = this.selectionList.map(v => {
                const data = {
                  fieldName: v.fieldName,
                  fieldCNName: v.fieldCNName,
                  comment: v.comment,
                  fieldType: v.fieldType,
                  filedId: v.fieldId
                }
                this.isEdit || (Reflect.deleteProperty(data, 'filedId'))
                this.isEdit && (data.tableId = this.tableId)
                return data
              })
              const table = {
                resourceId: this.resourceId,
                ...this.form
              }
              this.isEdit && (table.tableId = this.tableId)
              const actionType = this.isEdit ? 'editTable' : 'registerTable'
              this.$store.dispatch(`tableAdd/` + actionType, { columnList, table }).then(() => {
                const msg = this.isEdit ? '编辑' : '注册'
                this.$message({
                  type: 'success',
                  message: `${msg}数据表成功`
                })
                this.btnLoading = false
                this.$router.push({
                  path: '/table/index'
                })
              }).catch(err => {
                this.btnLoading = false
                if (err !== 'error') {
                  this.$message({
                    type: 'error',
                    message: err.message
                  })
                }
              })
            }
          }
        })
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .tableAdd-container{
    margin: 24px;
    .form-container{
      width: 400px;
    }
    .button-container{
      margin: 24px;
    }
  }
</style>
