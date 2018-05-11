<template>
    <div style="padding:12px 8px" class="wl">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="列表" name="1" class="margin0">
          <div class="barHeader">
            <a class="marginLR5">
              <img src="../images/add.png">添加实体表
            </a>
          </div>
          <div>
            <table class="wl tableList" border="0" cellspacing="0" cellpadding="0">
              <colgroup>
                <col style="width:50px;">
                <col style="width:200px;">
                <col style="width:200px;">
                <col style="width:80px;">
                <col style="width:200px;">
                <col style="width:200px;">
                <col style="width:100px;">
              </colgroup>
              <tbody style="background: #F2F2F2;">
              <tr class="tableHeader">
                <td>序号</td>
                <td>代号</td>
                <td>简称</td>
                <td>类型</td>
                <td>数据库</td>
                <td>关键字</td>
                <td>操作</td>
              </tr>
              </tbody>
              <tr v-for="(item, index) in tableList" :key="index">
                <td>{{index+1}}</td>
                <td><span>{{item.code}}</span></td>
                <td><span>{{item.codeList}}</span></td>
                <td><span>{{item.table}}</span></td>
                <td><span>{{item.type}}</span></td>
                <td><span>{{item.keyWord}}</span></td>
                <td>
                  <a class="button_blue_small">属性</a>
                </td>
              </tr>
              <tr>
                <td>1</td>
                <td>AA_FAY_CYBR</td>
                <td>AA_FAY_CYBR表</td>
                <td>表</td>
                <td>AA_FAY_CYBR</td>
                <td></td>
                <td>
                  <a class="button_blue_small">属性</a>
                </td>
              </tr>
            </table>
          </div>
        </el-tab-pane>

        <el-tab-pane label="表关联关系" name="2">
          <div class="barHeader">
            <a class="marginLR5">
              <img src="../images/add.png">添加数
            </a>
            <a class="marginLR5">
              <img src="../images/adddouble.gif">批量增加
            </a>
            <a class="marginLR5">
              <img src="../images/edit.gif">编辑
            </a>
            <a class="marginLR5">
              <img src="../images/remove.gif">删除
            </a>
            <span style="position:absolute;right:0">
              <el-select size="mini">
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
              </el-select>
              <el-select size="mini">
                <el-option value="1">1</el-option>
                <el-option value="2">2</el-option>
              </el-select>
            </span>
          </div>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="序号" width="80"></el-table-column>
              <el-table-column prop="name" label="代号" width="180"></el-table-column>
              <el-table-column prop="address" label="标题"></el-table-column>
              <el-table-column prop="address" label="关联表"></el-table-column>
              <el-table-column prop="address" label="关联字段"></el-table-column>
              <el-table-column prop="address" width="150" label="对应关系"></el-table-column>
              <el-table-column prop="address" width="150" label="默认关系"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
  export default {
    name: 'dataSourceTableList',
    data() {
      return {
        activeName: '1',
        tableData: [],
        tableList: [
          {code: 'HJS_32', codeList: 'HJS_32表', table: 'HJS_32', type: '表', keyWord: 'HJS_32'},
          {code: 'HJS_66', codeList: 'HJS_66表', table: 'HJS_66', type: '表', keyWord: 'HJS_66'},
          {code: 'HJS_54', codeList: 'HJS_54表', table: 'HJS_54', type: '表', keyWord: 'HJS_54'},
        ]
      }
    },
    methods: {
    }
  }
</script>
