import { ref } from 'vue';
import {createWarningMessage} from '../../helper/messageHelper'

const getDeleteFlag=(list:Array<any>)=>{
  return list.length>0
}

const deleteDialogCheck=(list:Array<any>,state:any)=>{
  const flag=getDeleteFlag(list);
  if(flag){
    state.value=true
  }
  else{
    createWarningMessage('请至少选择一行！')
  }
}

const useDeleteDialogHook:Function=()=>{
  const state=ref(false)

  const onDeleteDialogOk=(callBack:Function,param:any)=>{
    state.value=false
    if(callBack){
      callBack(param);
    }
  }
  
  const onDeleteDialogCancel=()=>{
    state.value=false
  }

  return {
    state,
    onDeleteDialogOk,
    onDeleteDialogCancel
  }
}

export  {
  deleteDialogCheck,
  useDeleteDialogHook
}