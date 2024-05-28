<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle color="primary">{{ userStore.fullName }}</CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2 rounded-top"
      >
        Account
      </CDropdownHeader>
      <CDropdownItem @click="goToProfile"> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="logout">
        <CIcon icon="cil-lock-locked" />
        <span v-if="loading"> Logging out... </span>
        <span v-else> Logout </span>
      </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { useUserStore } from '@/stores/users'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    const userStore = useUserStore()
    const router = useRouter()
    const loading = ref(false)

    const goToProfile = () => {
      router.push({ name: 'users.profile' })
    }

    const logout = () => {
      loading.value = true

      userStore
        .logout()
        .then(() => router.push({ name: 'login' }))
        .catch(() => {
          router.push({ name: 'login' })
        })
        .finally(() => (loading.value = false))
    }
    return {
      logout,
      loading,
      userStore,
      goToProfile,
    }
  },
}
</script>
