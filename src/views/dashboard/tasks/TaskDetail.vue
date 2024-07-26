<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Task Detail</strong> </CCardHeader>
        <CCardBody>
          <CButton color="primary" disabled>
            <CSpinner as="span" size="sm" aria-hidden="true" />
            Loading...
          </CButton>
          <p>Your task is currently in progress. Please wait while we check for updates.</p>
          <p v-if="taskStatus">{{ taskStatus }}</p>
          <p>Updating task status every 10 seconds...</p>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import AssemblyService from '@/services/assembly.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export default {
  name: 'Assembler',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const loading = ref(true)
    const taskStatus = ref('')

    const projectId = props.id

    const fetchTaskStatus = () => {
      AssemblyService.getTaskStatus(props.id)
        .then((response) => {
          console.log(response)
          taskStatus.value = response.status_name
        })
        .catch((error) => {
          toast.error(t('notification.errorMessage'))
        })
    }

    onMounted(() => {
      fetchTaskStatus()
      const interval = setInterval(fetchTaskStatus, 10000)
      return () => clearInterval(interval)
    })

    return {
      loading,
      projectId,
      taskStatus,
    }
  },
}
</script>
