<template>
  <div class="const-container full-fill flex-row">
    <div class="const-group"> 
      <Table 
        tableTitle="常量组" 
        :tableData="constGroupTableData" 
        :tableSetting="constGroupTableSetting">
      </Table>
    </div>
    <div class="const">
      <Table 
        tableTitle="常量" 
        :tableData="constGroupTableData" 
        :tableSetting="constGroupTableSetting">
      </Table>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import Table from '../Base/Table.vue'

const constGroupTableData = [
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom'
  },
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom'
  },
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom'
  },
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom'
  },
]

const constGroupTableSetting={
  columns:[
    {
      field:'GROUP_NAME',
      title:'名称',
      width:'180'
    },
    {
      field:'REMARK',
      title:'备注',
      width:'180'
    }
  ]
}
</script>


<style scoped>
.const-group{
  width:30%;
}
.const{
  flex:1;
}
</style>