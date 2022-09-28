<template>
  <el-dialog
    :model-value="setting.visible"
    :show-close="false"
    :close-on-click-modal="false"
    title="温馨提示"
    width="30%"
    :append-to-body="true"
  >
    <span>是否要删除？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="danger" @click="onOk">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'

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

const onOk = () => {
  emit('onOk')
}
</script>

<style scoped></style>
