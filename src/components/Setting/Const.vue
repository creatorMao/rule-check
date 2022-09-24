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
import { reactive,getCurrentInstance,onMounted } from 'vue';
import Table from '../Base/Table.vue'
const {proxy}=getCurrentInstance() as any

//常量组
const constGroupTableData:any = reactive([]);

const getConstGroupList=(pageIndex:Number,pageSize:Number)=>{
  proxy.$http.request("/config/constGroup/get",'post',{
    pageIndex,
    pageSize
  })
  .then((res:any)=>{
    const {data}=res;
    constGroupTableData.length=0
    constGroupTableData.push(...data);
  });
}

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
  initDataimmediately:true,
  pagination:{
    layout:"thin",
    handleChange:function(pageIndex:Number,pageSize:Number){
      getConstGroupList(pageIndex,pageSize);
    }
  }
}

//常量
const constTableData = reactive([
  {
    GROUP_NAME: '2016-05-03',
    REMARK: 'Tom',
    RN:'1'
  }
])

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
    handleChange:(pageIndex:Number,pageSize:Number)=>{
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
  min-width:400px;
}
.const{
  flex:1;
  min-width:500px
}
</style>