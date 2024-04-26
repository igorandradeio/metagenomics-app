<template>
  <Toast ref="notification" />
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> Upload <strong>Sample</strong> </CCardHeader>
        <CCardBody>
          <CForm
            class="row g-3 needs-validation"
            novalidate
            :validated="validatedForm"
            @submit.prevent="handleSubmit"
          >
            <CCol :md="6">
              <CFormInput id="validationTextarea" type="file" aria-label="file example" required />
              <CFormFeedback invalid>Example invalid form file feedback</CFormFeedback>
            </CCol>
            <CCol :md="6">
              <CFormInput id="validationTextarea" type="file" aria-label="file example" required />
              <CFormFeedback invalid>Example invalid form file feedback</CFormFeedback>
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
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Sample List</strong> </CCardHeader>
        <CCardBody>
          <CRow :xs="{ gutter: 4 }">
            <CCol :sm="6" :xl="4" :xxl="3">
              <CWidgetStatsF color="primary" title="Title" value="$1.999,50">
                <template #icon>
                  <CIcon icon="cil-file" size="xl" />
                </template>
                <template #footer>
                  <CLink
                    class="fw-semibold font-xs text-body-secondary"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                  </CLink>
                </template>
              </CWidgetStatsF>
            </CCol>
            <CCol :sm="6" :xl="4" :xxl="3">
              <CWidgetStatsF color="primary" title="Title" value="$1.999,50">
                <template #icon>
                  <CIcon icon="cil-file" size="xl" />
                </template>
                <template #footer>
                  <CLink
                    class="fw-semibold font-xs text-body-secondary"
                    href="https://coreui.io/"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    View more
                    <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                  </CLink>
                </template>
              </CWidgetStatsF>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import ProjectService from '@/services/project.service'
import SampleService from '@/services/sample.service'

import Toast from '@/components/Toast.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'UploadSample',
  components: {
    Toast,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const defaultOptionValue = { label: 'Choose', value: '', disabled: true, selected: true }
    const notification = ref()
    const validatedForm = ref(false)
    const sequencingMethodOptions = ref([defaultOptionValue])
    const sequencingReadTypeOptions = ref([defaultOptionValue])
    const loading = ref(false)
    const router = useRouter()

    const samples = reactive([])

    onMounted(() => {
      SampleService.getSamplesByProject(props.id)
        .then((response) => {
          console.log(response)
        })
        .catch((error) => error)
    })

    const handleSubmit = (event) => {
      //   const form = event.currentTarget
      //   validatedForm.value = true
      //   if (form.checkValidity() === true) {
      //     event.preventDefault()
      //     event.stopPropagation()
      //     loading.value = true
      //     ProjectService.create({
      //       name: formData.name,
      //       sequencing_method: formData.sequencing_method,
      //       sequencing_read_type: formData.sequencing_read_type,
      //     })
      //       .then((response) => {
      //         notification.value.toasts.push({
      //           color: 'success',
      //           title: t('notification.title.success'),
      //           content: t('notification.successfulMessage', {
      //             entity: t('dashboard.sidebar.project.title'),
      //             action: t('notification.actions.created'),
      //           }),
      //         })
      //         router.push({ name: 'projects.edit', params: { id: response.id } })
      //       })
      //       .catch(() => {
      //         notification.value.toasts.push({
      //           color: 'danger',
      //           title: t('notification.title.error'),
      //           content: t('notification.errorMessage'),
      //         })
      //       })
      //       .finally(() => {
      //         loading.value = false
      //       })
      //   }
    }
    return {
      validatedForm,
      loading,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
      handleSubmit,
    }
  },
}
</script>
