import { ref } from 'vue';
import { ElMessage } from 'element-plus'

const getDeleteFlag=(list:Array<any>)=>{
  return list.length>0
}

const preCheck=(list:Array<any>,state:any)=>{
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

  const onOk=(callBack:Function)=>{
    state.value=false
    if(callBack){
      callBack();
    }
  }
  
  const onCancel=()=>{
    state.value=false
  }

  return {
    state,
    onOk,
    onCancel
  }
}

export  {
  preCheck,
  useDeleteDialogHook
}