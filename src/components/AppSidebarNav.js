import { defineComponent, h, onMounted, ref, resolveComponent } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'

import { CBadge, CSidebarNav, CNavItem, CNavGroup, CNavTitle } from '@coreui/vue'
import nav from '@/_nav.js'

import simplebar from 'simplebar-vue'
import 'simplebar-vue/dist/simplebar.min.css'
import { useI18n } from 'vue-i18n'

const AppSidebarNav = defineComponent({
  name: 'AppSidebarNav',
  components: {
    CNavItem,
    CNavGroup,
    CNavTitle,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const route = useRoute()
    const router = useRouter()

    const firstRender = ref(true)

    const normalizePath = (path) =>
      decodeURI(path)
        .replace(/#.*$/, '')
        .replace(/(index)?\.(html)$/, '')

    const isActiveLink = (route, link) => {
      if (link === undefined) {
        return false
      }

      if (route.hash === link) {
        return true
      }

      const currentPath = normalizePath(route.path)
      const targetPath = normalizePath(link)

      return currentPath === targetPath
    }

    const isActiveItem = (route, item) => {
      const routePath = router.resolve({ name: item.to }).path
      if (isActiveLink(route, routePath)) {
        return true
      }

      if (item.items) {
        return item.items.some((child) => isActiveItem(route, child))
      }

      return false
    }

    onMounted(() => {
      firstRender.value = false
    })

    const renderItem = (item) => {
      if (item.items) {
        return h(
          CNavGroup,
          {
            as: 'div',
            compact: true,
            ...(firstRender.value && {
              visible: item.items.some((child) => isActiveItem(route, child)),
            }),
          },
          {
            togglerContent: () => [
              h(resolveComponent('CIcon'), {
                customClassName: 'nav-icon',
                name: item.icon,
              }),
              t(item.name),
            ],
            default: () => item.items.map((child) => renderItem(child)),
          },
        )
      }
      const routePath = router.resolve({ name: item.to }).path
      return routePath
        ? h(
            RouterLink,
            {
              to: routePath,
              custom: true,
            },
            {
              default: (props) =>
                h(
                  resolveComponent(item.component),
                  {
                    active: props.isActive,
                    as: 'div',
                    href: props.href,
                    onClick: () => props.navigate(),
                  },
                  {
                    default: () => [
                      item.icon
                        ? h(resolveComponent('CIcon'), {
                            customClassName: 'nav-icon',
                            name: item.icon,
                          })
                        : h('span', { class: 'nav-icon' }, h('span', { class: 'nav-icon-bullet' })),
                      t(item.name),
                      item.badge &&
                        h(
                          CBadge,
                          {
                            class: 'ms-auto',
                            color: item.badge.color,
                          },
                          {
                            default: () => item.badge.text,
                          },
                        ),
                    ],
                  },
                ),
            },
          )
        : h(
            resolveComponent(item.component),
            {
              as: 'div',
            },
            {
              default: () => t(item.name),
            },
          )
    }

    return () =>
      h(
        CSidebarNav,
        {
          as: simplebar,
        },
        {
          default: () => nav.map((item) => renderItem(item)),
        },
      )
  },
})
export { AppSidebarNav }
