<template>
  <Table
    tableTitle="规则"
    :loadingConfig="loadingConfig"
    :tableData="tableData"
    :tableSetting="tableSetting"
  >
  </Table>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted, watch } from 'vue'
import Table from '../../Base/Table.vue'
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
} from '../../../model/config/reqParamModel'
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

  return getReqParamList(pageIndex, pageSize, '1')
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
  columns: [
    {
      field: 'RULE_NAME',
      title: '规则名称',
      width: '150',
      align: 'left',
      RN: '1'
    },
    {
      field: 'REMARK',
      title: '备注',
      width: '100',
      align: 'left',
      RN: '1'
    }
  ],
  initDataimmediately: true,
  buttons: [
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

const emit = defineEmits(['rowClick'])
</script>

<style scoped></style>
