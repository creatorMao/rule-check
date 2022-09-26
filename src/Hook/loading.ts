import { reactive } from 'vue'
import { queryType, deleteType } from '../helper/constHelper'

const setLoadingState:Function=function(this: any, flag:boolean,type:string){
  if(type){
    this.type=type
  }
  this.isLoading=flag
}

const useLodingHook:Function=()=>{
  const loadingConfig:any = reactive({
    type: queryType,
    isLoading: false
  })

  loadingConfig['setLoadingState']=setLoadingState

  return loadingConfig
}

export {
  useLodingHook
}