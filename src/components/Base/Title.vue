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
  height: 50px;
  padding: 0 10px;
  line-height: 50px;
  font-size: 16px;
  color: #606267;
  font-weight: bold;
  background-color: #f6f6f6;
  border-bottom: 1px solid #e8e8e8;
}
</style>