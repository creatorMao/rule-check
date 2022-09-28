<template>
  <el-dialog
    :title="setting.title"
    :model-value="setting.visible"
    :close-on-click-modal="false"
    :show-close="false"
    :destroy-on-close="true"
    ref="formRef"
  >
    <slot ref="abc"></slot>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed, getCurrentInstance, useSlots } from 'vue'

const slots = useSlots()

const vc = getCurrentInstance() || {}

const props = defineProps({
  setting: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['onCancel', 'onOk'])

const onCancel = () => {
  props.setting.visible = false
  emit('onCancel')
}

const onOk = function () {
  props.setting.visible = false
  emit('onOk')
}
</script>

<style scoped></style>
