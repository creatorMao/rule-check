<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
      <ConstGroup @rowClick="groupRowClick"></ConstGroup>
    </div>
    <div class="const height-full">
      <Const
        :constGroupId="constGroupId"
        :constGroupName="constGroupName"
      ></Const>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ConstGroup from '../components/Config/ConstGroup/ConstGroup.vue'
import Const from '../components/Config/Const/Const.vue'
const constGroupId = ref('')
const constGroupName = ref('')

const groupRowClick = (row: any, column: any, event: any) => {
  constGroupId.value = row.ID
  constGroupName.value = row.GROUP_NAME
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
