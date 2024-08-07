<template>
  <CModal :visible="isModalVisible" @close="isModalVisible = false">
    <CModalHeader>
      <CModalTitle>Stop Task</CModalTitle>
    </CModalHeader>
    <CModalBody>Are you sure you want to stop this task?</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="isModalVisible = false">
        {{ $t('modal.delete.button.cancel') }}
      </CButton>
      <CButton color="danger" @click="stopTask">Confirm</CButton>
    </CModalFooter>
  </CModal>
  <div>
    <CRow>
      <CCol :sm="12" :lg="12">
        <CRow>
          <CCol :xs="2">
            <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <div class="text-body-secondary small fw-semibold">Project Id:</div>
              <div class="fs-5">
                <router-link :to="{ name: 'projects.edit', params: { id: projectId.value } }">
                  {{ projectId }}
                </router-link>
              </div>
            </div>
          </CCol>
          <CCol :xs="2">
            <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <div class="text-body-secondary small fw-semibold">Type:</div>
              <div class="fs-5">{{ taskType }}</div>
            </div>
          </CCol>
          <CCol :xs="8">
            <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <div class="text-body-secondary small fw-semibold">Task Id:</div>
              <div class="fs-5">{{ taskId }}</div>
            </div>
          </CCol>
        </CRow>
        <hr class="mt-0" />
        <CRow v-if="!errorStatus">
          <div v-if="loading" class="d-grid col-6 mx-auto" align="center">
            <CAlert color="info">
              <CButton color="danger" variant="outline" class="mb-3" @click="openModal">
                STOP TASK
              </CButton>
              <br />
              <CSpinner color="primary" />
              <br />Updating task status every 10 seconds...
            </CAlert>
          </div>
          <div v-else class="d-grid col-6 mx-auto" align="center">
            <CAlert color="success">
              <CIcon icon="cil-smile" size="xxl" />
              <br />Your task has finished!<br />
              <CButton color="success" variant="outline" class="mb-3" @click="goToProject">
                OPEN PROJECT
              </CButton>
            </CAlert>
          </div>
        </CRow>
        <CRow v-else>
          <div class="d-grid col-6 mx-auto" align="center">
            <CAlert color="danger">
              <CIcon icon="cil-sad" size="xxl" /> <br />{{ getStatusMessage(errorStatus) }}
            </CAlert>
          </div>
        </CRow>
        <CRow>
          <div>
            <CProgress class="my-2">
              <CProgressBar :value="progressValue" :max="maxValue">
                {{ progressValue }}%
              </CProgressBar>
            </CProgress>
            <div class="steps">
              <p v-for="(step, index) in steps" :key="index" align="center">
                <CAvatar
                  :color="index + 1 <= currentStep ? 'primary' : 'secondary'"
                  textColor="white"
                >
                  <CIcon icon="cil-check-alt" size="xl" />
                </CAvatar>
                <br />
                {{ step }}
              </p>
            </div>
            <div class="step-content">
              <slot :name="'step-' + currentStep"></slot>
            </div>
          </div>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { CProgress, CProgressBar } from '@coreui/vue'
import { onMounted, onUnmounted, ref, computed } from 'vue'
import TaskService from '@/services/task.service'

import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'StepProgress',
  components: {
    CProgress,
    CProgressBar,
  },
  props: {
    id: {
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const taskId = props.id
    const maxValue = computed(() => props.steps.length)
    const currentStep = ref(0)
    const errorStatus = ref('')
    const loading = ref(true)
    const progressValue = computed(() => (currentStep.value / maxValue.value) * 100)
    const isModalVisible = ref(false)
    const router = useRouter()
    const projectId = ref('')
    const taskType = ref('')
    const openModal = () => {
      isModalVisible.value = true
    }

    const stopTask = () => {
      currentStep.value = 0
      errorStatus.value = 5
      TaskService.revoke({ task_id: taskId })
        .then(() => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('entity.task'),
              action: t('notification.actions.revoked'),
            }),
          )
        })
        .catch(() => {
          toast.error(t('notification.errorMessage'))
        })
        .finally(() => {
          isModalVisible.value = false
        })
    }

    const fetchTaskStatus = () => {
      TaskService.getTaskStatus(props.id)
        .then((response) => {
          projectId.value = response.project
          taskType.value = response.type_name
          switch (response.status) {
            case 1: // Pending
              currentStep.value = 1
              break
            case 2: // Started
              currentStep.value = 2
              break
            case 3: // Success
              loading.value = false
              currentStep.value = 3
              break
            case 4: // Failure
            case 5: // Revoked
              loading.value = false
              errorStatus.value = response.status
              currentStep.value = 0
              break
          }
        })
        .catch((error) => {
          if (error.status === 404) {
            toast.error(t('notification.errorMessage'))
            router.push({ name: 'projects.index' })
          }
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

      onUnmounted(() => {
        clearInterval(interval)
      })
    })

    const goToProject = () => {
      router.push({ name: 'projects.edit', params: { id: projectId.value } })
    }

    const getStatusMessage = (status) => {
      switch (status) {
        case 4:
          return 'Sorry, Your task has failed!'
        case 5:
          return 'Sorry, Your task was revoked!'
        default:
          return 'Sorry, Your task has encountered an error!'
      }
    }

    return {
      taskId,
      projectId,
      taskType,
      maxValue,
      progressValue,
      loading,
      currentStep,
      errorStatus,
      openModal,
      isModalVisible,
      stopTask,
      goToProject,
      getStatusMessage,
    }
  },
}
</script>

<style>
.steps {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  position: relative;
}

.step-content {
  margin-top: 20px;
}
</style>
