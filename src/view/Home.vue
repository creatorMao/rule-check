<template>
  <div class="container flex">
    <div class="side">
      <Menu :menuList="menuList" :openAll="true"></Menu>
    </div>
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Base/Menu.vue'

const menuList = [
  {
    id: '1',
    name: '规则配置',
    icon: 'Setting',
    children: [
      {
        id: '3',
        url: '/home/config/const',
        name: '常量配置'
      },
      {
        id: '4',
        url: '/home/config/reqParam',
        name: '请求参数配置'
      },
      {
        id: '4',
        url: '/home/config/rule',
        name: '规则配置'
      }
    ]
  },
  {
    id: '2',
    name: '基础信息',
    icon: 'Help',
    children: [
      {
        id: '5',
        url: '/home/route',
        name: '路由信息'
      },
      {
        id: '5',
        url: '/home/about',
        name: '关于'
      }
    ]
  }
]
</script>

<style>
#app {
  width: 100%;
  height: 100%;
  position: fixed;
}
.container {
  height: 100%;
}
.side {
  width: 15vw;
  min-width: 200px;
  height: 100%;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>
