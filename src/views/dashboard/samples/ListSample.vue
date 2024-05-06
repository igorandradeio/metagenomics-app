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
                    href="#"
                    @click="download(sample.id, sample.file_name)"
                    rel="noopener norefferer"
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
import { onMounted, reactive, ref } from 'vue'
import SampleService from '@/services/sample.service'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ListSample',
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
    const projectId = props.id
    const sampleList = ref([])

    onMounted(() => {
      SampleService.getSamplesByProject(projectId)
        .then((response) => {
          sampleList.value = response
        })
        .catch((error) => error)
    })

    const download = (sampleId, fileName) => {
      SampleService.download(sampleId)
        .then((response) => {
          const FILE = window.URL.createObjectURL(new Blob([response.data]))
          const docUrl = document.createElement('x')
          docUrl.href = FILE
          docUrl.setAttribute('download', 'file.pdf')
          document.body.appendChild(docUrl)
          docUrl.click()
        })
        .catch((error) => console.error('Error downloading file:', error))
    }

    return {
      validatedForm,
      loading,
      sequencingMethodOptions,
      sequencingReadTypeOptions,
      notification,
      sampleList,
      download,
    }
  },
}
</script>
