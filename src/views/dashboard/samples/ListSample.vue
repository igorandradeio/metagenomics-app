<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Sample List</strong> </CCardHeader>
        <CCardBody>
          <CRow v-if="hasSample" :md="{ gutter: 4 }">
            <CCol :md="6" v-for="sample in sampleList" :key="sample.id">
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
          <CRow v-else :md="{ gutter: 4 }">
            <CCol :md="6">
              <CCard class="mb-3" color="info" text-color="white">
                <CCardBody>
                  <CCardText
                    ><CIcon icon="cil-find-in-page" size="xl" />
                    <strong> You don't have any sample yet </strong>
                    <hr />
                    <small> When you upload, you'll see it here</small>
                  </CCardText>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol :md="6">
              <router-link :to="{ name: 'samples.create', params: { id: projectId } }">
                <CCard class="mb-3" color="success" text-color="white">
                  <CCardBody>
                    <CCardText
                      ><CIcon icon="cil-cloud-upload" size="xl" />
                      <strong> Upload your sample </strong>
                      <hr />
                      <small> Add a new sample</small>
                    </CCardText>
                  </CCardBody>
                </CCard>
              </router-link>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, ref } from 'vue'
import SampleService from '@/services/sample.service'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ListSample',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const loading = ref(false)
    const projectId = props.id
    const sampleList = ref([])
    const hasSample = ref(false)

    onMounted(() => {
      SampleService.getSamplesByProject(projectId)
        .then((response) => {
          hasSample.value = true
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
          docUrl.setAttribute('download', fileName)
          document.body.appendChild(docUrl)
          docUrl.click()
        })
        .catch((error) => console.error('Error downloading file:', error))
    }

    return {
      loading,
      sampleList,
      projectId,
      download,
      hasSample,
    }
  },
}
</script>
