import { h, resolveComponent } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import DashboardLayout from '@/layouts/DashboardLayout.vue'
import SiteLayout from '@/layouts/SiteLayout.vue'
import Login from '@/views/pages/auth/Login.vue'
import Register from '@/views/pages/Register.vue'
import ServerUnavailable from '@/views/pages/ServerUnavailable.vue'
import { TOKEN_NAME } from '@/utils/constants'

import { useUserStore } from '@/stores/users'

const routes = [
  {
    path: '/',
    component: SiteLayout,
    children: [
      {
        path: '/',
        name: 'homepage',
        component: () => import('@/views/pages/site/Homepage.vue'),
      },
    ],
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
    component: DashboardLayout,
    children: [
      {
        path: '',
        name: 'dashboard.home',
        component: () => import('@/views/dashboard/Dashboard.vue'),
      },
      {
        path: '/projects',
        name: 'project.index',
        component: () => import('@/views/dashboard/projects/ListProject.vue'),
      },
      {
        path: '/project/new',
        name: 'project.create',
        component: () => import('@/views/dashboard/projects/CreateProject.vue'),
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
      {
        path: '/server-unavailable',
        name: 'server.unavailable',
        component: ServerUnavailable,
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

router.beforeEach(async (to, _, next) => {
  const userStore = useUserStore()
  const routeName = to.name
  const token = localStorage.getItem(TOKEN_NAME)

  if (routeName === 'homepage') {
    next()
    return
  }

  if (token) {
    await userStore
      .getMe()
      .then(() => {
        if (isLoginPage(routeName)) {
          next({ name: 'dashboard.home' })
        } else {
          next()
        }
      })
      .catch((error) => {
        if (!isLoginPage(routeName)) {
          next({ name: 'server.unavailable' })
        } else {
          next()
        }
      })
  } else if (!isLoginPage(routeName)) {
    next({ name: 'login' })
  } else {
    next()
  }
})

function isLoginPage(routeName) {
  return routeName === 'login' || routeName === 'server.unavailable'
}

export default router
