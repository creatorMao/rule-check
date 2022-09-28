import { reactive } from 'vue'

const setLoadingState:Function=function(this: any, flag:boolean,text:string){
  if(text){
    this.text=text
  }
  this.isLoading=flag
}

const useLodingHook:Function=()=>{
  const loadingConfig:any = reactive({
    isLoading: false
  })

  loadingConfig['setLoadingState']=setLoadingState

  return loadingConfig
}

export {
  useLodingHook
}