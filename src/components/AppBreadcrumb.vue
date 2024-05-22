<template>
  <CBreadcrumb class="my-0">
    <CBreadcrumbItem
      v-for="item in breadcrumbs"
      :key="item.name"
      :href="item.active ? '' : item.fullPath"
      :active="item.active"
    >
      {{ item.title }}
    </CBreadcrumbItem>
  </CBreadcrumb>
</template>

<script>
import { onMounted, ref } from 'vue'
import router from '@/router'

export default {
  name: 'AppBreadcrumb',
  setup() {
    const breadcrumbs = ref()

    const getBreadcrumbs = () => {
      return router.currentRoute.value.matched.map((route) => {
        const resolvedRoute = router.resolve({
          name: route.name,
          params: route.params,
        })

        const currentPath = router.currentRoute.value.fullPath
        const routePathRegex = new RegExp('^' + route.path.replace(/:id/g, '\\d+') + '$')
        const isActive = routePathRegex.test(currentPath)

        return {
          active: isActive,
          name: route.name,
          title: route.meta.title,
          fullPath: resolvedRoute.fullPath,
        }
      })
    }

    router.afterEach(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    onMounted(() => {
      breadcrumbs.value = getBreadcrumbs()
    })

    return {
      breadcrumbs,
    }
  },
}
</script>
