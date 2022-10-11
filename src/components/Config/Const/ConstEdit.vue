<template>
  <div class="const-group-edit">
    <el-form :model="innerFormData" :rules="rules" ref="ruleFormRef">
      <el-form-item label="常量名称" label-width="140px" prop="CONST_NAME">
        <el-input
          v-model="innerFormData.CONST_NAME"
          autocomplete="off"
          input-style="width:378px"
        />
      </el-form-item>
      <el-form-item label="常量值" label-width="140px" prop="CONST_VALUE">
        <el-input
          v-model="innerFormData.CONST_VALUE"
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
import { getConstDetail } from '../../../api/config/constModel'
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
  CONST_NAME: '',
  CONST_VALUE: '',
  REMARK: ''
})

onMounted(() => {
  const id = props.formData.ID
  if (id) {
    openQueryDialogLoading()
    getConstDetail(id)
      .then((res: any) => {
        const { data } = res
        innerFormData.ID = data[0].ID
        innerFormData.CONST_NAME = data[0].CONST_NAME
        innerFormData.CONST_VALUE = data[0].CONST_VALUE
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
  CONST_NAME: [requiredRule, max100Rule],
  CONST_VALUE: [requiredRule, max100Rule],
  REMARK: [max100Rule]
})
</script>

<style scoped></style>
