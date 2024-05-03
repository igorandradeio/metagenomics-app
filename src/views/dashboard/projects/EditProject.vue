<template>
  <Toast ref="notification" />
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> Edit <strong>Project</strong> </CCardHeader>
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
              <CCol :xs="6">
                <CButton color="primary" type="submit">
                  <span v-if="loading">
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Submit
                  </span>
                  <span v-else>Submit</span>
                </CButton>
              </CCol>
              <CCol :xs="6">
                <CButton color="danger" type="submit">
                  <span v-if="loading">
                    <CSpinner component="span" size="sm" aria-hidden="true" />
                    Submit
                  </span>
                  <span v-else>Delete</span>
                </CButton>
              </CCol>
            </CRow>
          </CForm>
          <CRow class="mt-4">
            <CCol :xs="12">
              <router-link :to="{ name: 'samples.index', params: { id: projectId } }">
                <div class="d-grid gap-2">
                  <CButton color="primary">Sample List</CButton>
                </div>
              </router-link>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol :xs="12">
              <router-link :to="{ name: 'samples.create', params: { id: projectId } }">
                <div class="d-grid gap-2">
                  <CButton color="primary">Upload Sample</CButton>
                </div>
              </router-link>
            </CCol>
          </CRow>
          <CRow class="mt-4">
            <CCol :xs="12">
              <router-link :to="{ name: 'assemblies.create', params: { id: projectId } }">
                <div class="d-grid gap-2">
                  <CButton color="primary">Upload Assembly</CButton>
                </div>
              </router-link>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import ProjectService from '@/services/project.service'
import Toast from '@/components/Toast.vue'
import { useI18n } from 'vue-i18n'
export default {
  name: 'EditProject',
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
    const formData = reactive({
      name: '',
      sequencing_method: null,
      sequencing_read_type: null,
    })

    const projectId = props.id

    onMounted(() => {
      ProjectService.getById(props.id)
        .then((response) => {
          formData.name = response.name
          formData.sequencing_method = String(response.sequencing_method)
          formData.sequencing_read_type = String(response.sequencing_read_type)
        })
        .catch((error) => error)

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

        ProjectService.update(props.id, { ...formData })
          .then(() => {
            notification.value.toasts.push({
              color: 'success',
              title: t('notification.title.success'),
              content: t('notification.successfulMessage', {
                entity: t('dashboard.sidebar.project.title'),
                action: t('notification.actions.updated'),
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
      projectId,
    }
  },
}
</script>
