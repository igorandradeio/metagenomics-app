<template>
  <Toast ref="notification" color="primary" title="Success!" content="This is a success message" />
  <CModal
    :visible="isModalVisible"
    @close="
      () => {
        isModalVisible = false
      }
    "
    aria-labelledby="LiveDemoExampleLabel"
  >
    <CModalHeader>
      <CModalTitle id="LiveDemoExampleLabel">{{
        $t('modal.delete.title', { entity: $t('entity.project') })
      }}</CModalTitle>
    </CModalHeader>
    <CModalBody>{{ $t('modal.delete.text', { entity: $t('entity.project') }) }}</CModalBody>
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
      <CButton color="danger" @click="deleteProject()">{{
        $t('modal.delete.button.confirm')
      }}</CButton>
    </CModalFooter>
  </CModal>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ $t('dashboard.project.tableTitle') }}</strong>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col">#</CTableHeaderCell>
                <CTableHeaderCell scope="col">Project name</CTableHeaderCell>
                <CTableHeaderCell scope="col">Type</CTableHeaderCell>
                <CTableHeaderCell scope="col">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col">Operation</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="project in projectsList" :key="project.id">
                <CTableHeaderCell scope="row">{{ project.id }}</CTableHeaderCell>
                <CTableDataCell>{{ project.name }}</CTableDataCell>
                <CTableDataCell>{{ project.sequencing_read_type }}</CTableDataCell>
                <CTableDataCell>{{ project.date }}</CTableDataCell>
                <CTableDataCell>
                  <div align="center">
                    <CIcon :icon="cilPencil" size="lg" />
                    <CIcon :icon="cilTrash" size="lg" @click="openModal(project)" />
                  </div>
                </CTableDataCell>
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
import { onMounted, ref } from 'vue'
import ProjectService from '@/services/project.service'
import { cilTrash, cilPencil } from '@coreui/icons'
import Toast from '@/components/Toast.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ListProject',
  components: {
    Toast,
  },

  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const notification = ref()
    const projectsList = ref('')
    const isModalVisible = ref(false)
    const projectIdToDelete = ref('')

    onMounted(() => {
      ProjectService.getProjects()
        .then((response) => {
          projectsList.value = response
        })
        .catch((error) => error)
    })

    const deleteProject = () => {
      ProjectService.destroy(projectIdToDelete.value)
        .then(() => {
          notification.value.toasts.push({
            color: 'success',
            title: t('notification.title.success'),
            content: t('notification.successfulMessage', {
              entity: t('dashboard.sidebar.project.title'),
              action: t('notification.actions.deleted'),
            }),
          })
        })
        .catch(() => {
          notification.value.toasts.push({
            color: 'danger',
            title: t('notification.title.error'),
            content: t('notification.errorMessage'),
          })
        })
        .finally(() => {
          isModalVisible.value = false
        })
    }

    const openModal = (project) => {
      isModalVisible.value = true
      projectIdToDelete.value = project.id
    }

    return {
      projectsList,
      cilTrash,
      cilPencil,
      deleteProject,
      openModal,
      isModalVisible,
      notification,
    }
  },
}
</script>
