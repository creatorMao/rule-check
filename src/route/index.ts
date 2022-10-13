import Home from '../view/Home.vue'
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { 
    path: '/', 
    namr:'home',
    component: Home
  },
  { 
    path: '/home', 
    namr:'home',
    component: Home
  }
]

const router=createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router