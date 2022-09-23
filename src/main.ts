import { createApp } from 'vue'
import router from './route'
import './style/global-style.css'
import './style/element-plus-modify.css'
import App from './App.vue'

createApp(App).use(router).mount('#app')
