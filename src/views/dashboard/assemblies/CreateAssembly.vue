<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader><strong>Assembly Upload</strong></CCardHeader>
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
                    <CCardHeader><strong>Metagenome-assembled</strong></CCardHeader>
                    <CCardImage orientation="top" :src="fastaIcon" />
                    <CCardBody>
                      <CFormInput
                        type="file"
                        aria-label="Metagenome-assembled"
                        @change="uploadFile"
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
import assemblyService from '@/services/assembly.service'
import ProjectService from '@/services/project.service'
import fastaIcon from '@/assets/images/fasta.png'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

export default {
  name: 'CreateAssembly',
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
    const loading = ref(false)
    const projectId = props.id

    const project = reactive({
      name: '',
      sequencing_read_type: null,
    })

    const assembledFile = ref(null)

    onMounted(() => {
      ProjectService.getById(props.id)
        .then((response) => {
          project.name = response.name
          project.sequencing_method = String(response.sequencing_method)
          project.sequencing_read_type = String(response.sequencing_read_type)
        })
        .catch((error) => error)
    })

    const uploadFile = (event) => {
      assembledFile.value = event.target.files[0]
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
        formData.append('file', assembledFile.value)

        assemblyService
          .create(formData)
          .then((response) => {
            toast.success(
              t('notification.successfulMessage', {
                entity: t('entity.assembly'),
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
      handleSubmit,
      project,
      fastaIcon,
      uploadFile,
    }
  },
}
</script>
