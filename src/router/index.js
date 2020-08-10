import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/components/Home'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/shop/1A',
    name: '1A',
    component: () => import('../views/components/1A'),
    meta: {
      title: '1A门店管理'
    }
  },
  {
    path: '/shop/1B',
    name: '1B',
    component: () => import('../views/components/1A'),
    meta: {
      title: '1B门店管理'
    }
  },
  {
    path: '/shop/1C',
    name: '1C',
    component: () => import('../views/components/1A'),
    meta: {
      title: '1C门店管理'
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
