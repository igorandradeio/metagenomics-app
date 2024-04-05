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
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>

<script>
import { useUserStore } from '@/stores/modules/users'

export default {
  name: 'AppHeaderDropdownAccnt',
  setup() {
    const userStore = useUserStore()

    return {
      userStore,
      itemsCount: 42,
    }
  },
}
</script>
