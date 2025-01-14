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
      <CModalTitle>{{ $t('modal.delete.title', { entity: $t('entity.project') }) }}</CModalTitle>
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
          <CRow class="align-items-start">
            <div class="d-grid gap-2 d-md-flex justify-content-md-start">
              <CButton color="primary" variant="ghost">{{
                $t('dashboard.project.tableTitle')
              }}</CButton>
              <CButton color="primary" @click="newProject"> Add new</CButton>
            </div>
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CTable hover>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell scope="col" class="w-10">Accession</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-50">Project name</CTableHeaderCell>

                <CTableHeaderCell scope="col" class="w-10">Sample</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-20">Date</CTableHeaderCell>
                <CTableHeaderCell scope="col" class="w-10">Operation</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              <CTableRow v-for="project in projectsList" :key="project.id">
                <CTableHeaderCell scope="row">{{ project.id }}</CTableHeaderCell>
                <CTableDataCell style="word-break: break-all">{{ project.name }}</CTableDataCell>
                <CTableDataCell>{{ project.sample_count }}</CTableDataCell>
                <CTableDataCell>{{ project.date }}</CTableDataCell>
                <CTableDataCell>
                  <router-link :to="{ name: 'projects.edit', params: { id: project.id } }">
                    <CIcon :icon="cilPencil" size="lg" />
                  </router-link>

                  <CIcon :icon="cilTrash" size="lg" @click="openModal(project)" />
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'
import ProjectService from '@/services/project.service'
import { cilTrash, cilPencil } from '@coreui/icons'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export default {
  name: 'ListProject',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()
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

    const newProject = () => {
      router.push({ name: 'projects.create' })
    }

    const deleteProject = () => {
      ProjectService.destroy(projectIdToDelete.value)
        .then(() => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('dashboard.sidebar.project.title'),
              action: t('notification.actions.deleted'),
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
      newProject,
    }
  },
}
</script>
