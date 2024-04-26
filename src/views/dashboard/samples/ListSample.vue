<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Sample List</strong> </CCardHeader>
        <CCardBody>
          <CRow :xs="{ gutter: 4 }">
            <CCol :sm="6" :xl="6" :xxl="6" v-for="sample in sampleList" :key="sample.id">
              <CWidgetStatsF
                color="primary"
                :title="'Date: ' + sample.date"
                :value="sample.file_name"
              >
                <template #icon>
                  <CIcon icon="cil-file" size="xl" />
                </template>
                <template #footer>
                  <CLink
                    class="fw-semibold font-xs text-body-secondary"
                    :href="sample.file_path"
                    rel="noopener norefferer"
                    target="_blank"
                  >
                    Download
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
    const projectId = props.id
    const sampleList = ref([])

    onMounted(() => {
      SampleService.getSamplesByProject(projectId)
        .then((response) => {
          sampleList.value = response
          console.log(sampleList)
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
      sampleList,
    }
  },
}
</script>
