import { createApp } from 'vue'
import router from './route'
import './style/global-style.css'
import './style/element-plus-modify.css'
import App from './App.vue'
import {http} from './helper/requestHelper'
import icons from './components/icons'

const app=createApp(App)
app.use(router)
app.use(icons)
app.mount('#app')
app.config.globalProperties.$http=http

app.config.errorHandler = (err, instance, info) => {
  const {name,message,stack}=err
  console.log(name);
  console.log(message);
  console.log(stack);
}
