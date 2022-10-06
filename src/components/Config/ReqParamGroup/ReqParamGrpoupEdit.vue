<template>
  <div class="const-group-edit">
    <el-form :model="innerFormData" :rules="rules" ref="ruleFormRef">
      <el-form-item label="分组名称" label-width="140px" prop="GROUP_NAME">
        <el-input
          v-model="innerFormData.GROUP_NAME"
          autocomplete="off"
          input-style="width:378px"
        />
      </el-form-item>
      <el-form-item label="分组字段" label-width="140px" prop="GROUP_FIELD">
        <el-input
          v-model="innerFormData.GROUP_FIELD"
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
import { getReqParamGroupDetail } from '../../../model/config/reqParamGroupModel'
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
  GROUP_NAME: '',
  GROUP_FIELD: '',
  REMARK: ''
})

onMounted(() => {
  const id = props.formData.ID
  if (id) {
    openQueryDialogLoading()
    getReqParamGroupDetail(id)
      .then((res: any) => {
        const { data } = res
        innerFormData.ID = data[0].ID
        innerFormData.GROUP_NAME = data[0].GROUP_NAME
        innerFormData.GROUP_FIELD = data[0].GROUP_FIELD
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
  GROUP_NAME: [requiredRule, max100Rule],
  GROUP_FIELD: [requiredRule, max100Rule],
  REMARK: [max100Rule]
})
</script>

<style scoped></style>
