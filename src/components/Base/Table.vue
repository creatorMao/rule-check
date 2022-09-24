<template>
  <div class="table-container full-fill flex-column flex-space-between">
    <Title :title="tableTitle">
    </Title>
    <div class="table-content flex-column" 
         v-loading="isLoading"
         element-loading-text="正在加载，请稍后"
         >
      <div class="table flex-fill">
        <el-table 
          :data="innerTableData" 
          style="width: 100%;height:100%"
        >
          <el-table-column 
            :fixed="true"
            align="center"
            :v-if="!serialNumberColumnConfig.hide" 
            :prop="serialNumberColumnConfig.field||'RN'" 
            :label="serialNumberColumnConfig.title||''" 
            :width="serialNumberColumnConfig.width||50" 
          />
          <el-table-column 
            v-for="item in tableSetting.columns" 
            :prop="item.field" 
            :label="item.title" 
            :width="item.width" 
            :align="item.align"
            header-align="center"
            :show-overflow-tooltip="true"
          />
        </el-table>
      </div>
      <div 
        v-if="tableSetting.pagination.hide!=true" 
        class="flex-row pagination"
        >
        <el-pagination
          v-model:currentPage="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[5, 10, 30, 100]"
          :layout="tableSetting.pagination.layout==='thin'?'prev, jumper, next,total': (tableSetting.pagination.layout||'sizes, prev, jumper, next, total')"
          :total="total"
          :background="true"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref,computed,onMounted,watch } from 'vue';
import Title from '../Base/Title.vue'
const props = defineProps({
  sortNumber:Boolean,
  tableTitle: String,
  tableData: {
    type:Object,
    required: true
  },
  tableSetting:{
    type:Object,
    required: true
  },
  isLoading:Boolean
})

const currentPage=ref(1)
const pageSize=ref(30);

watch(currentPage, (newValue, oldValue) => {
  const event= props.tableSetting.pagination.handleChange;
  if(event){
    event(newValue,pageSize.value);
  }
})

watch(pageSize,(newValue, oldValue)=>{
  const event= props.tableSetting.pagination.handleChange;
  if(event){
    event(currentPage.value,newValue);
  }
})

const serialNumberColumnConfig:any= computed(() => {
  const config=props.tableSetting.serialNumberColumnConfig
  if(config){
    return {
      ...config
    }
  }
  return {
    hide:false,
    field:'RN',
    title:'',
    width:50
  }
})

const innerTableData = computed(() => {
  return props.tableData.map((item:any,index:number)=>{
    if(!serialNumberColumnConfig.hide){
      item["RN"]=(index+1)+((currentPage.value-1)*pageSize.value)
    }
    return item;
  })
})

const total=computed(()=>{
  const totalField=props.tableSetting.pagination.totalField||'ROWS_TOTAL';
  const total= props.tableData.length>0?
  (props.tableData[0][totalField]):0
  return total||0
})

onMounted(()=>{
  if(props.tableSetting.initDataimmediately){
    props.tableSetting.pagination.handleChange(currentPage.value,pageSize.value);
  }
})

</script>

<style scoped>
  .table-content{
    height:calc(100% - 50px)
  }
  .pagination{
    justify-content: end;
  }
  .table{
    overflow: auto;
  }
</style>