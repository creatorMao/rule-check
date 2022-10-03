<template>
  <Table
    tableTitle="常量组"
    :loadingConfig="loadingConfig"
    :tableData="constGroupTableData"
    :tableSetting="constGroupTableSetting"
  >
  </Table>
  <EditDialog :setting="editDialogSetting" @onOk="groupEditonOk">
    <ConstGroupEdit
      :formData="editDialogFormData"
      ref="constGroupEditRef"
    ></ConstGroupEdit>
  </EditDialog>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import Table from '../../Base/Table.vue'
import ConstGroupEdit from './ConstGroupEdit.vue'
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
  addConstGroup,
  editConstGroup,
  deleteConstGroup,
  getConstGroupList
} from '../../../model/config/constGroupModel'
import {
  openAddDialogLoading,
  openDeleteDialogLoading,
  openQueryDialogLoading,
  openUpdateDialogLoading,
  closeLoading
} from '../../../helper/loadingHelper'
const vc = getCurrentInstance() as any

//常量组
const constGroupTableData: any = reactive([])
const loadingConfig = useLodingHook()

const getConstGroupListWrap = (pageIndex: Number, pageSize: Number) => {
  loadingConfig.setLoadingState(true, queryLoadingText)

  return getConstGroupList(pageIndex, pageSize)
    .then((res: any) => {
      const { data } = res
      constGroupTableData.length = 0
      constGroupTableData.push(...data)
    })
    .finally(() => {
      loadingConfig.setLoadingState(false)
    })
}

const constGroupTableSetting = {
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
      title: '常量组名称',
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

        deleteConstGroup(idList)
          .then(() => {
            createDeleteSuccessMessage()
            closeLoading()
            closeDialog()
            return getConstGroupListWrap(1, 30)
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
      getConstGroupListWrap(pageIndex, pageSize)
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
  const { formCheck, formData } = vc.refs.constGroupEditRef
  const checkResult = await vc.refs.constGroupEditRef.formCheck()

  if (!checkResult) {
    return
  }

  if (formData.ID) {
    openUpdateDialogLoading()
    editConstGroup(formData)
      .then((res: any) => {
        createUpdateSuccessMessage()
        closeDialog()
        return getConstGroupListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  } else {
    openAddDialogLoading()
    addConstGroup(formData)
      .then(() => {
        createAddSuccessMessage()
        closeDialog()
        return getConstGroupListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
      })
  }
}

const emit = defineEmits(['rowClick'])
</script>

<style scoped></style>
