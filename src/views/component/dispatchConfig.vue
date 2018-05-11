<template>
  <div>
    <el-form :model="component.dispatchForm" :rules="dispatchRules" ref="dispatchForm" label-width="150px">
      <el-form-item label="调度时间" prop="jobCron">
        <el-input v-model="component.jobCron" style="width:400px;" placeholder="请选择调度时间" disabled></el-input>
        <el-button type="info" style="margin-left: 24px;" @click="setCronExpression">选择</el-button>
      </el-form-item>
      <el-form-item label="生效时间">
        <el-col style="width:232px;">
          <el-form-item prop="effectTimeDate">
            <el-date-picker type="date" placeholder="选择生效日期" value-format="yyyy-MM-dd" v-model="component.dispatchForm.effectTimeDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" style="width:30px;text-align: center;">-</el-col>
        <el-col style="width:232px;">
          <el-form-item prop="effectTimeHour">
            <el-time-picker type="fixed-time" placeholder="选择生效时间" value-format="HH:mm:ss" v-model="component.dispatchForm.effectTimeHour" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="失效时间">
        <el-col style="width:232px;">
          <el-form-item prop="deactivateTimeDate">
            <el-date-picker type="date" placeholder="选择失效日期" value-format="yyyy-MM-dd" v-model="component.dispatchForm.deactivateTimeDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" style="width:30px;text-align: center;">-</el-col>
        <el-col style="width:232px;">
          <el-form-item prop="deactivateTimeHour">
            <el-time-picker type="fixed-time" placeholder="选择失效时间" value-format="HH:mm:ss" v-model="component.dispatchForm.deactivateTimeHour" style="width: 100%;"></el-time-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item label="是否启用" prop="isEnable" style="width:50%;">
        <el-switch v-model="component.dispatchForm.isEnable === 1"  @change="changeIsEnable"></el-switch>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="component.dispatchForm.remark" :rows="5" style="width: 600px;"></el-input>
      </el-form-item>
    </el-form>
    <div style="text-align: right;margin-top: 12px;">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="next" type="primary">下一步</el-button>
    </div>

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
</template>

<script>
  import { mapState, mapMutations } from 'vuex'
  export default {
    name: 'dispatchConfig',
    components: {
    },
    props: {
    },
    data() {
      return {
        dispatchRules: {
        },
        dialog: {
          cronVisible: false
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
      changeIsEnable() {
        this.component.dispatchForm.isEnable = this.component.dispatchForm.isEnable === 1 ? 0 : 1
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
            this.component.jobCron = this.createCron(formData)
            this.component.cron = formData
            this.dialog.cronVisible = false
          } else {
            console.log('error submit!!')
            return false
          }
        })
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
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
