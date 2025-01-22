import HomeView from '@/views/HomeView.vue'
import SnowflakeView from '@/views/SnowflakeView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/snowflake',
      name: 'snowflake',
      component: SnowflakeView,
    },
  ],
})

export default router
