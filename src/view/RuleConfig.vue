<template>
  <div class="const-container full-fill flex-row">
    <div class="box left height-full">
      <Rule></Rule>
    </div>
    <div class="right height-full">
      <RuleEdit></RuleEdit>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Rule from '../components/Config/Rule/Rule.vue'
import RuleEdit from '../components/Config/Rule/RuleEdit.vue'
import { ref } from 'vue'
</script>

<style scoped>
.left {
  width: 25%;
  min-width: 200px;
}
.right {
  flex: 1;
  min-width: 500px;
}
</style>
