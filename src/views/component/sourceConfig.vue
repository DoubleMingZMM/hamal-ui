<template>
  <div class="sourceConfig">
    <div style="margin-bottom: 24px;">
      <el-select v-model="component.sourceForm.sourceType" placeholder="请选择数据库类型">
        <el-option v-for="item in component.allTypes" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="component.sourceForm.sourceData" placeholder="请选择数据源">
        <el-option v-for="item in component.allDatas" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="component.sourceForm.sourceTable" placeholder="请选择数据表">
        <el-option v-for="item in component.allTables" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
    </div>
<!--    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <span>源表信息</span>
        &lt;!&ndash;<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;
      </div>-->

      <el-form label-width="150px">

        <el-form-item label="JDBC连接信息">
          <div>{{component.sourceForm.jdbcUrl}}</div>
        </el-form-item>
        <el-form-item label="用户名">
          <div>{{component.sourceForm.username}}</div>
        </el-form-item>
        <el-form-item label="密码">
          <div>{{component.sourceForm.password}}</div>
        </el-form-item>
        <el-form-item label="表名">
          <div>{{component.sourceForm.table}}</div>
        </el-form-item>
        <el-form-item label="抽取方式" prop="extractWay">
          <el-radio-group v-model="component.sourceForm.extractWay" size="medium">
            <el-radio border label="0">全量</el-radio>
            <el-radio border label="1">增量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="切割数量" prop="cuttingSum">
          <el-input-number v-model="component.sourceForm.cuttingSum" controls-position="right" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="切割字段" prop="cuttingColumn">
          <el-input v-model="component.sourceForm.cuttingColumn" style="width:400px;" placeholder="请填写切割字段"></el-input>
        </el-form-item>
        <div v-if="component.sourceForm.extractWay === '1'">
          <el-form-item label="增量字段" prop="incrementColumn">
            <el-select multiple v-model="component.sourceForm.increaseField" placeholder="请选择增量字段">
              <el-option v-for="item in component.sourceForm.incrementColumn" :key="item"
                         :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="增量时间" prop="incrementTime">
            <el-date-picker v-model="component.sourceForm.incrementTime" type="datetime" style="width:400px;" placeholder="选择增量时间" default-time="12:00:00">
            </el-date-picker>
          </el-form-item>
        </div>
        <el-form-item label="where条件" prop="whereInfo">
          <el-input v-model="component.sourceForm.whereInfo" style="width:400px;" placeholder="请选择筛选条件"></el-input>
        </el-form-item>
        <el-form-item label="抽取SQL" prop="extractSql">
          <el-input type="textarea" v-model="component.sourceForm.extractSql" :rows="3" style="width: 600px;"></el-input>
        </el-form-item>
      </el-form>
    <!--</el-card>-->
    <div style="text-align: right;margin-top: 12px;clear: both;">
      <el-button @click="next" type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    props: {
    },
    data() {
      return {
      }
    },
    computed: {
      ...mapState([
        'component'
      ])
    },
    created() {
    },
    methods: {
      ...mapMutations([
        'SET_CURRENTSTEP'
      ]),
      next() {
        // 校验是否符合规范
        if (!this.validateProps()) {
          return false
        }
        let currentStep = this.component.currentStep
        if (currentStep++ >= 5) {
          currentStep = 5
        }
        this.$store.commit('component/SET_CURRENTSTEP', {
          currentStep: currentStep
        })
      },
      validateProps() {
        let bool = true
        const messageData = { type: 'error' }
        if (!this.component.sourceForm.sourceType) {
          this.$message({
            message: '请选择数据库类型',
            ...messageData
          })
          bool = false
        } else if (!this.component.sourceForm.sourceData) {
          this.$message({
            message: '请选择数据源',
            ...messageData
          })
          bool = false
        } else if (!this.component.sourceForm.sourceTable) {
          this.$message({
            message: '请选择数据表',
            ...messageData
          })
          bool = false
        }
        return bool
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-input__inner{
    border: 1px solid #bbc3d0;
  }
  .sourceConfig{

  }
</style>
