<template>
  <div class="const-container full-fill flex-row">
    <div class="box const-group height-full">
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
    </div>
    <div class="const height-full">
      <Table
        tableTitle="常量"
        :tableData="constTableData"
        :tableSetting="constTableSetting"
      >
      </Table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted } from 'vue'
import Table from '../Base/Table.vue'
import ConstGroupEdit from '../Config/ConstGroupEdit.vue'
import EditDialog from '../Base/Dialog/EditDialog.vue'
import { useLodingHook } from '../../hook/loading'
import {
  addLoadingText,
  deleteLoadingText,
  queryLoadingText,
  updateLoadingText
} from '../../helper/constHelper'
import {
  createUpdateSuccessMessage,
  createDeleteSuccessMessage,
  createAddSuccessMessage
} from '../../helper/messageHelper'
import {
  addConstGroup,
  editConstGroup,
  deleteConstGroup,
  getConstGroupList
} from '../../model/config/constGroupModel'
import {
  openAddDialogLoading,
  openQueryDialogLoading,
  openUpdateDialogLoading,
  closeLoading
} from '../../helper/loadingHelper'
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
      title: '名称',
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
        console.log(e)
        editDialogSetting.visible = true
        editDialogSetting.title = '新增'
        editDialogFormData.ID = ''
      }
    },
    {
      type: 'danger',
      bizType: 'delete',
      title: '删除',
      onOk: (e: any) => {
        loadingConfig.setLoadingState(true, deleteLoadingText)

        const idList = e.getSelectionRows().map((row: any) => {
          return row.ID
        })

        deleteConstGroup(idList)
          .then(() => {
            createDeleteSuccessMessage()
            loadingConfig.setLoadingState(false)
            return getConstGroupListWrap(1, 30)
          })
          .finally(() => {
            loadingConfig.setLoadingState(false)
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

const groupEditonOk = (closeDialog: Function) => {
  const formData = vc.refs.constGroupEditRef.formData
  console.log(formData.ID)
  if (formData.ID) {
    openUpdateDialogLoading()
    editConstGroup(formData)
      .then((res: any) => {
        createUpdateSuccessMessage()
        return getConstGroupListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
        closeDialog()
      })
  } else {
    openAddDialogLoading()
    addConstGroup(formData)
      .then(() => {
        createAddSuccessMessage()
        return getConstGroupListWrap(1, 30)
      })
      .finally(() => {
        closeLoading()
        closeDialog()
      })
  }
}

//常量
const constTableData: any = reactive([])
const constIsLoading = ref(false)
const constTableSetting = {
  columns: [
    {
      type: 'selection'
    },
    {
      field: 'GROUP_NAME',
      title: '名称',
      width: '180'
    },
    {
      field: 'REMARK',
      title: '备注',
      width: '150'
    }
  ],
  buttons: [
    {
      title: '新增',
      onClick: (e: any) => {
        console.log(e)
      }
    },
    {
      type: 'danger',
      title: '删除',
      bizType: 'delete',
      onOk: (e: any, selectedRows: Array<any>) => {
        console.log(selectedRows)
      }
    }
  ],
  initDataimmediately: true,
  pagination: {
    handleChange: (pageIndex: Number, pageSize: Number) => {
      constIsLoading.value = false
      constTableData.push({
        GROUP_NAME: '2016-05-03',
        REMARK: 'Tom'
      })
      constIsLoading.value = false
    }
  }
}
</script>

<style scoped>
.const-group {
  width: 40%;
  min-width: 400px;
}
.const {
  flex: 1;
  min-width: 500px;
}
</style>
