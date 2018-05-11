<template>
  <div>
    <div style="margin-bottom: 24px;">
      <el-select v-model="component.targetForm.targetType" placeholder="请选择数据库类型">
        <el-option v-for="item in component.allTypes" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="component.targetForm.targetData" placeholder="请选择数据源">
        <el-option v-for="item in component.allDatas" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
      <el-select v-model="component.targetForm.targetTable" placeholder="请选择数据表">
        <el-option v-for="item in component.allTables" :key="item"
                   :label="item" :value="item"></el-option>
      </el-select>
      <el-button icon="el-icon-plus" type="success" style="float: right;" @click="createTable">创建表</el-button>
    </div>
<!--    <el-card class="box-card" style="width: 100%;">
      <div slot="header" class="clearfix">
        <span>目标表信息</span>
        &lt;!&ndash;<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>&ndash;&gt;
      </div>-->

      <el-form label-width="150px">
        <el-form-item label="JDBC连接信息">
          <div>{{component.targetForm.jdbcUrl}}</div>
        </el-form-item>
        <el-form-item label="用户名">
          <div>{{component.targetForm.username}}</div>
        </el-form-item>
        <el-form-item label="密码">
          <div>{{component.targetForm.password}}</div>
        </el-form-item>
        <el-form-item label="表名">
          <div>{{component.targetForm.table}}</div>
        </el-form-item>
        <el-form-item label="批量入库提交数量" prop="batchCount">
          <el-input-number v-model="component.targetForm.batchCount" controls-position="right" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="入库前SQL" prop="preSql">
          <el-input type="textarea" v-model="component.targetForm.preSql" :rows="3" style="width: 600px;" placeholder="请填写入库前SQL"></el-input>
        </el-form-item>
        <el-form-item label="入库后SQL" prop="postSql">
          <el-input type="textarea" v-model="component.targetForm.postSql" :rows="3" style="width: 600px;" placeholder="请填写入库后SQL"></el-input>
        </el-form-item>
      </el-form>
    <!--</el-card>-->
    <div style="text-align: right;margin-top: 12px;">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="next" type="primary">下一步</el-button>
    </div>

    <!--新增表modal-->
    <el-dialog title="新增表" :visible.sync="addTableVisible">
      <el-form :model="tableForm" :rules="tableRules" ref="tableForm" label-width="100px">
        <el-form-item label="英文名称" prop="name_en">
          <el-input v-model="tableForm.name_en" style="max-width:400px;" placeholder="请输入英文名称"></el-input>
        </el-form-item>
        <el-form-item label="中文名称" prop="name_ch">
          <el-input v-model="tableForm.name_ch" style="max-width:400px;" placeholder="请输入中文名称"></el-input>
        </el-form-item>
        <el-form-item label="自定义名称" prop="name_custom">
          <el-input v-model="tableForm.name_custom" style="max-width:400px;" placeholder="请输入自定义名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTableVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'targetConfig',
    components: {
    },
    props: {
    },
    data() {
      return {
        addTableVisible: false,
        tableForm: {
          name_en: '',
          name_ch: '',
          name_custom: ''
        },
        tableRules: {
          name_en: [
            { required: true, message: '请输入英文名称', trigger: 'blur' },
            { min: 4, max: 64, message: '英文名称长度在 4 到 64 个字符', trigger: 'blur' },
            { pattern: /^[A-Za-z]+$/, message: '英文名称只能为字母' }
          ],
          name_ch: [
            { required: true, message: '请输入中文名称', trigger: 'blur' },
            { min: 4, max: 64, message: '中文名称长度在 4 到 64 个字符', trigger: 'blur' },
            { pattern: /^[\u4E00-\u9FA5]+$/, message: '中文名称只能为中文' }
          ],
          name_custom: [
            { required: false, message: '请输入自定义名称', trigger: 'blur' },
            { min: 4, max: 64, message: '自定义名称长度在 4 到 64 个字符', trigger: 'blur' }
          ]
        }
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
      pre() {
        let currentStep = this.component.currentStep
        if (currentStep-- <= 0) {
          currentStep = 0
        }
        this.$store.commit('component/SET_CURRENTSTEP', {
          currentStep: currentStep
        })
      },
      validateProps() {
        let bool = true
        const messageData = { type: 'error' }
        if (!this.component.targetForm.targetType) {
          this.$message({
            message: '请选择数据库类型',
            ...messageData
          })
          bool = false
        } else if (!this.component.targetForm.targetData) {
          this.$message({
            message: '请选择数据源',
            ...messageData
          })
          bool = false
        } else if (!this.component.targetForm.targetTable) {
          this.$message({
            message: '请选择数据表',
            ...messageData
          })
          bool = false
        }
        return bool
      },
      createTable() {
        this.addTableVisible = true
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
