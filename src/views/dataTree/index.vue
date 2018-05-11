<template>
    <div>
      <div class="contentM24">
        <el-row>
          <el-col :span="3">
            <div class="wl paddingLR15">
              <template v-for="item in tableList">
                <el-collapse v-model="activeNames" @change="handleChange">
                  <el-collapse-item :title="item.tableName" name="1">
                    <ul>
                      <li v-for="itemf in item.fields">
                        {{itemf.fieldName}}
                      </li>
                    </ul>
                  </el-collapse-item>
                </el-collapse>
              </template>
            </div>
          </el-col>
          <el-col :span="21">
            <div class="paddingLR15">
              <div>
                {{checkList}}
                <el-checkbox-group v-model="checkList">
                  <label>
                    <el-checkbox label="1">复选框 A</el-checkbox>
                  </label>
                  <label>
                    <el-checkbox label="2">复选框 B</el-checkbox>
                  </label>
                  <label>
                    <el-checkbox label="3">复选框 C</el-checkbox>
                  </label>
                  <label>
                    <el-checkbox label="4">禁用</el-checkbox>
                  </label>
                  <label>
                    <el-checkbox label="5">选中且禁用</el-checkbox>
                  </label>
                </el-checkbox-group>
              </div>
            </div>

          </el-col>
        </el-row>
      </div>
    </div>
</template>

<style lang="scss">
  @import './index';
</style>

<script>
export default {
  name: 'dataTree',
  data() {
    return {
      title: '',
      tableList: [
        {tableName: '表1', fields: [
          {fieldName: '字段1'}
        ]}
      ],
      checkList: [ {value: '1', label: '复选框 A'}]
    }
  },
  getList() {
    console.log('数据展示')
  },
  mounted() {
    this.getList()
  }
}
</script>
