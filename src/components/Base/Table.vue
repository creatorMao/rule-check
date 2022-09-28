<template>
  <div class="table-container full-fill flex-column flex-space-between">
    <Title :title="tableTitle"> </Title>
    <div
      class="table-content"
      v-loading="loadingConfig.isLoading"
      :element-loading-text="loadingConfig.text"
    >
      <div class="full-fill flex-column">
        <div
          class="table-button flex-row-cneter box-bottom"
          v-if="(tableSetting.buttons || []).length > 0"
        >
          <el-button
            v-for="(item, index) in tableSetting.buttons"
            :type="item.type || 'primary'"
            @click="buttonClickPreDispatch($refs.innerTable, item, index)"
          >
            {{ item.title }}
          </el-button>
        </div>
        <div class="flex-column flex-fill">
          <div class="table flex-fill">
            <el-table
              :data="innerTableData"
              style="width: 100%; height: 100%"
              ref="innerTable"
              @row-click="rowClick"
            >
              <el-table-column
                :fixed="true"
                align="center"
                :v-if="!serialNumberColumnConfig.hide"
                :prop="serialNumberColumnConfig.field"
                :label="serialNumberColumnConfig.title"
                :width="serialNumberColumnConfig.width"
                class-name="serial-number-column"
              />
              <el-table-column
                type="selection"
                width="40"
                v-if="tableSetting.checkBox"
                align="center"
                class-name="button-column"
              />
              <el-table-column
                label="操作"
                width="60px"
                header-align="center"
                align="center"
                class-name="button-column"
              >
                <template #default="scope">
                  <el-button
                    v-for="item in tableSetting.editColumnButtons"
                    size="small"
                    @click.stop="item.onClick(scope.$index, scope.row)"
                    >{{ item.title }}</el-button
                  >
                </template>
              </el-table-column>
              <el-table-column
                v-for="item in tableSetting.columns"
                :type="item.type"
                :prop="item.field"
                :label="item.title"
                :width="item.width"
                :align="item.align || 'center'"
                header-align="center"
                :formatter="item.formatter"
                :show-overflow-tooltip="true"
              />
            </el-table>
          </div>
          <div
            v-if="tableSetting.pagination.hide != true"
            class="flex-row pagination"
          >
            <el-pagination
              v-model:currentPage="currentPage"
              v-model:page-size="pageSize"
              :page-sizes="[5, 10, 30, 100]"
              :layout="
                tableSetting.pagination.layout === 'thin'
                  ? 'prev, jumper, next,total'
                  : tableSetting.pagination.layout ||
                    'sizes, prev, jumper, next, total'
              "
              :total="total"
              :background="true"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <DeleteDialog
    :setting="deleteDialogSetting"
    @onCancel="onDeleteDialogCancel"
    @onOk="onDeleteDialogOk(deleteOk, $refs.innerTable)"
  >
  </DeleteDialog>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, getCurrentInstance } from 'vue'
import Title from '../Base/Title.vue'
import DeleteDialog from '../Base/Dialog/DeleteDialog.vue'
import {
  useDeleteDialogHook,
  deleteDialogCheck
} from '../../hook/Dialog/deleteDialog'

const props = defineProps({
  loadingConfig: {
    type: Object,
    required: true
  },
  sortNumber: Boolean,
  tableTitle: String,
  tableData: {
    type: Object,
    required: true
  },
  tableSetting: {
    type: Object,
    required: true
  }
})

const currentPage = ref(1)
const pageSize = ref(30)

watch(currentPage, (newValue, oldValue) => {
  const event = props.tableSetting.pagination.handleChange
  if (event) {
    event(newValue, pageSize.value)
  }
})

watch(pageSize, (newValue, oldValue) => {
  const event = props.tableSetting.pagination.handleChange
  if (event) {
    event(currentPage.value, newValue)
  }
})

const serialNumberColumnConfig: any = computed(() => {
  const config = props.tableSetting.serialNumberColumnConfig
  if (config) {
    return {
      ...config
    }
  }
  return {
    hide: false,
    field: 'RN',
    title: '',
    width: 40
  }
})

const innerTableData = computed(() => {
  return props.tableData.map((item: any, index: number) => {
    if (!serialNumberColumnConfig.hide) {
      item['RN'] = index + 1 + (currentPage.value - 1) * pageSize.value
    }
    return item
  })
})

const total = computed(() => {
  const totalField = props.tableSetting.pagination.totalField || 'ROWS_TOTAL'
  const total = props.tableData.length > 0 ? props.tableData[0][totalField] : 0
  return total || 0
})

onMounted(() => {
  if (props.tableSetting.initDataimmediately) {
    props.tableSetting.pagination.handleChange(
      currentPage.value,
      pageSize.value
    )
  }
})

const rowClick = (row: any, column: any, event: any) => {
  const rowClick = props.tableSetting.events.rowClick
  if (rowClick) {
    rowClick(row, column, event)
  }
}

const {
  setting: deleteDialogSetting,
  onDeleteDialogCancel,
  onDeleteDialogOk
} = useDeleteDialogHook()

let deleteOk = function (tableRef: any, closeDialog: Function) {
  let button = props.tableSetting.buttons[currentClickButtonIndex]
  button.onOk && button.onOk(tableRef, tableRef.getSelectionRows(), closeDialog)
}

let currentClickButtonIndex = 0
const buttonClickPreDispatch = (
  tableRef: any,
  buttonConfig: any,
  index: number
) => {
  currentClickButtonIndex = index
  switch (buttonConfig.bizType) {
    //删除
    case 'delete':
      deleteDialogCheck(tableRef.getSelectionRows(), deleteDialogSetting)
      break
    //弹窗
    case 'open':
      deleteDialogCheck(tableRef.getSelectionRows(), deleteDialogSetting)
      break
    //普通
    default:
      buttonConfig.onClick && buttonConfig.onClick(tableRef)
      break
  }
}

const editColumnButtonOnClick = (e: any, callBack: Function) => {
  callBack(e, e)
}
</script>

<style scoped>
.table-content {
  height: 1px;
  flex: 1;
}
.table-button {
  box-sizing: border-box;
  height: 50px;
  padding: 0 10px;
}
.pagination {
  justify-content: end;
}
.table {
  overflow: auto;
}
</style>
