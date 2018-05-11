<template>
  <div class="dndList">
    <el-card class="box-card-min-width" :style="{width:width1,float:float_l}" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{list1Title}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
      </div>
      <draggable :list="list1" class="dragArea" :options="{group:'source'}">
        <transition-group>
          <div class="list-complete-item" v-for="element in list1" :key='element.id'>
            <div class="list-complete-item-handle">
              <el-checkbox></el-checkbox>
              {{element.title}}
            </div>
            <!--<div class="line-move"></div>-->
          </div>
        </transition-group>
      </draggable>
    </el-card>

<!--    <div style="width:10%;height:174px;float:left;margin-top: 55px;padding:20px 0">
      <div v-for="item in [1,2,3]" style="margin-top: 24px;height:20px;">
        <transition :name="transition-'item'">
          <div style="height:2px;width:100px;background-color: red;"></div>
        </transition>
      </div>
    </div>-->

    <el-card class="box-card-min-width" :style="{width:width2,float:float_l,marginLeft:mar_l}" shadow="never">
      <div slot="header" class="clearfix">
        <span>{{list2Title}}</span>
        <!--<el-button style="float: right; padding: 3px 0" type="text" @click="addEle">新增字段</el-button>-->
      </div>
      <draggable :list="list2" class="dragArea" :options="{group:'target'}">
        <transition-group>
          <div class="list-complete-item" v-for="element in list2" :key='element.id'>
            <div class='list-complete-item-handle2'>{{element.title}}</div>
    <!--        <div style="position:absolute;right:0px;">
          <span style="float: right ;margin-top: -15px;margin-right:5px;" @click="removeEle(element)">
            <i style="color:#ff4949" class="el-icon-delete"></i>
          </span>
            </div>-->
          </div>
        </transition-group>
      </draggable>
    </el-card>

  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'DndList',
  components: {
    draggable },
  computed: {
    filterList2() {
      return this.list2.filter(v => {
        if (this.isNotInList1(v)) {
          return v
        }
        return false
      })
    }
  },
  props: {
    list1: {
      type: Array,
      default() {
        return []
      }
    },
    list2: {
      type: Array,
      default() {
        return []
      }
    },
    list1Title: {
      type: String,
      default: 'list1'
    },
    list2Title: {
      type: String,
      default: 'list2'
    },
    width1: {
      type: String,
      default: '30%'
    },
    width2: {
      type: String,
      default: '30%'
    },
    border1: {
      type: String,
      default: '1px solid red'
    },
    float_l: {
      type: String,
      default: 'left'
    },
    mar_l: {
      type: String,
      default: '10%'
    },
    removeEle: {
      type: Function
    },
    addEle: {
      type: Function
    }
  },
  methods: {
    isNotInList1(v) {
      return this.list1.every(k => v.id !== k.id)
    },
    isNotInList2(v) {
      return this.list2.every(k => v.id !== k.id)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dndList {
  background: #fff;
  padding-bottom: 40px;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
  .dndList-list {
    float: left;
    padding-bottom: 30px;
    &:first-of-type {
      margin-right: 2%;
    }
    .dragArea {
      margin-top: 15px;
      min-height: 50px;
      padding-bottom: 30px;
    }
  }
  .box-card-min-width{
    min-width: 330px;
  }
  .line-move{
    background-color: red;
    height: 2px;
    width:2px;
    float:right;
    animation:myfirst 5s;
  }
  @keyframes myfirst{
  0% {width: 0px;} 100% {width: 100px;}
  }
}

.list-complete-item {
  height: 40px;
  line-height: 40px;
  cursor: move;
  position: relative;
  font-size: 14px;
  padding: 0px 10px;
  margin-top: 4px;
  transition: all 1s;
  background-color: #ecf5ff;
  border-radius: 3px;
}

.list-complete-item-handle {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 50px;
}

.list-complete-item-handle2 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-right: 20px;
}

.list-complete-enter,
.list-complete-leave-active {
  opacity: 0;
}
</style>
