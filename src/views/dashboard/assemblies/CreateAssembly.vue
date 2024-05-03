<template>
  <Toast ref="notification" />
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader><strong> Assembly Upload</strong>{{}} </CCardHeader>
        <CCardBody>
          <CForm
            class="row g-3 needs-validation"
            novalidate
            :validated="validatedForm"
            @submit.prevent="handleSubmit"
          >
            <div>
              <CRow>
                <CCol md="6">
                  <CCard class="border-top-primary mb-3 border-top-3" text-color="primary">
                    <CCardHeader><strong>Assembled Metagenome File</strong></CCardHeader>
                    <CCardImage orientation="top" :src="fastaIcon" />
                    <CCardBody>
                      <CFormInput
                        id="assembly-file"
                        type="file"
                        aria-label="Assembly upload"
                        required
                      />
                      <CFormFeedback invalid>This field is required</CFormFeedback>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
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
import { computed, onMounted, reactive, ref } from 'vue'
import SampleService from '@/services/sample.service'
import ProjectService from '@/services/project.service'

import Toast from '@/components/Toast.vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'CreateSample',
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

    const project = reactive({
      name: '',
      sequencing_read_type: null,
    })

    const isSingleEnd = computed(() => {
      return project.sequencing_read_type == 1 ? true : false
    })

    onMounted(() => {
      ProjectService.getById(props.id)
        .then((response) => {
          project.name = response.name
          project.sequencing_method = String(response.sequencing_method)
          project.sequencing_read_type = String(response.sequencing_read_type)
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
            notification.value.toasts.push({
              color: 'success',
              title: t('notification.title.success'),
              content: t('notification.successfulMessage', {
                entity: t('dashboard.sidebar.project.title'),
                action: t('notification.actions.created'),
              }),
            })
            router.push({ name: 'projects.edit', params: { id: response.id } })
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
      loading,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
      handleSubmit,
      project,
      isSingleEnd,
    }
  },
}
</script>
