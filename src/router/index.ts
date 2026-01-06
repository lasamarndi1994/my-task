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
          component: () => import('@/pages/LandingPage.vue'),
        },
        {
          path: 'auth/login',
          name: 'Login',
          component: () => import('@/pages/auth/LoginPage.vue'),
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
          component: () => import('@/pages/BacklogPage.vue'),
        },
        {
          path: 'board',
          name: 'Board',
          component: () => import('@/pages/BoardPage.vue'),
        },
        {
          path: 'list',
          name: 'List',
          component: () => import('@/pages/TaskListPage.vue'),
        },
        {
          path: 'reports',
          name: 'Reports',
          component: () => import('@/pages/Reports.vue'),
        },
        {
          path: 'roadmap',
          name: 'Roadmap',
          component: () => import('@/pages/RoadmapPage.vue'),
        },
      ],
    },
  ],
})

export default router
