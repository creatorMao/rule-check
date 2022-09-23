import Home from '../view/Home.vue'
import Const from '../components/Setting/Const.vue'
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { path: '/', component: Home },
  { path: '/config/Const', component: Const }
]

const router=createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router