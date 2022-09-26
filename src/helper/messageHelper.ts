import { ElMessage } from 'element-plus'
import { successConst, queryType, deleteType } from './constHelper'

const defaultConfig={
  showClose: true,
  duration:1000
}

const createMessage=function(config:any){
  ElMessage({
    ...defaultConfig,
    ...config
  })
}

const createDeleteSuccessMessage=(message:String='')=>{
  createMessage({
    message: message||successConst[`${deleteType}`],
    type: 'success'
  })
}

const createWarningMessage=(message:String)=>{
  createMessage({
    message: message,
    type: 'warning'
  })
}

export {
  createDeleteSuccessMessage,
  createWarningMessage,
  createMessage
}