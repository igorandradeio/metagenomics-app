<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> Create new <strong>Project</strong> </CCardHeader>
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
                feedbackInvalid="This field is required"
                name="name"
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
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import ProjectService from '@/services/project.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'

export default {
  name: 'CreateProject',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()

    const defaultOptionValue = { label: 'Choose', value: '', disabled: true, selected: true }
    const notification = ref()
    const validatedForm = ref(false)
    const sequencingMethodOptions = ref([defaultOptionValue])
    const sequencingReadTypeOptions = ref([defaultOptionValue])
    const loading = ref(false)

    const formData = reactive({
      name: '',
      sequencing_method: null,
      sequencing_read_type: null,
    })

    onMounted(() => {
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

    const handleSubmit = (event) => {
      const form = event.currentTarget
      validatedForm.value = true
      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loading.value = true

        ProjectService.create({
          name: formData.name,
          sequencing_method: formData.sequencing_method,
          sequencing_read_type: formData.sequencing_read_type,
        })
          .then((response) => {
            toast.success(
              t('notification.successfulMessage', {
                entity: t('dashboard.sidebar.project.title'),
                action: t('notification.actions.created'),
              }),
            )
            router.push({ name: 'projects.edit', params: { id: response.id } })
          })
          .catch(() => {
            toast.error(t('notification.errorMessage'))
          })
          .finally(() => {
            loading.value = false
          })
      }
    }
    return {
      validatedForm,
      handleSubmit,
      loading,
      formData,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
    }
  },
}
</script>
