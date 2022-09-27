import Home from '../view/Home.vue'
import Const from '../components/Config/Const.vue'
import About from '../components/Info/About.vue'
import Route from '../components/Info/Route.vue'
import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  { 
    path: '/', 
    component: Home,
  },
  { 
    path: '/home', 
    component: Home,
    children:[
      { 
        path: 'config/const', 
        component: Const,
      },
      { 
        path: 'about', 
        component: About
      },
      { 
        path: 'route', 
        component: Route
      }
    ]
  },
  { 
    path: '/config/Const', 
    component: Const 
  }
]

const router=createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router