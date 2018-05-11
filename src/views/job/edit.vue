<template>
  <div>
    <sticky className="sub-navbar draft">
      <el-button icon="el-icon-back" @click="goBack">返回任务详情</el-button>
    </sticky>
    <div class="app-container calendar-list-container">
      <el-form :model="job.jobForm" :rules="jobRules" ref="jobForm" label-width="150px">
        <el-form-item label="任务名称" prop="jobDesc">
          <el-input v-model="job.jobForm.jobDesc" style="width:400px;" placeholder="请填写任务名称" @change="change('jobDesc',job.jobForm.jobDesc)"></el-input>
        </el-form-item>
        <el-form-item label="源表名称" prop="sourceName">
          <el-input v-model="job.jobForm.sourceName" style="width:400px;" placeholder="请选择源表名称" @change="change('sourceName',job.jobForm.sourceName)" disabled></el-input>
          <el-button type="info" style="margin-left: 24px;" @click="chooseSourceName">选择</el-button>

          <el-button type="primary" style="margin-left: 24px;" @click="lookSourceSQL">查看源表 SQL</el-button>
        </el-form-item>
        <el-form-item label="目标表名称" prop="targetName">
          <el-input v-model="job.jobForm.targetName" style="width:400px;" placeholder="请选择目标表名称" @change="change('targetName',job.jobForm.targetName)" disabled></el-input>
          <el-button type="info"  style="margin-left: 24px;" @click="chooseTargetName">选择</el-button>
        </el-form-item>
        <el-form-item label="调度时间" prop="jobCron">
          <el-input v-model="job.jobForm.jobCron" style="width:400px;" placeholder="请选择调度时间" disabled></el-input>
          <el-button type="info" style="margin-left: 24px;" @click="setCronExpression">选择</el-button>
        </el-form-item>
        <el-form-item label="运行节点" prop="jobGroup">
          <el-select v-model="job.jobForm.jobGroup + ''" placeholder="请选择运行节点" style="width: 232px" @change="changeGroupName">
            <el-option v-for="item in job.exacutorList" :key="item.id" :label="item.appName" :value="item.id.toString()">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间">
          <el-col style="width:232px;">
            <el-form-item prop="effectTimeDate">
              <el-date-picker type="date" placeholder="选择生效日期" value-format="yyyy-MM-dd"
                              v-model="job.jobForm.effectTimeDate" style="width: 100%;"  @change="change('effectTimeDate',job.jobForm.effectTimeDate)"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:30px;text-align: center;">-</el-col>
          <el-col style="width:232px;">
            <el-form-item prop="effectTimeHour">
              <el-time-picker type="fixed-time" placeholder="选择生效时间" value-format="HH:mm:ss"
                              v-model="job.jobForm.effectTimeHour" style="width: 100%;" @change="change('effectTimeHour',job.jobForm.effectTimeHour)"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="失效时间">
          <el-col style="width:232px;">
            <el-form-item prop="deactivateTimeDate">
              <el-date-picker type="date" placeholder="选择失效日期" value-format="yyyy-MM-dd"
                              v-model="job.jobForm.deactivateTimeDate" style="width: 100%;" @change="change('deactivateTimeDate',job.jobForm.deactivateTimeDate)"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" style="width:30px;text-align: center;">-</el-col>
          <el-col style="width:232px;">
            <el-form-item prop="deactivateTimeHour">
              <el-time-picker type="fixed-time" placeholder="选择失效时间" value-format="HH:mm:ss"
                              v-model="job.jobForm.deactivateTimeHour" style="width: 100%;" @change="change('deactivateTimeHour',job.jobForm.deactivateTimeHour)"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="是否立即执行" prop="isRunNow" style="width:50%;">
          <el-switch v-model="job.jobForm.isRunNow" @change="changeBoolToNum('isRunNow',job.jobForm.isRunNow)"></el-switch>
        </el-form-item>
        <el-form-item label="是否清空目标表" prop="isClear" style="width:50%;">
          <el-switch v-model="job.jobForm.isClear" @change="changeBoolToNum('isClear',job.jobForm.isClear)"></el-switch>
        </el-form-item>
        <el-form-item label="尝试错误次数" prop="tryTimes">
          <el-input-number v-model="job.jobForm.tryTimes" controls-position="right" :min="0" :max="6" @change="change('tryTimes',job.jobForm.tryTimes)"></el-input-number>
        </el-form-item>
        <el-form-item label="尝试时间间隔" prop="tryInterval">
          <el-input-number v-model="job.jobForm.tryInterval" controls-position="right" :min="1" :max="30" @change="change('tryInterval',job.jobForm.tryInterval)"></el-input-number>
        </el-form-item>
        <el-form-item label="最大异常记录数" prop="maxErrors">
          <el-input-number v-model="job.jobForm.maxErrors" controls-position="right" :min="0" :max="1000" @change="change('maxErrors',job.jobForm.maxErrors)"></el-input-number>
        </el-form-item>
        <el-form-item label="抽取类型" prop="extractType">
          <el-radio-group v-model="job.jobForm.extractType" size="medium" @change="change('extractType',job.jobForm.extractType)">
            <el-radio border label="0">全量</el-radio>
            <el-radio border label="1">增量</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="增量字段" prop="increField" v-if="job.jobForm.extractType === '1'">
          <el-tooltip class="item" effect="dark" content="请先选择源表名称" placement="top" v-if="job.fieldInfosList.length === 0">
            <el-select v-model="job.jobForm.increField" placeholder="请选择增量字段" style="width: 232px" disabled>
              <el-option v-for="item in job.fieldInfosList" :key="item" :label="item" :value="item + ''">
              </el-option>
            </el-select>
          </el-tooltip>
          <el-select v-model="job.jobForm.increField" placeholder="请选择增量字段" style="width: 232px" v-else>
            <el-option v-for="item in job.fieldInfosList" :key="item" :label="item" :value="item + ''">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="job.jobForm.remark" :rows="5" style="width: 600px;" @change="change('remark',job.jobForm.remark)"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('jobForm')">立即创建</el-button>
          <el-button @click="resetForm('jobForm')">重置</el-button>
        </el-form-item>
      </el-form>

      <!--源表名称modal-->
      <el-dialog title="选择源表名称" :visible.sync="dialog.sourceVisible">
        <el-form :model="job.editJob.sourceForm" :rules="sourceRules" ref="sourceForm" label-width="100px">
          <el-form-item label="数据源名称" prop="datasourceId">
            <el-select v-model="job.editJob.sourceForm.datasourceId" placeholder="请选择数据源" @change="changeDataSource">
              <el-option v-for="item in job.editJob.dataSourceList" :key="item.datasourceId"
                         :label="item.datasourceName" :value="item.datasourceId + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据表名称" prop="tableId">
            <el-select v-model="job.editJob.sourceForm.tableId" placeholder="请选择数据表" @change="changeSourceDataTable">
              <el-option v-for="item in job.editJob.dataTableList" :key="item.tableId"
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
        <el-form :model="job.editJob.targetForm" :rules="targetRules" ref="targetForm" label-width="100px">
          <el-form-item label="数据源名称" prop="datasourceId">
            <el-select v-model="job.editJob.targetForm.datasourceId" placeholder="请选择数据源" @change="changeDataSource">
              <el-option v-for="item in job.editJob.dataSourceList" :key="item.datasourceId"
                         :label="item.datasourceName" :value="item.datasourceId + ''"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数据表名称" prop="tableId">
            <el-select v-model="job.editJob.targetForm.tableId" placeholder="请选择数据表" @change="changeTargetDataTable">
              <el-option v-for="item in job.editJob.dataTableList" :key="item.tableId"
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
        <div>{{job.jobForm.sql}}</div>
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
            { type: 'boolean', required: true, message: '请选择是否立即执行', trigger: 'change' }
          ],
          isClear: [
            { type: 'boolean', required: true, message: '请选择是否立即执行', trigger: 'change' }
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
      // 刚一进页面就要查询任务详情的接口
      this.getJobDetail()
    },
    methods: {
      ...mapMutations([
        'UPDATE_JOBFORM',
        'SET_SEDITTABLENAME',
        'SET_TEDITTABLENAME',
        'SET_FIELDINFOSLIST'
      ]),
      getJobDetail() {
        this.$store.dispatch('job/GetJobDetail', this.$route.params.id).then(() => {
        }).catch(() => {
        })
      },
      getExacutorList() {
        this.$store.dispatch('job/GetExacutorList').then(() => {
        }).catch(() => {
        })
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            // 修改生效和失效时间
            if (!this.job.jobForm.effectTimeDate && this.job.jobForm.effectTimeHour) {
              this.$message({
                message: '请补齐生效日期',
                type: 'warning'
              })
              return false
            }
            if (this.job.jobForm.effectTimeDate && !this.job.jobForm.effectTimeHour) {
              this.$message({
                message: '请补齐生效时间',
                type: 'warning'
              })
              return false
            }
            if (!this.job.jobForm.deactivateTimeDate && this.job.jobForm.deactivateTimeHour) {
              this.$message({
                message: '请补齐失效日期',
                type: 'warning'
              })
              return false
            }
            if (this.job.jobForm.deactivateTimeDate && !this.job.jobForm.deactivateTimeHour) {
              this.$message({
                message: '请补齐失效时间',
                type: 'warning'
              })
              return false
            }
            if (this.job.jobForm.effectTimeDate && this.job.jobForm.effectTimeHour) {
              this.$store.commit('UPDATE_JOBFORM', {
                effectTime: this.job.jobForm.effectTimeDate + ' ' + this.job.jobForm.effectTimeHour
              })
            }
            if (this.job.jobForm.deactivateTimeDate && this.job.jobForm.deactivateTimeHour) {
              this.$store.commit('UPDATE_JOBFORM', {
                deactivateTime: this.job.jobForm.deactivateTimeDate + ' ' + this.job.jobForm.deactivateTimeHour
              })
            }
            /* delete this.jobForm.effectTimeDate
            delete this.jobForm.effectTimeHour
            delete this.jobForm.deactivateTimeDate
            delete this.jobForm.deactivateTimeHour */
            const params = {
              ...this.job.jobForm,
              id: this.$route.params.id,
              isRunNow: this.job.jobForm.isRunNow ? 1 : 0,
              isClear: this.job.jobForm.isClear ? 1 : 0
            }
            this.$store.dispatch('job/UpdateJob', params).then(() => {
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
            this.$store.commit('UPDATE_JOBFORM', {
              jobCron: this.createCron(formData),
              cron: formData
            })
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
        this.$store.dispatch('job/GetDataSourceList', { type: 'editJob' }).then(() => {
        }).catch(() => {
        })
        this.dialog.sourceVisible = true
      },
      chooseTargetName() {
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
      changeBoolToNum(key, value) {
        if (key === 'isRunNow') {
          this.$store.commit('UPDATE_JOBFORM', {
            [key]: value
          })
        }
        if (key === 'isClear') {
          this.$store.commit('UPDATE_JOBFORM', {
            [key]: value
          })
        }
      },
      goBack() {
        this.$router.push({ path: `/job/detail/${this.$route.params.id}` })
      },
      change(key, value) {
        this.$store.commit('UPDATE_JOBFORM', {
          [key]: value
        })
      },
      changeDataSource(id) {
        this.$store.dispatch('job/GetDataTableList', { queryParams: id, type: 'editJob' }).then(() => {
        }).catch(() => {
        })
      },
      changeSourceDataTable(id) {
        const tempTableArr = this.job.editJob.dataTableList.filter(v => v.tableId === Number(id))
        this.$store.commit('SET_SEDITTABLENAME', {
          tableName: tempTableArr[0].tableName
        })
      },
      changeTargetDataTable(id) {
        const tempTableArr = this.job.editJob.dataTableList.filter(v => v.tableId === Number(id))
        this.$store.commit('SET_TEDITTABLENAME', {
          tableName: tempTableArr[0].tableName
        })
      },
      submitSourceForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const tableDetail = this.job.editJob.dataTableList.filter(v => v.tableId === Number(this.job.editJob.sourceForm.tableId))
            const fieldInfos = tableDetail[0] && tableDetail[0].fieldInfos
            const filedsArr = fieldInfos.map((v) => {
              return v.fieldName
            })
            this.job.jobForm.sourceId = this.job.editJob.sourceForm.tableId
            this.job.jobForm.sql = 'select ' + filedsArr.join(',') + ' from ' + this.job.editJob.sourceForm.tableName
            this.job.jobForm.sourceName = this.job.editJob.sourceForm.tableName
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
            this.job.jobForm.targetId = this.job.editJob.targetForm.tableId
            this.job.jobForm.targetName = this.job.editJob.targetForm.tableName
            this.dialog.targetVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      changeGroupName(id) {
        const tempArr = this.job.exacutorList.filter(v => v.id === Number(id))
        this.$store.commit('UPDATE_JOBFORM', {
          groupName: tempArr[0].title
        })
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

