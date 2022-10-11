<template>
  <Table
    tableTitle="请求参数分组"
    :loadingConfig="loadingConfig"
    :tableData="tableData"
    :tableSetting="tableSetting"
  >
  </Table>
  <EditDialog :setting="editDialogSetting" @onOk="groupEditonOk">
    <ReqParamGrpoupEdit
      :formData="editDialogFormData"
      ref="editRef"
    ></ReqParamGrpoupEdit>
  </EditDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import Table from '../../Base/Table.vue'
import ReqParamGrpoupEdit from './ReqParamGrpoupEdit.vue'
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
  addReqParamGroup,
  deleteReqParamGroup,
  editReqParamGroup,
  getReqParamGroupList
} from '../../../api/config/reqParamGroupModel'
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

  return getReqParamGroupList(pageIndex, pageSize)
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
      field: 'GROUP_NAME',
      title: '分组名称',
      width: '190',
      align: 'left',
      RN: '1'
    },
    {
      field: 'GROUP_FIELD',
      title: '分组字段',
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
  initDataimmediately: true,
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

        deleteReqParamGroup(idList)
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

  if (formData.ID) {
    openUpdateDialogLoading()
    editReqParamGroup(formData)
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
    addReqParamGroup(formData)
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
