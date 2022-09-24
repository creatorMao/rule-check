<template>
  <div class="table-container full-fill flex-column flex-space-between">
    <Title :title="tableTitle">
    </Title>
    <div class="table full-fill flex-fill">
      <el-table 
        :data="innerTableData" 
        style="width: 100%" height="100%"
      >
        <el-table-column 
          :fixed="true"
          align="center"
          :v-if="serialNumberColumnFlag" 
          :prop="tableSetting.serialNumberColumn.field" 
          :label="tableSetting.serialNumberColumn.title||''" 
          :width="tableSetting.serialNumberColumn.width||50" 
        />
        <el-table-column 
          v-for="item in tableSetting.columns" 
          :prop="item.field" 
          :label="item.title" 
          :width="item.width" 
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
        :total="tableData.length>0?tableData[0][(tableSetting.pagination.totalField||'ROWS_TOTAL')]:0"
        :background="true"
      />
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
  }
})

const currentPage=ref(1)
const pageSize=ref(10);

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

const serialNumberColumnFlag= computed(() => {
  return props.tableSetting.serialNumberColumn.hide!=true
})

const innerTableData = computed(() => {
  return props.tableData.map((item:any,index:number)=>{
    if(serialNumberColumnFlag){
      item["RN"]=(index+1)+((currentPage.value-1)*pageSize.value)
    }
    return item;
  })
})

onMounted(()=>{
  if(props.tableSetting.initDataimmediately){
    props.tableSetting.pagination.handleChange(currentPage.value,pageSize.value);
  }
})

</script>

<style scoped>
  .pagination{
    justify-content: end;
  }
  .table{
    overflow: auto;
  }
</style>