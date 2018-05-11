<template>
  <div>
    <sticky className="sub-navbar draft">
      <el-button icon="el-icon-back" @click="goBack">返回任务列表</el-button>
    </sticky>
    <div class="app-container calendar-list-container">
      <el-form :model="jobForm" :rules="jobRules" ref="jobForm" label-width="150px">
        <el-form-item label="任务名称" prop="jobDesc">
          <el-input v-model="jobForm.jobDesc" style="width:400px;" placeholder="请填写任务名称"></el-input>
        </el-form-item>
        <el-form-item label="源表名称" prop="sourceName">
          <el-input v-model="jobForm.sourceName" style="width:400px;" placeholder="请选择源表名称" disabled></el-input>
          <el-button type="info" style="margin-left: 24px;" @click="chooseSourceName">选择</el-button>
          <el-button type="primary" style="margin-left: 24px;" @click="lookSourceSQL">查看源表 SQL</el-button>
        </el-form-item>
        <el-form-item label="目标表名称" prop="targetName">
          <el-input v-model="jobForm.targetName" style="width:400px;" placeholder="请选择目标表名称" disabled></el-input>
          <el-button type="info"  style="margin-left: 24px;" @click="chooseTargetName">选择</el-button>
        </el-form-item>
        <el-form-item label="调度时间" prop="jobCron">
          <el-input v-model="jobForm.jobCron" style="width:400px;" placeholder="请选择调度时间" disabled></el-input>
          <el-button type="info" style="margin-left: 24px;" @click="setCronExpression">选择</el-button>
        </el-form-item>
        <el-form-item label="运行节点" prop="jobGroup">
          <el-select v-model="jobForm.jobGroup" placeholder="请选择运行节点" style="width: 232px" @change="changeGroupName">
            <el-option v-for="item in job.exacutorList" :key="item.id" :label="item.appName" :value="item.id.toString()">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间">
          <el-col style="width:232px;">
            <el-form-item prop="effectTimeDate">
              <el-date-picker type="date" placeholder="选择生效日期" value-format="yyyy-MM-dd" v-model="jobForm.effectTimeDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:30px;text-align: center;">-</el-col>
          <el-col style="width:232px;">
            <el-form-item prop="effectTimeHour">
              <el-time-picker type="fixed-time" placeholder="选择生效时间" value-format="HH:mm:ss" v-model="jobForm.effectTimeHour" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="失效时间">
          <el-col style="width:232px;">
            <el-form-item prop="deactivateTimeDate">
              <el-date-picker type="date" placeholder="选择失效日期" value-format="yyyy-MM-dd" v-model="jobForm.deactivateTimeDate" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:30px;text-align: center;">-</el-col>
          <el-col style="width:232px;">
            <el-form-item prop="deactivateTimeHour">
              <el-time-picker type="fixed-time" placeholder="选择失效时间" value-format="HH:mm:ss" v-model="jobForm.deactivateTimeHour" style="width: 100%;"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="是否立即执行" prop="isRunNow" style="width:50%;">
          <el-switch v-model="jobForm.isRunNow === 1" @change="changeBoolToNum('isRunNow')"></el-switch>
        </el-form-item>
        <el-form-item label="是否清空目标表" prop="isClear" style="width:50%;">
          <el-switch v-model="jobForm.isClear === 1" @change="changeBoolToNum('isClear')"></el-switch>
        </el-form-item>
        <el-form-item label="尝试错误次数" prop="tryTimes">
          <el-input-number v-model="jobForm.tryTimes" controls-position="right" :min="0" :max="6"></el-input-number>
        </el-form-item>
        <el-form-item label="尝试时间间隔" prop="tryInterval">
          <el-input-number v-model="jobForm.tryInterval" controls-position="right" :min="1" :max="30"></el-input-number>
        </el-form-item>
        <el-form-item label="最大异常记录数" prop="maxErrors">
          <el-input-number v-model="jobForm.maxErrors" controls-position="right" :min="0" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item label="抽取类型" prop="extractType">
          <el-radio-group v-model="jobForm.extractType" size="medium">
            <el-radio border label="0">全量</el-radio>
            <el-radio border label="1">增量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="增量字段" prop="increField" v-if="jobForm.extractType === '1'">
          <el-select v-model="jobForm.increField" placeholder="请选择增量字段" style="width: 232px">
            <el-option v-for="item in job.fieldInfosList" :key="item" :label="item" :value="item + ''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="jobForm.remark" :rows="5" style="width: 600px;"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('jobForm')">立即创建</el-button>
          <el-button @click="resetForm('jobForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!--源表名称modal-->
      <el-dialog title="选择源表名称" :visible.sync="dialog.sourceVisible">
        <el-form :model="job.addJob.sourceForm" :rules="sourceRules" ref="sourceForm" label-width="100px">
          <el-form-item label="数据源名称" prop="datasourceId">
            <el-select v-model="job.addJob.sourceForm.datasourceId" placeholder="请选择数据源" @change="changeDataSource">
              <el-option v-for="item in job.addJob.dataSourceList" :key="item.datasourceId"
                         :label="item.datasourceName" :value="item.datasourceId + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据表名称" prop="tableId">
            <el-select v-model="job.addJob.sourceForm.tableId" placeholder="请选择数据表" @change="changeSourceDataTable">
              <el-option v-for="item in job.addJob.dataTableList" :key="item.tableId"
                         :label="item.tableName" :value="item.tableId + ''"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.sourceVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitSourceForm('sourceForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!--目标表名称modal-->
      <el-dialog title="选择目标表名称" :visible.sync="dialog.targetVisible">
        <el-form :model="job.addJob.targetForm" :rules="targetRules" ref="targetForm" label-width="100px">
          <el-form-item label="数据源名称" prop="datasourceId">
            <el-select v-model="job.addJob.targetForm.datasourceId" placeholder="请选择数据源" @change="changeDataSource">
              <el-option v-for="item in job.addJob.dataSourceList" :key="item.datasourceId"
                         :label="item.datasourceName" :value="item.datasourceId + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据表名称" prop="tableId">
            <el-select v-model="job.addJob.targetForm.tableId" placeholder="请选择数据表" @change="changeTargetDataTable">
              <el-option v-for="item in job.addJob.dataTableList" :key="item.tableId"
                         :label="item.tableName" :value="item.tableId + ''"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.targetVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitTargetForm('targetForm')">确 定</el-button>
        </div>
      </el-dialog>

      <!--源表SQL modal-->
      <el-dialog title="源表 SQL" :visible.sync="dialog.sqlVisible">
        <div>{{this.jobForm.sql}}</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.sqlVisible = false">取 消</el-button>
        </div>
      </el-dialog>

      <!--cron modal-->
      <el-dialog title="Cron 表达式" :visible.sync="dialog.cronVisible">
        <el-tabs type="card" v-model="cronType">
          <el-tab-pane label="按月" name="cronMonthForm">
            <el-form :model="cronMonthForm" :rules="cronMonthRules" ref="cronMonthForm" label-width="100px">
              <el-form-item label="类型" prop="cronMonthName">
                <el-radio-group v-model="cronMonthForm.cronMonthName">
                  <el-radio-button label="assign">手动设置</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择月份" prop="checkedMonths">
                <el-checkbox-group v-model="cronMonthForm.checkedMonths" :disabled="cronMonthForm.monthDisabled">
                  <el-checkbox v-for="month in cronMonthForm.months" :label="month.id" :key="month.id">{{month.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="选择日期" prop="checkedDates">
                <el-select v-model="cronMonthForm.checkedDates" multiple placeholder="请选择日期" style="width: 300px;">
                  <el-option
                    v-for="date in cronMonthForm.dates"
                    :key="date.id"
                    :label="date.name"
                    :value="date.id">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="选择时间" prop="checkedTime">
                <el-time-picker
                  value-format="HH:mm:ss"
                  v-model="cronMonthForm.checkedTime"
                  placeholder="请选择时间">
                </el-time-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="按周" name="cronWeekForm">
            <el-form :model="cronWeekForm" :rules="cronWeekRules" ref="cronWeekForm" label-width="100px">
              <el-form-item label="类型" prop="cronWeekName">
                <el-radio-group v-model="cronWeekForm.cronWeekName">
                  <el-radio-button label="assign">手动设置</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择星期几" prop="checkedWeeks">
                <el-checkbox-group v-model="cronWeekForm.checkedWeeks" :disabled="cronWeekForm.weekDisabled">
                  <el-checkbox v-for="week in cronWeekForm.weeks" :label="week.id" :key="week.id">{{week.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="选择时间" prop="checkedTime">
                <el-time-picker
                  value-format="HH:mm:ss"
                  v-model="cronWeekForm.checkedTime"
                  placeholder="请选择时间">
                </el-time-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-tab-pane label="按日" name="cronDateForm">
            <el-form :model="cronDateForm" :rules="cronDateRules" ref="cronDateForm" label-width="100px">
              <el-form-item label="类型" prop="cronDateName">
                <el-radio-group v-model="cronDateForm.cronDateName" @change="changeDateSetting">
                  <el-radio-button label="perDate">每 日</el-radio-button>
                  <el-radio-button label="assign">手动设置</el-radio-button>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="选择日期" prop="checkedDates">
                <el-checkbox-group v-model="cronDateForm.checkedDates" :disabled="cronDateForm.dateDisabled">
                  <el-checkbox v-for="date in cronDateForm.dates" :label="date.id" :key="date.id">{{date.name}}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label="选择时间" prop="checkedTime">
                <el-time-picker
                  value-format="HH:mm:ss"
                  v-model="cronDateForm.checkedTime"
                  placeholder="请选择时间">
                </el-time-picker>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialog.cronVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitCronForm(cronType)">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>

</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import ElFormItem from '../../../node_modules/element-ui/packages/form/src/form-item'
  import Sticky from '@/components/Sticky' // 粘性header组件
  export default {
    components: {
      ElFormItem,
      Sticky
    },
    data() {
      return {
        jobForm: {
          sourceId: '1', // 不在页面显示
          targetId: '2', // 不在页面显示
          jobDesc: '',
          sourceName: '',
          targetName: '',
          jobGroup: '',
          increField: '',
          groupName: '',
          jobCron: '',
          effectTimeDate: '',
          effectTimeHour: '',
          deactivateTimeDate: '',
          deactivateTimeHour: '',
          isRunNow: 0,
          isClear: 1,
          tryTimes: 3,
          tryInterval: 5,
          maxErrors: 100,
          extractType: '0',
          sql: '',
          cron: '',
          remark: ''
        },
        jobRules: {
          jobDesc: [
            { required: true, message: '请输入任务名称', trigger: 'blur' },
            { min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur' }
          ],
          sourceName: [
            { required: true, message: '请选择源表名称', trigger: 'blur' },
            { min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur' }
          ],
          targetName: [
            { required: true, message: '请选择目标表名称', trigger: 'blur' },
            { min: 3, max: 255, message: '长度在 3 到 255 个字符', trigger: 'blur' }
          ],
          jobGroup: [
            { required: true, message: '请选择运行节点', trigger: 'change' }
          ],
          increField: [
            { required: true, message: '请选择增量字段', trigger: 'change' }
          ],
          jobCron: [
            { required: true, message: '请选择调度时间', trigger: 'blur' }
          ],
          isRunNow: [
            { type: 'number', required: true, message: '请选择是否立即执行', trigger: 'change' }
          ],
          isClear: [
            { type: 'number', required: true, message: '请选择是否立即执行', trigger: 'change' }
          ],
          tryTimes: [
            { required: true, message: '尝试错误次数', trigger: 'blur' }
          ],
          tryInterval: [
            { required: true, message: '尝试时间间隔', trigger: 'blur' }
          ],
          maxErrors: [
            { required: true, message: '最大异常记录数', trigger: 'blur' }
          ],
          extractType: [
            { required: true, message: '勾选抽取类型', trigger: 'change' }
          ],
          sql: [
            { required: true, message: '请选择源表 SQL', trigger: 'blur' }
          ]
        },
        dialog: {
          sourceVisible: false,
          targetVisible: false,
          sqlVisible: false,
          cronVisible: false
        },
        sourceRules: {
          datasourceId: [
            { required: true, message: '请选择数据源名称', trigger: 'change' }
          ],
          tableId: [
            { required: true, message: '请选择数据表名称', trigger: 'change' }
          ]
        },
        targetRules: {
          datasourceId: [
            { required: true, message: '请选择数据源名称', trigger: 'change' }
          ],
          tableId: [
            { required: true, message: '请选择数据表名称', trigger: 'change' }
          ]
        },
        cronType: 'cronMonthForm',
        cronMonthForm: {
          cronMonthName: 'assign',
          monthDisabled: false,
          checkedMonths: [],
          checkedDates: [],
          checkedTime: '',
          months: [
            { id: 1, name: '一月' }, { id: 2, name: '二月' }, { id: 3, name: '三月' }, { id: 4, name: '四月' }, { id: 5, name: '五月' }, { id: 6, name: '六月' },
            { id: 7, name: '七月' }, { id: 8, name: '八月' }, { id: 9, name: '九月' }, { id: 10, name: '十月' }, { id: 11, name: '十一月' }, { id: 12, name: '十二月' }
          ],
          dates: [
            { id: 1, name: '一号' }, { id: 2, name: '二号' }, { id: 3, name: '三号' }, { id: 4, name: '四号' }, { id: 5, name: '五号' }, { id: 6, name: '六号' },
            { id: 7, name: '七号' }, { id: 8, name: '八号' }, { id: 9, name: '九号' }, { id: 10, name: '十号' }, { id: 11, name: '十一号' }, { id: 12, name: '十二号' },
            { id: 13, name: '十三号' }, { id: 14, name: '十四号' }, { id: 15, name: '十五号' }, { id: 16, name: '十六号' }, { id: 17, name: '十七号' }, { id: 18, name: '十八号' },
            { id: 19, name: '十九号' }, { id: 20, name: '二十号' }, { id: 21, name: '二十一号' }, { id: 22, name: '二十二号' }, { id: 23, name: '二十三号' }, { id: 24, name: '二十四号' },
            { id: 25, name: '二十五号' }, { id: 26, name: '二十六号' }, { id: 27, name: '二十七号' }, { id: 28, name: '二十八号' }, { id: 29, name: '二十九号' }, { id: 30, name: '三十号' },
            { id: 31, name: '三十一号' }
          ]
        },
        cronMonthRules: {
          cronMonthName: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          checkedMonths: [
            { required: true, message: '请选择月份', trigger: 'change' }
          ],
          checkedDates: [
            { required: true, message: '请选择日期', trigger: 'change' }
          ],
          checkedTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        cronWeekForm: {
          cronWeekName: 'assign',
          weekDisabled: false,
          checkedWeeks: [],
          checkedTime: '',
          weeks: [
            { id: 1, name: '星期日' }, { id: 2, name: '星期一' }, { id: 3, name: '星期二' }, { id: 4, name: '星期三' }, { id: 5, name: '星期四' }, { id: 6, name: '星期五' }, { id: 7, name: '星期六' }
          ]
        },
        cronWeekRules: {
          cronWeekName: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          checkedWeeks: [
            { required: true, message: '请选择星期几', trigger: 'change' }
          ],
          checkedTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        },
        cronDateForm: {
          cronDateName: 'perDate',
          dateDisabled: true,
          checkedDates: [],
          checkedTime: '',
          dates: [
            { id: 1, name: '一号' }, { id: 2, name: '二号' }, { id: 3, name: '三号' }, { id: 4, name: '四号' }, { id: 5, name: '五号' }, { id: 6, name: '六号' },
            { id: 7, name: '七号' }, { id: 8, name: '八号' }, { id: 9, name: '九号' }, { id: 10, name: '十号' }, { id: 11, name: '十一号' }, { id: 12, name: '十二号' },
            { id: 13, name: '十三号' }, { id: 14, name: '十四号' }, { id: 15, name: '十五号' }, { id: 16, name: '十六号' }, { id: 17, name: '十七号' }, { id: 18, name: '十八号' },
            { id: 19, name: '十九号' }, { id: 20, name: '二十号' }, { id: 21, name: '二十一号' }, { id: 22, name: '二十二号' }, { id: 23, name: '二十三号' }, { id: 24, name: '二十四号' },
            { id: 25, name: '二十五号' }, { id: 26, name: '二十六号' }, { id: 27, name: '二十七号' }, { id: 28, name: '二十八号' }, { id: 29, name: '二十九号' }, { id: 30, name: '三十号' },
            { id: 31, name: '三十一号' }
          ]
        },
        cronDateRules: {
          cronDateName: [
            { required: true, message: '请选择类型', trigger: 'change' }
          ],
          checkedDates: [
            { required: false, message: '请选择日期', trigger: 'change' }
          ],
          checkedTime: [
            { required: true, message: '请选择时间', trigger: 'change' }
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'job'
      ])
    },
    created() {
      // 刚一进页面就查询执行器列表
      this.getExacutorList()
    },
    methods: {
      ...mapMutations([
        'SET_STABLENAME',
        'SET_TTABLENAME',
        'SET_FIELDINFOSLIST'
      ]),
      getExacutorList() {
        this.$store.dispatch('job/GetExacutorList').then(() => {
        }).catch(() => {
        })
      },
      submitSourceForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const tableDetail = this.job.addJob.dataTableList.filter(v => v.tableId === Number(this.job.addJob.sourceForm.tableId))
            const fieldInfos = tableDetail[0] && tableDetail[0].fieldInfos
            const filedsArr = fieldInfos.map((v) => {
              return v.fieldName
            })
            this.jobForm.sourceId = this.job.addJob.sourceForm.tableId
            this.jobForm.sql = 'select ' + filedsArr.join(',') + ' from ' + this.job.addJob.sourceForm.tableName
            this.jobForm.sourceName = this.job.addJob.sourceForm.tableName
            this.$store.commit('SET_FIELDINFOSLIST', {
              fieldInfosList: filedsArr
            })
            this.dialog.sourceVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitTargetForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.jobForm.targetId = this.job.addJob.targetForm.tableId
            this.jobForm.targetName = this.job.addJob.targetForm.tableName
            this.dialog.targetVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 修改生效和失效时间
            if (!this.jobForm.effectTimeDate && this.jobForm.effectTimeHour) {
              this.$message({
                message: '请补齐生效日期',
                type: 'warning'
              })
              return false
            }
            if (this.jobForm.effectTimeDate && !this.jobForm.effectTimeHour) {
              this.$message({
                message: '请补齐生效时间',
                type: 'warning'
              })
              return false
            }
            if (!this.jobForm.deactivateTimeDate && this.jobForm.deactivateTimeHour) {
              this.$message({
                message: '请补齐失效日期',
                type: 'warning'
              })
              return false
            }
            if (this.jobForm.deactivateTimeDate && !this.jobForm.deactivateTimeHour) {
              this.$message({
                message: '请补齐失效时间',
                type: 'warning'
              })
              return false
            }
            if (this.jobForm.effectTimeDate && this.jobForm.effectTimeHour) {
              this.jobForm.effectTime = this.jobForm.effectTimeDate + ' ' + this.jobForm.effectTimeHour
            }
            if (this.jobForm.deactivateTimeDate && this.jobForm.deactivateTimeHour) {
              this.jobForm.deactivateTime = this.jobForm.deactivateTimeDate + ' ' + this.jobForm.deactivateTimeHour
            }
            delete this.jobForm.effectTimeDate
            delete this.jobForm.effectTimeHour
            delete this.jobForm.deactivateTimeDate
            delete this.jobForm.deactivateTimeHour
            this.$store.dispatch('job/AddJob', this.jobForm).then(() => {
              this.$router.push({ path: '/job/index' })
            }).catch(() => {
            })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      submitCronForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const typeMapping = {
              cronMonthForm: 'monthType',
              cronWeekForm: 'weekType',
              cronDateForm: 'dateType'
            }
            const modeMapping = {
              cronMonthForm: this.cronMonthForm.cronMonthName,
              cronWeekForm: this.cronWeekForm.cronWeekName,
              cronDateForm: this.cronDateForm.cronDateName
            }
            const monthMapping = {
              cronMonthForm: this.cronMonthForm.checkedMonths
            }
            const weekMapping = {
              cronWeekForm: this.cronWeekForm.checkedWeeks
            }
            const dateMapping = {
              cronMonthForm: this.cronMonthForm.checkedDates,
              cronDateForm: this.cronDateForm.checkedDates
            }
            const timeMapping = {
              cronMonthForm: this.cronMonthForm.checkedTime,
              cronWeekForm: this.cronWeekForm.checkedTime,
              cronDateForm: this.cronDateForm.checkedTime
            }
            const formData = {
              type: typeMapping[formName],
              mode: modeMapping[formName],
              months: monthMapping[formName],
              weeks: weekMapping[formName],
              dates: dateMapping[formName],
              time: timeMapping[formName]
            }

            for (var val in formData) {
              if (!formData[val]) {
                delete formData[val]
              }
            }
            this.jobForm.jobCron = this.createCron(formData)
            this.jobForm.cron = formData
            this.dialog.cronVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      chooseSourceName() {
        this.$store.dispatch('job/GetDataSourceList', { type: 'addJob' }).then(() => {
        }).catch(() => {
        })
        this.dialog.sourceVisible = true
      },
      chooseTargetName() {
        this.$store.dispatch('job/GetDataSourceList', { type: 'editJob' }).then(() => {
        }).catch(() => {
        })
        this.dialog.targetVisible = true
      },
      lookSourceSQL() {
        this.dialog.sqlVisible = true
      },
      setCronExpression() {
        this.dialog.cronVisible = true
      },
      changeDateSetting(val) {
        if (val === 'assign') {
          this.cronDateForm.dateDisabled = false
          this.cronDateRules.checkedDates[0].required = true
        } else if (val === 'perDate') {
          this.cronDateForm.dateDisabled = true
          this.cronDateRules.checkedDates[0].required = false
        }
      },
      createCron(data) {
        const times = data.time.split(':')
        const monthsStr = data.months && data.months.join(',')
        const datesStr = data.dates && data.dates.join(',')
        const weeksStr = data.weeks && data.weeks.join(',')
        const hour = times[0]
        const minute = times[1]
        const second = times[2]
        let jobCron = second + ' ' + minute + ' ' + hour + ' '
        switch (data.type) {
          case 'monthType':
            jobCron += datesStr + ' ' + monthsStr + ' ?'
            break
          case 'weekType':
            jobCron += '? * ' + weeksStr
            break
          case 'dateType':
            if (data.mode === 'perDate') {
              jobCron += '* * ?'
            } else if (data.mode === 'assign') {
              jobCron += datesStr + ' * ?'
            }
            break
          default:
            break
        }
        return jobCron
      },
      changeBoolToNum(val) {
        if (val === 'isRunNow') {
          this.jobForm.isRunNow = this.jobForm.isRunNow === 1 ? 0 : 1
        }
        if (val === 'isClear') {
          this.jobForm.isClear = this.jobForm.isClear === 1 ? 0 : 1
        }
      },
      goBack() {
        this.$router.push({ path: '/job/index' })
      },
      changeDataSource(id) {
        this.$store.dispatch('GetDataTableList', { queryParams: id, type: 'addJob' }).then(() => {
        }).catch(() => {
        })
      },
      changeSourceDataTable(id) {
        const tempTableArr = this.job.addJob.dataTableList.filter(v => v.tableId === Number(id))
        this.$store.commit('SET_STABLENAME', {
          tableName: tempTableArr[0].tableName
        })
      },
      changeTargetDataTable(id) {
        const tempTableArr = this.job.addJob.dataTableList.filter(v => v.tableId === Number(id))
        this.$store.commit('SET_TTABLENAME', {
          tableName: tempTableArr[0].tableName
        })
      },
      changeGroupName(id) {
        const tempArr = this.job.exacutorList.filter(v => v.id === Number(id))
        this.jobForm.groupName = tempArr[0].title
      }
    }
  }
</script>

<style>
  .el-tabs__content{
    border-bottom: 1px solid #e4e7ed;
    border-left: 1px solid #e4e7ed;
    border-right: 1px solid #e4e7ed;
    padding: 24px 0 0 0;
  }
  .el-tabs__header{
    margin: 0;
  }
  .el-checkbox{
    margin-right: 30px;
  }
  .el-checkbox+.el-checkbox {
    margin-left: 0;
  }
</style>

