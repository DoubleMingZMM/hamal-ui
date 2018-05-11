<template>
  <el-row class="table-content">
    <el-row class="filter-container" type="flex" justify="space-between">
      <el-col :span="4" class="filter-content">
        <el-input ref="searchInput" placeholder="关键字搜索" @keyup.enter.native="handleSearch">
          <i slot="suffix"
             class="el-input__icon el-icon-search search-icon"
             @click="handleSearch"
          ></i>
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        ref="resourceTable"
        :data="table.list"
        style="width: 100%"
        border
        v-loading="listLoading"
      >
        <el-table-column
          prop="tableName"
          min-width="200"
          label="数据表名称"
        >
        </el-table-column>
        <el-table-column
          prop="tableChName"
          min-width="200"
          label="数据表中文名称"
        >
        </el-table-column>
        <el-table-column
          prop="resourceInfo"
          min-width="200"
          label="资源名称"
          :formatter="formateResource"
        >
        </el-table-column>
        <el-table-column
          prop="dataSourceInfo"
          min-width="200"
          label="数据源名称"
          :formatter="formateDatasource"
        >
        </el-table-column>
        <el-table-column
          prop="rowSeparator"
          min-width="100"
          label="行分隔符"
        >
        </el-table-column>
        <el-table-column
          prop="columnSeparator"
          min-width="100"
          label="列分隔符"
        >
        </el-table-column>
        <el-table-column
          prop="comment"
          min-width="200"
          label="描述"
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
        :total="table.totalRow"
        :page-size="pageSize"
      ></el-pagination>
    </el-row>
  </el-row>
</template>
<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'tableList',

    data() {
      return {
        filter: {
          tableName: '',
          currentPage: 1
        },
        listLoading: false,
        pageSize: 10
      }
    },

    computed: {
      ...mapGetters([
        'table'
      ])
    },

    created() {
      this.getList()
    },

    methods: {
      // 获取列表
      getList() {
        this.listLoading = true
        this.$store.dispatch('table/getTableList', this.filter).then(() => {
          this.listLoading = false
        }).catch(() => {
          this.listLoading = false
        })
      },

      handleSearch() {
        const val = this.$refs.searchInput.$refs.input.value
        if (this.filter.currentPage === 1) {
          this.filter = {
            currentPage: 1,
            tableName: val
          }
          // 重新获取列表
          this.getList()
        } else {
          this.filter = {
            currentPage: 1,
            tableName: val
          }
        }
      },

      // table 页码变化
      handleCurrentChange(val) {
        // console.log('val===>', val)
        this.filter = {
          ...this.filter,
          currentPage: val
        }
        this.getList()
      },

      // 编辑
      handleEdit(index, row) {
        this.$router.push({
          path: '/table/edit',
          query: {
            tableId: row.tableId,
            datasourceId: row.datasourceId,
            resourceId: row.resourceId
          }
        })
      },

      // 删除
      handleDelete(index, row) {
        this.$confirm('是否确定删除所选数据表？', {
          type: 'warning'
        }).then(() => {
          this.$store.dispatch('table/deleteTable', { tableId: row.tableId }).then(() => {
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

      formateDatasource(row, column, cellValue) {
        console.log('cellValue===>', cellValue)
        if (typeof cellValue === 'object') {
          return cellValue.datasourceName
        }
      },

      formateResource(row, column, cellValue) {
        if (typeof cellValue === 'object') {
          return cellValue.resourceName
        }
      }
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .table-content{
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
</style>
