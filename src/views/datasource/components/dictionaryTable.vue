<template>
    <div>
      <div class="barHeader">
        <a>
          <img src="../images/add.png">添加
        </a>
        <a>
          <img src="../images/adddouble.gif">批量添加
        </a>
        <a>
          <img src="../images/reload.gif">刷新
        </a>
        <a>
          <img src="../images/reload2.gif">重置
        </a>
      </div>
      <div style="padding:8px;">
        <table class="wl-table_dataSource" cellspacing="0" style="width:100%;">
          <colgroup>
            <col style="width:80px;">
            <col>
            <col>
          </colgroup>
          <tr>
            <td class="text-center">
              <i class="icon_metalist"></i>
            </td>
            <td>
              <div class="title">
                <a class="title_a">test</a>
              </div>
              <div class="infoStyle">
                <span>缓存 √</span>
                <span>批量子维 ×</span>
                <span><img src="../images/report_table.png">ACT_GE_PROPERTY</span>
              </div>
            </td>
            <td class="right_operating">
              相关操作：
              <a class="button_blue_small">编辑内容</a>
              <a class="button_blue_small">设置结构</a>
              <a class="button_blue_small">删除</a>
            </td>
          </tr>
        </table>
      </div>
    </div>
</template>

<script>
  export default {
    name: 'dictionaryTable',
    data() {
      return {}
    }
  }
</script>
