<template>
  <div class="const-group-edit">
    <el-form :model="innerFormData" :rules="rules" ref="ruleFormRef">
      <el-form-item label="名称" label-width="140px" prop="PARAM_NAME">
        <el-input
          v-model="innerFormData.PARAM_NAME"
          autocomplete="off"
          input-style="width:378px"
        />
      </el-form-item>
      <el-form-item label="字段" label-width="140px" prop="PARAM_FIELD">
        <el-input
          v-model="innerFormData.PARAM_FIELD"
          autocomplete="off"
          input-style="width:378px"
        />
      </el-form-item>
      <el-form-item label="备注" label-width="140px" prop="REMARK">
        <el-input
          v-model="innerFormData.REMARK"
          autocomplete="off"
          type="textarea"
          input-style="width:400px;height:100px"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, getCurrentInstance } from 'vue'
import { getReqParamDetail } from '../../../api/config/reqParamModel'
import {
  openQueryDialogLoading,
  closeLoading
} from '../../../helper/loadingHelper'
import { requiredRule, max100Rule } from '../../../helper/formRuleHelper'
import type { FormInstance, FormRules } from 'element-plus'

const { proxy }: any = getCurrentInstance()

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
})

const innerFormData = reactive({
  ID: '',
  PARAM_FIELD: '',
  PARAM_NAME: '',
  REMARK: ''
})

onMounted(() => {
  const id = props.formData.ID
  if (id) {
    openQueryDialogLoading()
    getReqParamDetail(id)
      .then((res: any) => {
        const { data } = res
        innerFormData.ID = data[0].ID
        innerFormData.PARAM_FIELD = data[0].PARAM_FIELD
        innerFormData.PARAM_NAME = data[0].PARAM_NAME
        innerFormData.REMARK = data[0].REMARK
      })
      .finally(() => {
        closeLoading()
      })
  }
})

const formCheck = async () => {
  return await proxy.$refs.ruleFormRef.validate((valid: any, fields: any) => {})
}

defineExpose({
  formData: innerFormData,
  formCheck
})

const rules = reactive<FormRules>({
  PARAM_FIELD: [requiredRule, max100Rule],
  PARAM_NAME: [requiredRule, max100Rule],
  REMARK: [max100Rule]
})
</script>

<style scoped></style>
