<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader><strong>Sample Upload</strong></CCardHeader>
        <CCardBody>
          <CForm
            class="row g-3 needs-validation"
            novalidate
            :validated="validatedForm"
            @submit.prevent="handleSubmit"
          >
            <div v-if="isSingleEnd">
              <CRow>
                <CCol md="6">
                  <CCard class="border-top-primary mb-3 border-top-3" text-color="primary">
                    <CCardHeader><strong>Single-end read file</strong></CCardHeader>
                    <CCardImage orientation="top" :src="fastaIcon" />
                    <CCardBody>
                      <CFormInput
                        type="file"
                        aria-label="Single-end read file"
                        @change="uploadFileR1"
                        required
                      />
                      <CFormFeedback invalid>This field is required</CFormFeedback>
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </div>
            <div v-else>
              <CRow :xs="{ cols: 1, gutter: 1 }" :md="{ cols: 2 }">
                <CCol xs>
                  <CCard class="border-top-primary mb-3 border-top-3" text-color="primary">
                    <CCardHeader><strong>Forward Read File (R1)</strong></CCardHeader>
                    <CCardImage orientation="top" :src="fastaIcon" />
                    <CCardBody>
                      <CFormInput
                        type="file"
                        aria-label="Forward Read File (R1)"
                        @change="uploadFileR1"
                        required
                      />
                      <CFormFeedback invalid>This field is required</CFormFeedback>
                    </CCardBody>
                  </CCard>
                </CCol>
                <CCol xs>
                  <CCard class="border-top-primary mb-3 border-top-3" text-color="primary">
                    <CCardHeader><strong>Reverse Read File (R2)</strong></CCardHeader>
                    <CCardImage orientation="top" :src="fastaIcon" />
                    <CCardBody>
                      <CFormInput
                        type="file"
                        aria-label="Reverse Read File (R2)"
                        @change="uploadFileR2"
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
import fastaIcon from '@/assets/images/fasta.png'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export default {
  name: 'CreateSample',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()

    const defaultOptionValue = { label: 'Choose', value: '', disabled: true, selected: true }
    const notification = ref()
    const validatedForm = ref(false)
    const sequencingMethodOptions = ref([defaultOptionValue])
    const sequencingReadTypeOptions = ref([defaultOptionValue])
    const loading = ref(false)
    const projectId = props.id

    const project = reactive({
      name: '',
      sequencing_read_type: null,
    })

    const r1File = ref(null)
    const r2File = ref(null)

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

    const uploadFileR1 = (event) => {
      r1File.value = event.target.files[0]
    }

    const uploadFileR2 = (event) => {
      r2File.value = event.target.files[0]
    }

    const handleSubmit = (event) => {
      const form = event.currentTarget

      validatedForm.value = true
      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loading.value = true
        const formData = new FormData()
        formData.append('project', projectId)

        if (isSingleEnd.value) {
          formData.append('file', r1File.value)
        } else {
          console.log('pair')
          formData.append('r1', r1File.value)
          formData.append('r2', r2File.value)
        }

        SampleService.create(formData)
          .then((response) => {
            toast.success(
              t('notification.successfulMessage', {
                entity: t('entity.sample'),
                action: t('notification.actions.created'),
              }),
            )
            router.push({ name: 'projects.edit', params: { id: projectId } })
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
      loading,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
      handleSubmit,
      project,
      isSingleEnd,
      fastaIcon,
      r1File,
      r2File,
      uploadFileR1,
      uploadFileR2,
    }
  },
}
</script>
