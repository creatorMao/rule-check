<template>
  <div class="const-container full-fill flex-row">
    <div class="const-group border-right"> 
      <Table 
        tableTitle="常量组" 
        :tableData="constGroupTableData" 
        :tableSetting="constGroupTableSetting">
      </Table>
    </div>
    <div class="const">
      <Table 
        tableTitle="常量" 
        :tableData="constTableData" 
        :tableSetting="constTableSetting">
      </Table>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import Table from '../Base/Table.vue'

const constGroupTableData = reactive([
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom',
    RN:'1'
  }
])

const constTableData = reactive([
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom',
    RN:'1'
  }
])

const constGroupTableSetting={
  columns:[
    {
      field:'GROUP_NAME',
      title:'名称',
      width:'180',
      RN:'1'
    },
    {
      field:'REMARK',
      title:'备注',
      width:'180',
      RN:'1'
    }
  ],
  serialNumberColumn:{
    field:'RN'
  },
  pagination:{
    layout:"thin",
    total:8999,
    handleCurrentChange:(e:String)=>{
      console.log(e);
      constGroupTableData.push({
        GROUP_NAME: '2016-05-03',
        REMARK: 'Tom',
        RN:""
      });
    }
  }
}

const constTableSetting={
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
  ],
  serialNumberColumn:{
    field:'RN'
  },
  pagination:{
    total:8999,
    handleCurrentChange:(currentPage:Number,pageSize:Number)=>{
      console.log(currentPage,pageSize);
      constTableData.push({
        GROUP_NAME: '2016-05-03',
        REMARK: 'Tom',
        RN:""
      });
    },
    handleSizeChange:(currentPage:Number,pageSize:Number)=>{
      console.log(currentPage,pageSize);
      constTableData.push({
        GROUP_NAME: '2016-05-03',
        REMARK: 'Tom',
        RN:""
      });
    }
  }
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