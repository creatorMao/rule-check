<template>
  <div class="table-container full-fill flex-column flex-space-between">
    <Title :title="tableTitle">
    </Title>
    <div class="table full-fill flex-fill">
      <el-table 
        :data="tableData" 
        style="width: 100%" height="100%"
      >
        <el-table-column 
          v-if="tableSetting.serialNumberColumn.hide!=true" 
          :prop="tableSetting.serialNumberColumn.field" 
          :label="tableSetting.serialNumberColumn.title||'序号'" 
          :width="tableSetting.serialNumberColumn.width||70" 
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
        :page-sizes="[100, 200, 300, 400]"
        :layout="tableSetting.pagination.layout||'prev, pager, next'"
        :total="tableSetting.pagination.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Title from '../Base/Title.vue'
const props = defineProps({
  sortNumber:Boolean,
  tableTitle: String,
  tableData:Object,
  tableSetting:{
    type:Object,
    required: true
  }
})

const currentPage=ref(1)
const pageSize=ref(30);

const handleSizeChange=(currentPage:Number)=>{
  const event= props.tableSetting.pagination.handleSizeChange;
  if(event){
    event(currentPage,pageSize.value);
  }
}

const handleCurrentChange=(currentPage:Number)=>{
  const event= props.tableSetting.pagination.handleCurrentChange;
  if(event){
    event(currentPage,pageSize.value);
  }
}
</script>

<style scoped>
  .pagination{
    justify-content: end;
  }
  .table{
    overflow: auto;
  }
</style>