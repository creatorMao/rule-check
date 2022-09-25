<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full"> 
      <Table 
        tableTitle="常量组" 
        :isLoading="groupTableIsLoading"
        :tableData="constGroupTableData" 
        :tableSetting="constGroupTableSetting">
      </Table>
    </div>
    <div class="const height-full">
      <Table 
        tableTitle="常量" 
        :isLoading="constIsLoading"
        :tableData="constTableData" 
        :tableSetting="constTableSetting">
      </Table>
    </div>
  </div>
  
</template>

<script lang="ts" setup>
import { ref,reactive,getCurrentInstance,onMounted } from 'vue';
import Table from '../Base/Table.vue'
const {proxy}=getCurrentInstance() as any

//常量组
const constGroupTableData:any = reactive([]);
const groupTableIsLoading=ref(false)
const getConstGroupList=(pageIndex:Number,pageSize:Number)=>{
  groupTableIsLoading.value=true;
  proxy.$http.request("/config/constGroup/get",'post',{
    pageIndex,
    pageSize
  })
  .then((res:any)=>{
    const {data}=res;
    constGroupTableData.length=0
    constGroupTableData.push(...data);
    groupTableIsLoading.value=false
  });
}

const constGroupTableSetting={
  columns:[
    {
      type:'selection'
    },
    {
      field:'GROUP_NAME',
      title:'名称',
      width:'190',
      align:'left',
      RN:'1'
    },
    {
      field:'REMARK',
      title:'备注',
      width:'190',
      align:'left',
      RN:'1'
    }
  ],
  initDataimmediately:true,
  buttons:[
    {
      title:'新增',
      onClick:(e:any)=>{
        console.log(e);
      }
    },
    {
      type:'danger',
      bizType:'delete',
      title:'删除',
      onOk:(e:any)=>{
        console.log(e.getSelectionRows());
        // proxy.$http.request("/config/constGroup/delete",'post',{
        //   idList:JSON.stringify([])
        // })
        // .then((res:any)=>{
        //   getConstGroupList(1,30);
        // });
      }
    }
  ],
  events:{
    rowClick:function(row:any, column:any, event:any){
      console.log(row, column, event);
    }
  },
  pagination:{
    layout:"thin",
    handleChange:function(pageIndex:Number,pageSize:Number){
      getConstGroupList(pageIndex,pageSize);
    }
  }
}

//常量
const constTableData:any = reactive([])
const constIsLoading=ref(false)
const constTableSetting={
  columns:[
    {
      type:'selection'
    },
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
  buttons:[
    {
      title:'新增',
      onClick:(e:any)=>{
        console.log(e);
      }
    },
    {
      type:'danger',
      title:'删除',
      bizType:'delete',
      onOk:(e:any,selectedRows:Array<any>)=>{
        console.log(selectedRows);
      }
    }
  ],
  initDataimmediately:true,
  pagination:{
    handleChange:(pageIndex:Number,pageSize:Number)=>{
      constIsLoading.value=false;
      constTableData.push({
        GROUP_NAME: '2016-05-03',
        REMARK: 'Tom'
      });
      constIsLoading.value=false;
    }
  }
}
</script>


<style scoped>
.const-group{
  width:40%;
  min-width:400px;
}
.const{
  flex:1;
  min-width:500px
}
</style>