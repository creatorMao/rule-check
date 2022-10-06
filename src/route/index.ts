import Home from '../view/Home.vue'
import ConstConfig from '../view/ConstConfig.vue'
import ReqParamConfig from '../view/ReqParamConfig.vue'
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
        component: ConstConfig,
      },
      { 
        path: 'config/reqParam', 
        component: ReqParamConfig,
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
    component: ConstConfig 
  }
]

const router=createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router