<template>
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
        <CCardHeader><strong>Edit Project</strong> </CCardHeader>
        <CCardBody>
          <CForm
            class="row g-3 needs-validation"
            novalidate
            :validated="validatedForm"
            @submit.prevent="handleSubmit"
          >
            <CCol :md="12">
              <CFormLabel for="name">Project name</CFormLabel>
              <CFormInput
                type="text"
                v-model="formData.name"
                maxlength="150"
                feedbackInvalid="Please enter your project name"
                required
              />
            </CCol>
            <CCol :md="3">
              <CFormLabel for="sequencing_method">Sequencing method</CFormLabel>
              <CFormSelect
                id="sequencing_method"
                :options="sequencingMethodOptions"
                v-model="formData.sequencing_method"
                required
              >
              </CFormSelect>
              <CFormFeedback invalid> Please, select an option. </CFormFeedback>
            </CCol>
            <CCol :md="3">
              <CFormLabel for="sequencing_read_type">Sequencing read type</CFormLabel>
              <CFormSelect
                id="sequencing_read_type"
                :options="sequencingReadTypeOptions"
                v-model="formData.sequencing_read_type"
                required
              >
              </CFormSelect>
              <CFormFeedback invalid> Please, select an option. </CFormFeedback>
            </CCol>
            <CRow class="mt-4">
              <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                <CButton color="danger" class="me-md-2" @click="openModal()">{{
                  $t('modal.delete.button.confirm')
                }}</CButton>
                <CButton color="primary" type="submit">
                  <span v-if="loading">
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Submitting
                  </span>
                  <span v-else>Submit</span>
                </CButton>
              </div>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <ListSample :id="projectId" />
  <ListAssembly :id="projectId" />
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import ProjectService from '@/services/project.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import ListSample from '@/views/dashboard/samples/ListSample.vue'
import ListAssembly from '@/views/dashboard/assemblies/ListAssembly.vue'

export default {
  name: 'EditProject',
  components: {
    ListSample,
    ListAssembly,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()
    const defaultOptionValue = { label: 'Choose', value: '', disabled: true, selected: true }
    const validatedForm = ref(false)
    const sequencingMethodOptions = ref([defaultOptionValue])
    const sequencingReadTypeOptions = ref([defaultOptionValue])
    const loading = ref(false)
    const formData = reactive({
      name: '',
      sequencing_method: null,
      sequencing_read_type: null,
    })

    const isModalVisible = ref(false)

    const projectId = props.id

    onMounted(() => {
      ProjectService.getById(props.id)
        .then((response) => {
          formData.name = response.name
          formData.sequencing_method = String(response.sequencing_method)
          formData.sequencing_read_type = String(response.sequencing_read_type)
        })
        .catch((error) => {
          if (error.status === 404) {
            router.push({ name: 'projects.index' })
          }
        })

      ProjectService.getSequencingMethod()
        .then((response) => {
          sequencingMethodOptions.value.push(...response)
        })
        .catch((error) => error)

      ProjectService.getSequencingReadType()
        .then((response) => {
          sequencingReadTypeOptions.value.push(...response)
        })
        .catch((error) => error)
    })

    const deleteProject = () => {
      ProjectService.destroy(projectId)
        .then(() => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('dashboard.sidebar.project.title'),
              action: t('notification.actions.deleted'),
            }),
          )
          router.push({ name: 'projects.index' })
        })
        .catch(() => {
          toast.error(t('notification.errorMessage'))
        })
        .finally(() => {
          isModalVisible.value = false
        })
    }

    const handleSubmit = (event) => {
      const form = event.currentTarget
      validatedForm.value = true
      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loading.value = true

        ProjectService.update(props.id, { ...formData })
          .then(() => {
            toast.success(
              t('notification.successfulMessage', {
                entity: t('dashboard.sidebar.project.title'),
                action: t('notification.actions.updated'),
              }),
            )
          })
          .catch(() => {
            toast.error(t('notification.errorMessage'))
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    const openModal = () => {
      isModalVisible.value = true
    }

    return {
      validatedForm,
      handleSubmit,
      loading,
      formData,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      projectId,
      deleteProject,
      openModal,
      isModalVisible,
    }
  },
}
</script>
