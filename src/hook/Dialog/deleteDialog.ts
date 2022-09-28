import { reactive } from 'vue';
import {createWarningMessage} from '../../helper/messageHelper'

const getDeleteFlag=(list:Array<any>)=>{
  return list.length>0
}

const deleteDialogCheck=(list:Array<any>,state:any)=>{
  const flag=getDeleteFlag(list);
  if(flag){
    state.visible=true
  }
  else{
    createWarningMessage('请至少选择一行！')
  }
}

const useDeleteDialogHook:Function=()=>{
  const setting=reactive({
    visible:false
  })

  const onDeleteDialogOk=(callBack:Function,param:any)=>{
    if(callBack){
      callBack(param,()=>{
        setting.visible=false
      });
    }
  }
  
  const onDeleteDialogCancel=()=>{
    setting.visible=false
  }

  return {
    setting,
    onDeleteDialogOk,
    onDeleteDialogCancel
  }
}

export  {
  deleteDialogCheck,
  useDeleteDialogHook
}