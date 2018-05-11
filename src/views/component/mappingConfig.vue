<template>
  <div>
    <div style="text-align: left">
      <dnd-list :list1="list1" :list2="list2" list1Title="源表字段" list2Title="目标表字段"></dnd-list>
    </div>

    <div style="text-align: right;margin-top: 12px;">
      <el-button @click="pre">上一步</el-button>
      <el-button @click="next" type="primary">下一步</el-button>
    </div>
  </div>
</template>

<script type="text/jsx">
  import { mapState, mapMutations } from 'vuex'
  import DndList from '@/components/DndList'
  export default {
    name: 'mappingConfig',
    components: {
      DndList
    },
    props: {
    },
    data() {
      return {
        list1: [{id: 1, title: '第一个目标'}, {id: 2, title: '第二个目标'}, {id: 3, title: '第三个目标'}],
        list2: [{id: 4, title: '第一个源'}, {id: 5, title: '第二个源'}, {id: 6, title: '第三个源'}]
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
      }/*,
      removeEle(ele) {
        this.$confirm(`此操作将立即移除该字段, 是否继续?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (const item of this.list2) {
            if (item.id === ele.id) {
              const index = this.list2.indexOf(item)
              this.list2.splice(index, 1)
              break
            }
          }
          this.$message({
            type: 'success',
            message: '移除该字段成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消立即移除该字段'
          })
        })
      },
      addEle() {
        this.$prompt('请输入添加字段', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^[a-zA-Z0-9-_]{3,10}$/,
          inputErrorMessage: '添加字段长度为3-10，且是英文、数字、下划线及-'
        }).then(({ value }) => {
          this.$message({
            type: 'success',
            message: '你的添加字段是: ' + value
          })
          const item = {id: 7, title: value}
          this.list2.push(item)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      }*/
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
