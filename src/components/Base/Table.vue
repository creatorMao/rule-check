<template>
  <div class="table-container full-fill">
    <Title :title="tableTitle">
    </Title>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column v-for="item in tableSetting.columns" :prop="item.field" :label="item.title" :width="item.width" />
    </el-table>
  </div>
</template>

<script setup lang="ts">
import Title from '../Base/Title.vue'
const props = defineProps({
  tableTitle: String,
  tableData:Object,
  tableSetting:{
    type:Object,
    required: true
  }
})
</script>

<style scoped>

</style>