<template>
  <CModal
    :visible="isModalVisible"
    @close="
      () => {
        isModalVisible = false
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Stop Task</CModalTitle>
    </CModalHeader>
    <CModalBody>Are you sure you want to stop this task ? </CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            isModalVisible = false
          }
        "
      >
        {{ $t('modal.delete.button.cancel') }}
      </CButton>
      <CButton color="danger" @click="stopTask">Confirm</CButton>
    </CModalFooter>
  </CModal>
  <div>
    <CRow>
      <CCol :sm="12" :lg="12">
        <CRow>
          <CCol :xs="12">
            <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <div class="text-body-secondary small fw-semibold">Task Id:</div>
              <div class="fs-5">{{ taskId }}</div>
            </div>
          </CCol>
        </CRow>
        <hr class="mt-0" />
        <CRow v-if="!error">
          <div class="d-grid col-6 mx-auto" align="center">
            <CAlert color="info">
              <br />
              <CButton color="danger" variant="outline" class="mb-3" @click="openModal"
                >STOP TASK</CButton
              >
              <br />

              <CSpinner color="primary" />
              <br />Updating task status every 10 seconds...</CAlert
            >
          </div>
        </CRow>
        <CRow v-else>
          <div class="d-grid col-6 mx-auto" align="center">
            <CAlert color="danger">
              <CIcon icon="cil-sad" size="xxl" /> <br />Sorry, Your task has
              {{ errorStatus }}!</CAlert
            >
          </div>
        </CRow>
        <CRow>
          <div>
            <CProgress class="my-2">
              <CProgressBar :value="progressValue" :max="maxValue"
                >{{ progressValue }}%</CProgressBar
              >
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
import { onMounted, ref, computed } from 'vue'
import TaskService from '@/services/task.service'

import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

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
    const error = ref(false)
    const activeColor = ref('#95a5a6')
    const loading = ref(true)
    const mySteps = computed(() => props.steps)
    const progressValue = computed(() => (currentStep.value / maxValue.value) * 100)
    const isModalVisible = ref(false)

    const openModal = () => {
      isModalVisible.value = true
    }

    const stopTask = () => {
      TaskService.revoke({ task_id: taskIdToStop.value })
        .then(() => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('entity.task'),
              action: t('notification.actions.revoked'),
            }),
          )
          updateTaskStatus(taskIdToStop.value)
        })
        .catch((error) => {
          console.log(error)

          toast.error(t('notification.errorMessage'))
        })
        .finally(() => {
          isModalVisible.value = false
        })
    }

    const fetchTaskStatus = () => {
      TaskService.getTaskStatus(props.id)
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
              errorStatus.value = 'Failed'
              activeColor.value = '#c0392b'
              currentStep.value = 3
              currentStep.value = 0
              error.value = true
              break
            case 5: // Revoked
              loading.value = false
              errorStatus.value = 'Revoked'
              activeColor.value = '#c0392b'
              currentStep.value = 3
              currentStep.value = 0
              error.value = true
              break
          }
        })
        .catch(() => {
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
      taskId,
      maxValue,
      progressValue,
      loading,
      mySteps,
      currentStep,
      errorStatus,
      activeColor,
      error,
      openModal,
      isModalVisible,
      stopTask,
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

.step {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.step.active {
  background-color: #007bff;
  color: white;
}

.step-content {
  margin-top: 20px;
}
</style>
