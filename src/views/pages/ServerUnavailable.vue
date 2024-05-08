<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <span class="clearfix">
            <h1 class="float-start display-3 me-4">503</h1>
            <h4 class="pt-3">Houston, we have a problem!</h4>
            <p class="text-body-secondary">
              We're not able to contact the server.<br />Please try again.
            </p>
            <p class="text-body-secondary float-start"></p>
          </span>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/users'
import { onMounted } from 'vue'

export default {
  name: 'ServerUnavailable',

  setup() {
    const router = useRouter()
    const userStore = useUserStore()

    onMounted(() => {
      userStore
        .getMe()
        .then(() => {
          return router.push({ name: 'dashboard.home' })
        })
        .catch(() => {})
    })
  },
}
</script>
