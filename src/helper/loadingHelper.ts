import { ElLoading } from 'element-plus'
import {
  addLoadingText,
  deleteLoadingText,
  queryLoadingText,
  updateLoadingText} from './constHelper'
let loadingInstance:any=undefined

const openDialogLoading=(text:string=queryLoadingText)=>{
  loadingInstance = ElLoading.service({
    text,
    target:'.el-dialog',
    fullscreen:false
  })
}

const openAddDialogLoading=()=>{
  openDialogLoading(addLoadingText);
}

const openDeleteDialogLoading=()=>{
  openDialogLoading(deleteLoadingText);
}

const openQueryDialogLoading=()=>{
  openDialogLoading(queryLoadingText);
}

const openUpdateDialogLoading=()=>{
  openDialogLoading(updateLoadingText);
}

const closeLoading=()=>{
  loadingInstance.close();
}


export {
  openAddDialogLoading,
  openDeleteDialogLoading,
  openQueryDialogLoading,
  openUpdateDialogLoading,
  closeLoading
}