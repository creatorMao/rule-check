<template>
  <div class="title">
    {{title}}
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  title: String
})
</script>

<style scoped>
.title{
  box-sizing: border-box;
  height:40px;
  padding:0 10px;
  line-height: 40px;
  font-size: 16px;
  color:#909399;
  font-weight:bold;
  background-color: #e8e8e8;
  border-left:4px solid #409eff;
}
</style>