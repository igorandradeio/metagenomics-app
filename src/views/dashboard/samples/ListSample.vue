<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Sample List</strong> </CCardHeader>
        <CCardBody>
          <div v-if="hasSample">
            <CRow>
              <CCol :md="12" v-for="pair in sampleList" :key="pair.pair_id">
                <CCard class="mb-4">
                  <CCardHeader>
                    <strong>Sample {{ pair.pair_id }}</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol :md="6" v-for="sample in pair.samples" :key="sample.id">
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
                              @click="download(sample.id)"
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
            <CRow class="mt-3">
              <CCol :md="4">
                <router-link :to="{ name: 'samples.create', params: { id: projectId } }">
                  <div class="d-grid gap-2">
                    <CButton color="info" variant="outline"
                      ><CIcon icon="cil-cloud-upload" size="xl" /> Send a new sample</CButton
                    >
                  </div>
                </router-link>
              </CCol>
            </CRow>
          </div>
          <div v-else>
            <CRow v-if="loading">
              <CCol :sm="6">
                <CCard>
                  <CCardBody>
                    <CCardText v-c-placeholder="{ animation: 'glow' }">
                      <CPlaceholder :xs="7" />
                      <CPlaceholder :xs="4" />
                      <CPlaceholder :xs="4" />
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow v-else>
              <CCol :md="6">
                <CCard class="mb-3 border-primary" color="light" text-color="primary">
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
                        <strong> Upload your first sample </strong>
                        <hr />
                        <small> Add a new sample</small>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </router-link>
              </CCol>
            </CRow>
          </div>
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
    const loading = ref(true)
    const projectId = props.id
    const sampleList = ref([])
    const hasSample = ref(false)

    onMounted(() => {
      SampleService.getSamplesByProject(projectId)
        .then((response) => {
          if (response.length > 0) {
            hasSample.value = true
            sampleList.value = response
          } else {
            hasSample.value = false
          }
        })
        .catch((error) => console.error('Error:', error))
        .finally(() => {
          loading.value = false
        })
    })

    const download = (sampleId) => {
      SampleService.download(sampleId)
        .then((response) => {})
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
