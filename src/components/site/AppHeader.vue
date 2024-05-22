<template>
  <CHeader position="sticky" :class="headerClassNames">
    <CContainer class="border-bottom px-4" fluid>
      <CNavbarBrand href="/">
        <CImage :src="logo" :height="32" />
      </CNavbarBrand>
      <CHeaderToggler @click="toggleMenu" />

      <CHeaderNav class="ms-auto">
        <CNavItem>
          <CNavLink href="/about">
            <CButton @click="login" color="info" variant="ghost">About</CButton>
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink href="#">
            <CButton @click="login" color="info" variant="outline">Login</CButton>
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
      <CHeaderNav>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
        <CDropdown variant="nav-item" placement="bottom-end">
          <CDropdownToggle :caret="false">
            <CIcon v-if="colorMode === 'dark'" icon="cil-moon" size="lg" />
            <CIcon v-else-if="colorMode === 'light'" icon="cil-sun" size="lg" />
            <CIcon v-else icon="cil-contrast" size="lg" />
          </CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem
              :active="colorMode === 'light'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('light')"
            >
              <CIcon class="me-2" icon="cil-sun" size="lg" /> Light
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'dark'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('dark')"
            >
              <CIcon class="me-2" icon="cil-moon" size="lg" /> Dark
            </CDropdownItem>
            <CDropdownItem
              :active="colorMode === 'auto'"
              class="d-flex align-items-center"
              component="button"
              type="button"
              @click="setColorMode('auto')"
            >
              <CIcon class="me-2" icon="cil-contrast" size="lg" /> Auto
            </CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <li class="nav-item py-1">
          <div class="vr h-100 mx-2 text-body text-opacity-75"></div>
        </li>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import { ref } from 'vue'
import { useColorModes } from '@coreui/vue'
import { useRouter } from 'vue-router'
import logo from '@/assets/brand/logo-colorful.svg'

export default {
  name: 'AppHeader',
  setup() {
    const headerClassNames = ref('mb-4 p-0')
    const { colorMode, setColorMode } = useColorModes('coreui-free-vue-admin-template-theme')
    const visible = ref(false)

    const toggleMenu = () => {
      visible.value = !visible.value
    }

    const router = useRouter()

    const login = () => {
      router.push({ name: 'login' })
    }

    return {
      logo,
      headerClassNames,
      colorMode,
      setColorMode,
      login,
      visible,
      toggleMenu,
    }
  },
}
</script>
