<template>
  <div>
    <div class="wrapper d-flex flex-column min-vh-100">
      <AppHeader />
      <div class="body flex-grow-1">
        <CContainer class="px-4" lg>
          <router-view />
        </CContainer>
      </div>
      <AppFooter />
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppFooter from '@/components/AppFooter.vue'
import AppHeader from '@/components/site/AppHeader.vue'

export default {
  name: 'Homepage',
  components: {
    AppFooter,
    AppHeader,
    CContainer,
  },
}
</script>
