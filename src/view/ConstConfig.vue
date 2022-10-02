<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
      <ConstGroup></ConstGroup>
    </div>
    <div class="const height-full"></div>
  </div>
</template>

<script lang="ts" setup>
import ConstGroup from '../components/Config/ConstGroup/ConstGroup.vue'
</script>

<style scoped>
.const-group {
  width: 40%;
  min-width: 400px;
}
.const {
  flex: 1;
  min-width: 500px;
}
</style>
