<template>
  <div class="container flex">
    <div class="side">
      <Menu
        :menuList="menuList"
        defaultActive="ConstConfig"
        :openAll="true"
        @onClick="onClick"
      ></Menu>
    </div>
    <div class="content">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import Menu from '../components/Base/Menu.vue'
import { ref } from 'vue'

const menuList = [
  {
    id: '1',
    title: '规则配置',
    icon: 'Setting',
    children: [
      {
        id: '3',
        name: 'ConstConfig',
        title: '常量配置'
      },
      {
        id: '4',
        name: 'ReqParamConfig',
        title: '请求参数配置'
      },
      {
        id: '4',
        name: 'RuleConfig',
        title: '规则配置'
      }
    ]
  },
  {
    id: '2',
    icon: 'Help',
    title: '关于',
    children: [
      {
        id: '5',
        name: 'Route',
        title: '路由信息'
      },
      {
        id: '5',
        name: 'About',
        title: '关于'
      }
    ]
  }
]

const currentComponent = ref('ConstConfig')

const onClick = (componentName: string) => {
  currentComponent.value = componentName
}
</script>

<script lang="ts">
import ConstConfig from '../view/ConstConfig.vue'
import ReqParamConfig from '../view/ReqParamConfig.vue'
import RuleConfig from '../view/RuleConfig.vue'
import About from '../components/Info/About.vue'
import Route from '../components/Info/Route.vue'

export default {
  components: {
    ConstConfig,
    ReqParamConfig,
    RuleConfig,
    About,
    Route
  }
}
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
  width: 10vw;
  min-width: 200px;
  height: 100%;
}
.content {
  flex: 1;
  overflow: auto;
}
</style>
