<template>
  <Table
    :tableTitle="groupName || '请求参数'"
    :loadingConfig="loadingConfig"
    :tableData="tableData"
    :tableSetting="tableSetting"
  >
  </Table>
  <EditDialog :setting="editDialogSetting" @onOk="groupEditonOk">
    <ReqParamEdit :formData="editDialogFormData" ref="editRef"></ReqParamEdit>
  </EditDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import Table from '../../Base/Table.vue'
import ReqParamEdit from './ReqParamEdit.vue'
import EditDialog from '../../Base/Dialog/EditDialog.vue'
import { useLodingHook } from '../../../hook/loading'
import {
  addLoadingText,
  deleteLoadingText,
  queryLoadingText,
  updateLoadingText
} from '../../../helper/constHelper'
import {
  createUpdateSuccessMessage,
  createDeleteSuccessMessage,
  createAddSuccessMessage
} from '../../../helper/messageHelper'
import {
  addReqParam,
  deleteReqParam,
  editReqParam,
  getReqParamList
} from '../../../api/config/reqParamModel'
import {
  openAddDialogLoading,
  openDeleteDialogLoading,
  openQueryDialogLoading,
  openUpdateDialogLoading,
  closeLoading
} from '../../../helper/loadingHelper'
const vc = getCurrentInstance() as any

//常量组
const tableData: any = reactive([])
const loadingConfig = useLodingHook()

const getListWrap = (pageIndex: Number, pageSize: Number) => {
  loadingConfig.setLoadingState(true, queryLoadingText)

  return getReqParamList(pageIndex, pageSize, innerGroupId.value)
    .then((res: any) => {
      const { data } = res
      tableData.length = 0
      tableData.push(...data)
    })
    .finally(() => {
      loadingConfig.setLoadingState(false)
    })
}

const tableSetting = {
  checkBox: true,
  editColumnButtons: [
    {
      title: '编辑',
      onClick: function (e: number, row: any) {
        editDialogSetting.visible = true
        editDialogSetting.title = '编辑'
        editDialogFormData.ID = row.ID
      }
    }
  ],
  columns: [
    {
      field: 'PARAM_NAME',
      title: '名称',
      width: '190',
      align: 'left',
      RN: '1'
    },
    {
      field: 'PARAM_FIELD',
      title: '字段',
      width: '190',
      align: 'left',
      RN: '1'
    },
    {
      field: 'REMARK',
      title: '备注',
      width: '150',
      align: 'left',
      RN: '1'
    }
  ],
  buttons: [
    {
      title: '新增',
      onClick: (e: any) => {
        editDialogSetting.visible = true
        editDialogSetting.title = '新增'
        editDialogFormData.ID = ''
      }
    },
    {
      type: 'danger',
      bizType: 'delete',
      title: '删除',
      onOk: (e: any, rows: Object, closeDialog: Function) => {
        openDeleteDialogLoading()

        const idList = e.getSelectionRows().map((row: any) => {
          return row.ID
        })

        deleteReqParam(idList)
          .then(() => {
            createDeleteSuccessMessage()
            closeLoading()
            closeDialog()
            return getListWrap(1, 30)
          })
          .finally(() => {
            closeLoading()
          })
      }
    }
  ],
  events: {
    rowClick: function (row: any, column: any, event: any) {
      emit('rowClick', row, column, event)
    }
  },
  pagination: {
    layout: 'thin',
    handleChange: function (pageIndex: Number, pageSize: Number) {
      getListWrap(pageIndex, pageSize)
    }
  }
}

const props = defineProps({
  groupId: {
    type: String,
    required: true
  },
  groupName: {
    type: String,
    required: true
  }
})

const innerGroupId = ref('')

watch(props, (newProps: any) => {
  if (!props.groupId && !innerGroupId.value) {
    return
  }
  innerGroupId.value = newProps.groupId
  getListWrap(1, 30)
})

const editDialogSetting = reactive({
  visible: false,
  title: ''
})

const editDialogFormData = reactive({
  ID: ''
})

const groupEditonOk = async (closeDialog: Function) => {
  const { formCheck, formData } = vc.refs.editRef
  const checkResult = await formCheck()

  if (!checkResult) {
    return
  }

  formData.GROUP_ID = innerGroupId.value

  if (formData.ID) {
    openUpdateDialogLoading()
    editReqParam(formData)
      .then((res: any) => {
        createUpdateSuccessMessage()
        closeDialog()
        return getListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  } else {
    openAddDialogLoading()
    addReqParam(formData)
      .then(() => {
        createAddSuccessMessage()
        closeDialog()
        return getListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  }
}

const emit = defineEmits(['rowClick'])
</script>

<style scoped></style>
