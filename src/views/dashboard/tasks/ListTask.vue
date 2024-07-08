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
      <CModalTitle>{{ $t('modal.stop.title', { entity: $t('entity.task') }) }}</CModalTitle>
    </CModalHeader>
    <CModalBody>{{ $t('modal.stop.text', { entity: $t('entity.task') }) }}</CModalBody>
    <CModalFooter>
      <CButton
        color="secondary"
        @click="
          () => {
            isModalVisible = false
          }
        "
      >
        {{ $t('modal.stop.button.cancel') }}
      </CButton>
      <CButton color="danger" @click="stopTask()">{{ $t('modal.stop.button.confirm') }}</CButton>
    </CModalFooter>
  </CModal>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>Task</strong>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" class="w-10">project</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-50">ID</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-10">type</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-10">status</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-10">Created</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-10">Last update</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="task in taskList" :key="task.id">
                <CTableDataCell>
                  <router-link :to="{ name: 'projects.edit', params: { id: task.project } }">
                    <CIcon :icon="cilFolder" size="lg" />
                  </router-link>
                </CTableDataCell>
                <CTableHeaderCell scope="row">{{ task.task_id }}</CTableHeaderCell>
                <CTableHeaderCell scope="row">{{ task.type_name }}</CTableHeaderCell>
                <CTableDataCell style="word-break: break-all">
                  <CButton :color="getButtonColor(task.status)" disabled>
                    <CSpinner v-if="task.status == 1" as="span" size="sm" aria-hidden="true" />
                    {{ task.status_name }}
                  </CButton>
                  <CButton
                    :id="task.id"
                    v-if="task.status == 1"
                    color="danger"
                    @click="openModal(task)"
                  >
                    Stop
                  </CButton>
                </CTableDataCell>
                <CTableDataCell>{{ task.created_at }}</CTableDataCell>
                <CTableDataCell>{{ task.updated_at }}</CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
          <CPagination align="end">
            <CPaginationItem aria-label="Previous" disabled>
              <span aria-hidden="true">&laquo;</span>
            </CPaginationItem>
            <CPaginationItem active>1</CPaginationItem>
            <CPaginationItem>2</CPaginationItem>
            <CPaginationItem>3</CPaginationItem>
            <CPaginationItem aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </CPaginationItem>
          </CPagination>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, ref, computed } from 'vue'
import TaskService from '@/services/task.service'
import { cilTrash, cilFolder } from '@coreui/icons'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export default {
  name: 'ListTask',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()
    const notification = ref()
    const taskList = ref('')
    const isModalVisible = ref(false)
    const taskIdToStop = ref('')

    onMounted(() => {
      TaskService.getTasks()
        .then((response) => {
          taskList.value = response
        })
        .catch((error) => error)
    })

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

    const updateTaskStatus = (taskId) => {
      const task = taskList.value.find((t) => t.task_id === taskId)
      if (task) {
        task.status = 4
        task.status_name = t('task.status.canceled')
      }
    }

    const openModal = (task) => {
      isModalVisible.value = true
      taskIdToStop.value = task.task_id
    }

    const getButtonColor = (status) => {
      switch (status) {
        case 1:
          return 'primary' // Pending
        case 2:
          return 'success' // Success
        case 3:
          return 'danger' // Failure
        case 4:
          return 'secondary' // Canceled
        default:
          return 'primary'
      }
    }

    return {
      taskList,
      cilTrash,
      cilFolder,
      stopTask,
      openModal,
      isModalVisible,
      notification,
      getButtonColor,
    }
  },
}
</script>
