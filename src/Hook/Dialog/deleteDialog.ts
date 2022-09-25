import { ref } from 'vue';
import { ElMessage } from 'element-plus'

const getDeleteFlag=(list:Array<any>)=>{
  return list.length>0
}

const deleteDialogCheck=(list:Array<any>,state:any)=>{
  const flag=getDeleteFlag(list);
  if(flag){
    state.value=true
  }
  else{
    ElMessage({
      showClose: true,
      message: '请至少选择一行！',
      type: 'warning',
    })
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