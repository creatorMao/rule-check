<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
      <ReqParamGroup @rowClick="reqParamRowClick"></ReqParamGroup>
    </div>
    <div class="const height-full">
      <ReqParam :groupId="groupId" :groupName="groupName"></ReqParam>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ReqParamGroup from '../components/Config/ReqParamGroup/ReqParamGroup.vue'
import ReqParam from '../components/Config/ReqParam/ReqParam.vue'

const groupId = ref('')
const groupName = ref('')

const reqParamRowClick = (row: any, column: any, event: any) => {
  groupId.value = row.ID
  groupName.value = row.GROUP_NAME
}
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
