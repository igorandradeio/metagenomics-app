<template>
  <Toast ref="notification" color="primary" title="Success!" content="This is a success message" />
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
                v-model="form.name"
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
                :update="form.sequencing_method"
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
                :update="form.sequencing_read_type"
                required
              >
              </CFormSelect>
              <CFormFeedback invalid> Please, select an option. </CFormFeedback>
            </CCol>
            <CCol :xs="12">
              <CButton color="primary" type="submit">
                <span v-if="loading">
                  <CSpinner component="span" size="sm" aria-hidden="true" />
                  Submit
                </span>
                <span v-else>Submit</span>
              </CButton>
            </CCol>
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
import Toast from '@/components/Toast.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'CreateProject',
  components: {
    Toast,
  },
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const notification = ref()
    const validatedForm = ref(false)
    const sequencingMethodOptions = ref([])
    const sequencingReadTypeOptions = ref([])
    const loading = ref(false)
    const router = useRouter()

    const form = reactive({
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
          name: form.name.value,
          sequencing_method: form.sequencing_method.value,
          sequencing_read_type: form.sequencing_read_type.value,
        })
          .then(() => {
            notification.value.toasts.push({
              color: 'success',
              title: t('notification.title.success'),
              content: t('notification.successfulMessage', {
                entity: t('dashboard.sidebar.project.title'),
                action: t('notification.actions.deleted'),
              }),
            })
            //router.push({ name: 'dashboard.home' })
          })
          .catch(() => {
            notification.value.toasts.push({
              color: 'danger',
              title: t('notification.title.error'),
              content: t('notification.errorMessage'),
            })
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
      form,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
    }
  },
}
</script>
