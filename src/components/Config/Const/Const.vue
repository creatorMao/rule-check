<template>
  <Table
    tableTitle="常量"
    :loadingConfig="loadingConfig"
    :tableData="constTableData"
    :tableSetting="constTableSetting"
  >
  </Table>
  <EditDialog :setting="editDialogSetting" @onOk="editonOk">
    <ConstEdit :formData="editDialogFormData" ref="constEditRef"></ConstEdit>
  </EditDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import Table from '../../Base/Table.vue'
import ConstEdit from './ConstEdit.vue'
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
  addConst,
  deleteConst,
  editConst,
  getConstList,
  getConstDetail
} from '../../../model/config/constModel'
import {
  openAddDialogLoading,
  openDeleteDialogLoading,
  openQueryDialogLoading,
  openUpdateDialogLoading,
  closeLoading
} from '../../../helper/loadingHelper'
const vc = getCurrentInstance() as any

//常量组
const constTableData: any = reactive([])
const loadingConfig = useLodingHook()

const getConstListWrap = (pageIndex: Number, pageSize: Number) => {
  loadingConfig.setLoadingState(true, queryLoadingText)

  return getConstList(pageIndex, pageSize)
    .then((res: any) => {
      const { data } = res
      constTableData.length = 0
      constTableData.push(...data)
    })
    .finally(() => {
      loadingConfig.setLoadingState(false)
    })
}

const constTableSetting = {
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
      field: 'CONST_NAME',
      title: '常量名称',
      width: '190',
      align: 'left',
      RN: '1'
    },
    {
      field: 'CONST_VALUE',
      title: '常量值',
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

        deleteConst(idList)
          .then(() => {
            createDeleteSuccessMessage()
            closeLoading()
            closeDialog()
            return getConstListWrap(1, 30)
          })
          .finally(() => {
            closeLoading
          })
      }
    }
  ],
  events: {
    rowClick: function (row: any, column: any, event: any) {
      console.log(row, column, event)
    }
  },
  pagination: {
    layout: 'thin',
    handleChange: function (pageIndex: Number, pageSize: Number) {
      getConstListWrap(pageIndex, pageSize)
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

const editonOk = async (closeDialog: Function) => {
  const { formCheck, formData } = vc.refs.constEditRef
  const checkResult = await vc.refs.constEditRef.formCheck()

  if (!checkResult) {
    return
  }

  if (formData.ID) {
    openUpdateDialogLoading()
    editConst(formData)
      .then((res: any) => {
        createUpdateSuccessMessage()
        closeDialog()
        return getConstListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  } else {
    openAddDialogLoading()
    addConst(formData)
      .then(() => {
        createAddSuccessMessage()
        closeDialog()
        return getConstListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  }
}
</script>

<style scoped></style>
