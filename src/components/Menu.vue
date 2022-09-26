<template>
  <el-menu
    router
    :default-active="defaultActive"
    :default-openeds="defaultOpens"
    ref="innerMenu"
    class="el-menu-container"
  >
    <el-sub-menu
      v-for="(menuGroup, menuGroupIndex) in menuList"
      :index="menuGroup.id"
    >
      <template #title>
        <el-icon><setting /></el-icon>
        <span>{{ menuGroup.name }}</span>
      </template>
      <el-menu-item
        v-for="(menuItem, menuItemIndex) in menuGroup.children"
        :index="menuItem.url"
        >常量配置页面</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { Router, useRouter } from 'vue-router'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting
} from '@element-plus/icons-vue'

const router: Router = useRouter()

const menuList = [
  {
    id: '1',
    name: '规则配置',
    children: [
      {
        id: '3',
        url: '/home/config/const',
        name: '常量配置页面'
      }
    ]
  },
  {
    id: '2',
    name: '基础信息',
    children: [
      {
        id: '5',
        url: '/home/about',
        name: '关于'
      }
    ]
  }
]

const defaultOpens = computed(() => {
  return menuList.map((group, index) => {
    return group.id
  })
})

const defaultActive = computed(() => {
  return menuList[0].children[0].url
})

onMounted(() => {
  router.push(defaultActive.value)
})
</script>

<style scoped>
.el-menu-container {
  height: 100%;
}
</style>
