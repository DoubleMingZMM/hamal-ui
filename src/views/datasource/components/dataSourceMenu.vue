<template>
  <div class="menuBox">
    <div class="menuHeader">
      <span>数据源</span>
      <span class="wl" style="float: right;margin-top: 3px;">
        <img src="../images/search.png" title="搜索">
        <img src="../images/refresh.png" title="刷新">
        <!--<img src="../images/unexpand.png" title="收起">-->
      </span>
    </div>
    <div>
      <el-tree
        class="filter-tree"
        :data="data2"
        :props="defaultProps"
        default-expand-all
        @node-click="selectNode"
        :expand-on-click-node="false"
        :filter-node-method="filterNode"
        ref="tree2">
      </el-tree>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dataSourceMenu',
  data() {
    return {
      data2: [{
        id: 1,
        label: '数据源',
        type: '1',
        children: [{
          id: 4,
          label: '表列表',
          type: '2',
          children: [{
            id: 11,
            label: '字典表',
            type: '4',
            children: [
              {
                id: 12,
                label: 'test',
                type: '5'
              }
            ]
          }, {
            id: 9,
            label: '三级 1-1-1',
            type: '3'
          }, {
            id: 10,
            label: '三级 1-1-2',
            type: '3'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    selectNode(item, node, t) {
      this.$emit('selectNode', item)
    }
  }
}
</script>
