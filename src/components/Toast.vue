<template>
  <CToaster class="p-3" placement="top-end">
    <CToast
      :color="toast.color"
      class="text-white align-items-center"
      v-for="(toast, index) in toasts"
      visible
      :key="index"
    >
      <CToastHeader closeButton>
        <span class="me-auto fw-bold">{{ toast.title }}</span>
      </CToastHeader>
      <CToastBody>
        {{ toast.content }}
      </CToastBody>
    </CToast>
  </CToaster>
</template>

<script setup>
import { ref, defineExpose } from 'vue'

const toasts = ref([])

defineExpose({
  toasts,
})
</script>
