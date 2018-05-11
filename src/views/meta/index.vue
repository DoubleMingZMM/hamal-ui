<template>
    <div class="contentM24">
      <el-row>
        <el-form label-width="60px">
          <el-col :span="4">
            <el-form-item label="数据表">
              <el-input v-model="keyWord" placeholder="请输入表名搜素" @change="keyWordSearch(keyWord)"></el-input>
            </el-form-item>
            <div class="tableListBox">
              <el-row>
                <el-col :span="12">
                  <div class="text-center">
                    中文
                  </div>
                </el-col>
                <el-col :span="12">
                  <div class="text-center">
                    英文
                  </div>
                </el-col>
              </el-row>
                <ul class="paddingNone">
                  <li class="tableItem"
                      v-for="(item, index) in tableList"
                      @click="selectItem(item, index)"
                      :key="index"
                      :class="{'activeItem': item.active}">
                    <el-row>
                      <el-col :span="12">
                        {{item.cName}}
                      </el-col>
                      <el-col :span="12">
                        {{item.eName}}
                      </el-col>
                    </el-row>
                  </li>
                </ul>
            </div>
          </el-col>
          <el-col :span="20">
            <div class="paddingLR15">
              <el-table>
                <el-table-column label="中文">

                </el-table-column>
                <el-table-column label="英文">

                </el-table-column>
                <el-table-column label="字段类型">

                </el-table-column>
                <el-table-column label="字段长度">

                </el-table-column>
                <el-table-column label="限制">

                </el-table-column>
              </el-table>
            </div>

          </el-col>
        </el-form>

      </el-row>
    </div>
</template>

<style lang="scss">
  @import './index';
</style>
<script>
export default {
  name: 'meta',
  data() {
    return {
      title: '',
      keyWord: '',
      tableList: [
        {cName: '小强', eName: 'xiaoqiang', active: false},
        {cName: '小强2', eName: 'xiaoqiang2', active: false}
      ]
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      console.log('获取列表')
    },
    selectItem(item, index) {
      console.log(item)
      const _this = this
      item.active = true
      _this.tableList.forEach(function(d, i) {
        if (i !== index) {
          d.active = false
        }
      })
    },
    keyWordSearch(key) {
      console.log(key)
    }
  },
  mounted() {
    console.log('DOM已完成')
  }
}
</script>
