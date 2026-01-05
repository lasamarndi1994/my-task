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
      component: () => import('@/layouts/default.vue'),
      children: [
        {
          path: '',
          name: 'Dashboard',
          component: () => import('@/pages/index.vue'),
        },
        {
          path: 'backlog',
          name: 'Backlog',
          component: () => import('@/pages/backlog.vue'),
        },
        {
          path: 'board',
          name: 'Board',
          component: () => import('@/pages/board.vue'),
        },
        {
          path: 'list',
          name: 'List',
          component: () => import('@/pages/list.vue'),
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/pages/reports.vue'),
        },
        {
          path: 'roadmap',
          name: 'Roadmap',
          component: () => import('@/pages/roadmap.vue'),
        },
      ],
    },
  ],
})

export default router
