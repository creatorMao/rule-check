<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
      <ReqParamGroup></ReqParamGroup>
    </div>
    <div class="const height-full">
      <ReqParam></ReqParam>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ReqParamGroup from '../components/Config/ReqParamGroup/ReqParamGroup.vue'
import ReqParam from '../components/Config/ReqParam/ReqParam.vue'
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
