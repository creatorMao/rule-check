<template>
  <div class="container">
    <div class="side">
      <Menu></Menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Menu.vue'
</script>

<style>
#app{
  width:100%;
  height:100%;
  position: fixed;
}
.container{
  height: 100%;
}
.side{
  width:15vw;
  min-width:200px;
  height:100%;
}
</style>