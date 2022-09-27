<template>
  <div>
    <el-form :model="formData">
      <el-form-item label="常量组名称" label-width="140px">
        <el-input
          v-model="innerFormData.GROUP_NAME"
          autocomplete="off"
          input-style="width:378px"
          maxlength="100"
        />
      </el-form-item>
      <el-form-item label="备注" label-width="140px">
        <el-input
          v-model="innerFormData.REMARK"
          autocomplete="off"
          type="textarea"
          input-style="width:400px;height:100px"
          maxlength="200"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const innerFormData = reactive({
  GROUP_NAME: '',
  REMARK: ''
})

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

defineExpose({
  formData: innerFormData
})
</script>

<style scoped></style>
