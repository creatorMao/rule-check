<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
      <ParamGroup></ParamGroup>
    </div>
    <div class="const height-full">
      <Param></Param>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ParamGroup from '../components/Config/ParamGroup/ParamGroup.vue'
import Param from '../components/Config/Param/Param.vue'
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
