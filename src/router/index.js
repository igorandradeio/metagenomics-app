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
        name: 'projects.index',
        component: () => import('@/views/dashboard/projects/ListProject.vue'),
      },
      {
        path: '/project/new',
        name: 'projects.create',
        component: () => import('@/views/dashboard/projects/CreateProject.vue'),
      },
      {
        path: '/project/:id/',
        name: 'projects.edit',
        component: () => import('@/views/dashboard/projects/EditProject.vue'),
        props: true,
      },
      {
        path: '/project/:id/upload-samples',
        name: 'samples.create',
        component: () => import('@/views/dashboard/samples/CreateSample.vue'),
        props: true,
      },
      {
        path: '/project/:id/upload-assembly',
        name: 'assemblies.create',
        component: () => import('@/views/dashboard/assemblies/CreateAssembly.vue'),
        props: true,
      },
      {
        path: '/project/:id/samples',
        name: 'samples.index',
        component: () => import('@/views/dashboard/samples/ListSample.vue'),
        props: true,
      },
      {
        path: '/project/:id/assembly',
        name: 'assembly.index',
        component: () => import('@/views/dashboard/assemblies/ListAssembly.vue'),
        props: true,
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
