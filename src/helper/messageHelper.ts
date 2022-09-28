import { ElMessage } from 'element-plus'
import {  addSuccessText,deleteSuccessText,querySuccessText,updateSuccessText } from './constHelper'

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
    message: addSuccessText,
    type: 'success'
  })
}

const createDeleteSuccessMessage=(message:String='')=>{
  createMessage({
    message: deleteSuccessText,
    type: 'success'
  })
}

const createUpdateSuccessMessage=(message:String='')=>{
  createMessage({
    message: updateSuccessText,
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