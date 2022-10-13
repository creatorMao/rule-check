<template>
  <el-menu
    :default-active="defaultActive"
    :default-openeds="opens"
    ref="innerMenu"
    class="el-menu-container"
  >
    <el-sub-menu
      v-for="(menuGroup, menuGroupIndex) in menuList"
      :index="menuGroup.id"
    >
      <template #title>
        <el-icon>
          <component :is="menuGroup.icon"></component>
        </el-icon>
        <span>{{ menuGroup.title }}</span>
      </template>
      <el-menu-item
        v-for="(menuItem, menuItemIndex) in menuGroup.children"
        :index="menuItem.name"
        @click="onClick(menuItem.name)"
        >{{ menuItem.title }}</el-menu-item
      >
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, getCurrentInstance } from 'vue'
import { Router, useRouter } from 'vue-router'

const router: Router = useRouter()

const props = defineProps({
  menuList: {
    type: Object,
    required: true
  },
  openAll: Boolean,
  defaultOpeneds: Object,
  defaultActive: String
})

const opens = computed(() => {
  if (props.openAll) {
    return props.menuList.map((group: any, index: number) => {
      return group.id
    })
  } else {
    return props.defaultOpeneds
  }
})

const defaultActive = computed(() => {
  if (props.defaultActive) {
    return props.defaultActive
  }
  return props.menuList[0].children[0].name
})

const emit = defineEmits(['onClick'])

const onClick = (componentName: string) => {
  emit('onClick', componentName)
}
</script>

<style scoped>
.el-menu-container {
  height: 100%;
}
</style>
