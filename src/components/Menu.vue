<template>
  <el-menu
    default-active="1-3"	
    :default-openeds="['1','2']"
    class="el-menu-container"
  >
    <el-sub-menu index="1">
      <template #title>
        <el-icon><setting /></el-icon>
        <span>规则配置</span>
      </template>
      <el-menu-item index="1-1">常量配置页面</el-menu-item>
      <el-menu-item index="1-2">参数配置页面</el-menu-item>
      <el-menu-item index="1-3">规则配置</el-menu-item>
    </el-sub-menu>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><icon-menu /></el-icon>
        <span>基础信息</span>
      </template>
      <el-menu-item index="2-1">页面路由信息</el-menu-item>
      <el-menu-item index="2-2">版本信息</el-menu-item>
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
</script>

<style scoped>
.el-menu-container {
  height: 100%;
}
</style>