<template>
  <CSidebar
    class="border-end"
    colorScheme="dark"
    position="fixed"
    :unfoldable="sidebarUnfoldable"
    :visible="sidebarVisible"
    @visible-change="updateSidebarVisible"
  >
    <CSidebarHeader class="border-bottom">
      <RouterLink custom to="/dashboard" v-slot="{ href, navigate }">
        <CSidebarBrand v-bind="$attrs" as="a" :href="href" @click="navigate">
          <CIcon custom-class-name="sidebar-brand-full" :icon="logo" :height="32" />
          <CIcon custom-class-name="sidebar-brand-narrow" :icon="sygnet" :height="32" />
        </CSidebarBrand>
      </RouterLink>
      <CCloseButton class="d-lg-none" dark @click="toggleSidebar" />
    </CSidebarHeader>
    <AppSidebarNav />
    <CSidebarFooter class="border-top d-none d-lg-flex">
      <CSidebarToggler @click="toggleUnfoldable" />
    </CSidebarFooter>
  </CSidebar>
</template>

<script>
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useDashboardStore } from '/src/stores/index.js'
import { AppSidebarNav } from './AppSidebarNav'
import { logo } from '@/assets/brand/logo'
import { sygnet } from '@/assets/brand/sygnet'
export default {
  name: 'AppSidebar',
  components: {
    AppSidebarNav,
    RouterLink,
  },
  setup() {
    const store = useDashboardStore()

    return {
      logo,
      sygnet,
      sidebarUnfoldable: computed(() => store.sidebarUnfoldable),
      sidebarVisible: computed(() => store.sidebarVisible),
      updateSidebarVisible: (event) => store.updateSidebarVisible(event),
      toggleUnfoldable: () => store.toggleUnfoldable(),
      toggleSidebar: () => store.toggleSidebar(),
    }
  },
}
</script>
