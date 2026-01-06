/**
 * router/index.ts
 *
 * Manual route definitions
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/layouts/blank.vue'),
      children: [
        {
          path: '',
          name: 'Landing',
          component: () => import('@/pages/Landing.vue'),
        },
        {
          path: 'auth/login',
          name: 'Login',
          component: () => import('@/pages/auth/Login.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: 'backlog',
          name: 'Backlog',
          component: () => import('@/pages/Backlog.vue'),
        },
        {
          path: 'board',
          name: 'Board',
          component: () => import('@/pages/Board.vue'),
        },
        {
          path: 'list',
          name: 'List',
          component: () => import('@/pages/List.vue'),
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/pages/Reports.vue'),
        },
        {
          path: 'roadmap',
          name: 'Roadmap',
          component: () => import('@/pages/Roadmap.vue'),
        },
      ],
    },
  ],
})

export default router
