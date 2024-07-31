<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Task Detail</strong> </CCardHeader>
        <CCardBody>
          <StepProgress :id="projectId" :steps="mySteps" :currentStep="currentStep"></StepProgress>
          <p>{{ currentStep }} {{ statusName }}</p>
          <p v-if="loading">
            <CSpinner as="span" size="sm" aria-hidden="true" /> Updating task status every 10
            seconds...
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, ref, computed } from 'vue'
import AssemblyService from '@/services/task.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import StepProgress from '@/components/StepProgress.vue'

export default {
  name: 'Assembler',
  props: {
    id: {
      required: true,
    },
  },
  components: {
    StepProgress,
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const loading = ref(true)
    const projectId = props.id
    const statusName = ref('Complete task')
    const activeColor = ref('#95a5a6')
    const currentStep = ref(0)

    const mySteps = computed(() => ['Schedule Task', 'Start Execution', statusName.value])

    const fetchTaskStatus = () => {
      AssemblyService.getTaskStatus(props.id)
        .then((response) => {
          console.log(response)
          console.log(response.status)

          switch (response.status) {
            case 1: // Pending
              activeColor.value = '#95a5a6'
              currentStep.value = 1
              break
            case 2: // Started
              activeColor.value = '#2980b9'
              currentStep.value = 2
              break
            case 3: // Success
              loading.value = false
              activeColor.value = '#27ae60'
              currentStep.value = 3
              break
            case 4: // Failure
              loading.value = false
              statusName.value = 'Failure'
              activeColor.value = '#c0392b'
              currentStep.value = 3
              break
            case 5: // Revoked
              loading.value = false
              statusName.value = 'Revoked'
              activeColor.value = '#c0392b'
              currentStep.value = 3
              break
          }
        })
        .catch((error) => {
          toast.error(t('notification.errorMessage'))
        })
    }

    onMounted(() => {
      fetchTaskStatus()
      const interval = setInterval(() => {
        if (loading.value) {
          fetchTaskStatus()
        } else {
          clearInterval(interval)
        }
      }, 10000)
    })

    return {
      loading,
      projectId,
      mySteps,
      currentStep,
      statusName,
      activeColor,
    }
  },
}
</script>
