import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login.vue'),
  },
  {
    path: '/index',
    name: 'index',
    component: () => import('../components/views/index.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home.vue'),
    redirect:'/welcome',
    children:[
      {
        path: '/welcome',  
        component: () => import('../components/Welcome.vue'),
      },
      {
        path: '/users',  
        component: () => import('../components/user/Users.vue'),
      },
      {
        path: '/rights',  
        component: () => import('../components/Power/Rights.vue'),
      },
      {
        path: '/roles',  
        component: () => import('../components/Power/Roles.vue'),
      },
      {
        path: '/reports',  
        component: () => import('../components/report/Report.vue'),
      },
      {
        path: '/goods',  
        component: () => import('../components/goods/goods.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

export default router
