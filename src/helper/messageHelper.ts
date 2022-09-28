import { ElMessage } from 'element-plus'
import { successConst, addType,deleteType,queryType, updateType  } from './constHelper'

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

const createAddSuccessMessage=(message:String='')=>{
  createMessage({
    message: message||successConst[`${addType}`],
    type: 'success'
  })
}

const createDeleteSuccessMessage=(message:String='')=>{
  createMessage({
    message: message||successConst[`${deleteType}`],
    type: 'success'
  })
}

const createUpdateSuccessMessage=(message:String='')=>{
  createMessage({
    message: message||successConst[`${updateType}`],
    type: 'success'
  })
}

const createWarningMessage=(message:String)=>{
  createMessage({
    message: message,
    type: 'warning'
  })
}

const createErrorMessage=(message:String,duration:any=undefined)=>{
  createMessage({
    message: message,
    type: 'error',
    duration
  })
}

export {
  createErrorMessage,
  createAddSuccessMessage,
  createDeleteSuccessMessage,
  createUpdateSuccessMessage,
  createWarningMessage,
  createMessage
}