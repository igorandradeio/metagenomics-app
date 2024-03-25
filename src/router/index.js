import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import SiteLayout from '@/layouts/SiteLayout.vue'
import Login from '@/views/pages/Login.vue'
import Register from '@/views/pages/Register.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: SiteLayout,
    redirect: '/',
    children: [
      {
        path: '/',
        name: 'Homepage',
        component: () =>import('@/views/pages/site/Homepage.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'signup',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardLayout,
    redirect: '/dashboard',
    children: [
      {
        path: '/dashboard',
        name: 'Dashboard_Home',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/theme',
        name: 'Theme',
        redirect: '/theme/typography',
      },
      {
        path: '/theme/colors',
        name: 'Colors',
        component: () => import('@/views/theme/Colors.vue'),
      },
      {
        path: '/theme/typography',
        name: 'Typography',
        component: () => import('@/views/theme/Typography.vue'),
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
