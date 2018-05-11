<template>
    <div>
      <div class="barHeader">
        <a @click="add()">
          <img src="../images/add.png">添加数据源
        </a>
        <a @click="refresh()">
          <img src="../images/reload.gif">刷新
        </a>
        <a>
          <img src="../images/checkData.png">检查数据源
        </a>
      </div>
      <div style="padding:8px;">
        <table class="wl-table_dataSource" cellspacing="0" style="width:100%;">
          <colgroup>
            <col style="width:80px;">
            <col>
            <col>
          </colgroup>
          <tr v-for="item in datasourceList">
            <td class="text-center">
              <i class="icon_metalist"></i>
            </td>
            <td>
              <div class="title">
                <a class="title_a">{{item.title}}</a>
              </div>
              <div class="font-size: 12px;margin-bottom: 6px;">
                连接池：{{item.connectPool}}
              </div>
              <div>
                描述：{{item.describe}}
              </div>
            </td>
            <td class="right_operating">
              <a class="button_blue_small">字典的表</a>
              <a class="button_blue_small">属性</a>
            </td>
          </tr>
          <tr>
            <td class="text-center">
              <i class="icon_metalist"></i>
            </td>
            <td>
              <div class="title">
                <a class="title_a">工商信用BI数据源</a>
              </div>
              <div class="font-size: 12px;margin-bottom: 6px;">
                连接池：*缺省连接池 ( jdbc:oracle:thin:@127.0.0.1:1521:orcl )
              </div>
              <div>
                描述：2222
              </div>
            </td>
            <td class="right_operating">
              <a class="button_blue_small">字典的表</a>
              <a class="button_blue_small">属性</a>
            </td>
          </tr>
        </table>
      </div>

    </div>
</template>

<script>
export default {
  name: 'dataSource',
  data() {
    return {
      datasourceList: [
        {title:'小强'},
        {title:'小强2'}
      ]
    }
  },
  methods: {
    add() {
      this.datasourceList.push({title: '小强'})
    },
    refresh() {
      this.datasourceList = (function() {
        let arr = []
        for (let i = 0; i < Math.floor(Math.random() * 10) + 3; i++) {
          arr.push({title: '小强' + i})
        }
        return arr
      })()
    }
  }
}
</script>
