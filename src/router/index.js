import { createRouter, createWebHashHistory } from 'vue-router'

// 定義路由
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/weekone',
    component: () => import('@/views/WeekOne.vue')
  },
  {
    path: '/weektwo',
    component: () => import('@/views/WeekTwo.vue')
  },
  {
    path: '/todo',
    name: 'todo',
    component: () => import('@/views/Todo.vue')
  },
  {
    path: '/weekthree',
    name: 'weekthree',
    component: () => import('@/views/Week3View.vue')
  },
  {
    path: '/advanceMission',
    name: 'advanceMission',
    component: () => import('@/views/MissionView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue')
  },
  {
    path: '/login',
    name: 'logib',
    component: () => import('@/views/LoginView.vue')
  }
]

// 建立 Router 實例
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
