<template>
  <div class="container flex">
    <div class="side">
      <Menu></Menu>
    </div>
    <div class="content">
      <Const></Const>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Menu.vue'
import About from '../components/Info/About.vue'
import Const from '../components/Setting/Const.vue'
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
.content{
  flex:1;
  overflow: auto;
}
</style>