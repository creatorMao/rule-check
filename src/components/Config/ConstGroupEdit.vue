<template>
  <div class="const-group-edit">
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
import { onMounted, reactive } from 'vue'
import { getConstGroupDetail } from '../../model/config/constGroupModel'
import {
  openQueryDialogLoading,
  closeLoading
} from '../../helper/loadingHelper'

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const innerFormData = reactive({
  ID: '',
  GROUP_NAME: '',
  REMARK: ''
})

onMounted(() => {
  const id = props.formData.ID
  if (id) {
    openQueryDialogLoading()
    getConstGroupDetail(id)
      .then((res: any) => {
        const { data } = res
        innerFormData.ID = data[0].ID
        innerFormData.GROUP_NAME = data[0].GROUP_NAME
        innerFormData.REMARK = data[0].REMARK
      })
      .finally(() => {
        closeLoading()
      })
  }
})

defineExpose({
  formData: innerFormData
})
</script>

<style scoped></style>
