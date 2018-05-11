<template>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="表基本信息" name="1">
          <el-form :label-position="'right'" label-width="80px" :model="formLabelAlign">
            <el-row>
              <el-col :span="12">
                <el-form-item label="类型:">
                  <el-select v-model="formLabelAlign.type" size="mini">
                    <el-option v-for="item in tableList" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="数据库表:">
                  <span>{{formLabelAlign.databaseTable}}</span>
                </el-form-item>
                <el-form-item label="代号:">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="简称:">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
                <el-form-item label="关键字:">
                  <el-input v-model="formLabelAlign.type"></el-input>
                </el-form-item>
              </el-col>
            </el-row>

          </el-form>
        </el-tab-pane>
        <el-tab-pane label="表结构" name="2">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="序号" :width="'50px'">
            </el-table-column>
            <el-table-column
              prop="name"
              label="列名"
              width="180">
              <template slot-scope="scope">
                <span>{{scope.row.columnName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="代号">
              <template slot-scope="scope">
                <el-input size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="简称">
              <template slot-scope="scope">
                <el-input size="mini"></el-input>
              </template>
            </el-table-column>
            <el-table-column
              prop="address"
              label="类型">
            </el-table-column>
            <el-table-column
              prop="address"
              label="长度">
            </el-table-column>
            <el-table-column
              prop="address"
              label="小数位数">
            </el-table-column>
            <el-table-column
              prop="address"
              label="允许为空">
            </el-table-column>
            <el-table-column
              prop="address"
              label="是否唯一">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
export default {
  name: 'dataSourceTable',
  data() {
    return {
      activeName: '1',
      tableList: [
        {value: '1', label: '蛋糕'}
      ],
      tableData: [
        {columnName: '11111'}
      ],
      formLabelAlign: {
        databaseTable: '',
        name: '',
        region: '',
        type: ''
      }
    }
  },
  methods: {
    handleClick() {}
  }
}
</script>
