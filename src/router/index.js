import { createRouter, createWebHistory } from 'vue-router'

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
  }
]

// 建立 Router 實例
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
