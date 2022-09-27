import * as Icons from '@element-plus/icons-vue'

const install=(app:any)=>{
  Object.keys(Icons).forEach((key)=>{
    app.component(key,Icons[key as keyof typeof Icons])
  })
}

export default {
  install
}