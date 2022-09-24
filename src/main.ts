import { createApp } from 'vue'
import router from './route'
import './style/global-style.css'
import './style/element-plus-modify.css'
import App from './App.vue'
import http from './http'

const app=createApp(App)
app.use(router)
app.mount('#app')
app.config.globalProperties.$http=http