<template>
  <CRow>
    <CCol :md="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Results</strong> </CCardHeader>
        <CCardBody>
          <div v-if="hasSample">
            <CRow>
              <CCol>
                <CCard class="mb-4 border-primary border-top-3 border-top-primary">
                  <CCardHeader>
                    <strong>Assembly</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol>
                        <router-link
                          :to="{
                            name: 'analysis.assembly',
                            params: { id: projectId, path: 'assembly' },
                          }"
                        >
                          <CButton as="a" color="primary" href="#" role="button"
                            >Open Assembly</CButton
                          ></router-link
                        >
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <CRow>
              <CCol>
                <CCard class="mb-4 border-primary border-top-3 border-top-primary">
                  <CCardHeader>
                    <strong>Gene Prediction</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol>
                        <router-link
                          :to="{
                            name: 'analysis.annotation',
                            params: { id: projectId },
                          }"
                        >
                          <CButton as="a" color="primary" href="#" role="button"
                            >Open Gene Prediction</CButton
                          ></router-link
                        >
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>

            <CRow>
              <CCol :md="12">
                <CCard class="mb-4 border-primary border-top-3 border-top-primary">
                  <CCardHeader>
                    <strong>Sample analysis</strong>
                  </CCardHeader>
                  <CCardBody>
                    <CRow>
                      <CCol :md="12" v-for="pair in sampleList" :key="pair.pair_id">
                        <CCard class="mb-4">
                          <CCardHeader>
                            <strong>Sample {{ pair.pair_id }}</strong>
                          </CCardHeader>
                          <CCardBody>
                            <CRow>
                              <CCol>
                                <router-link
                                  :to="{
                                    name: 'analysis.result',
                                    query: { id: projectId, pairId: pair.pair_id },
                                  }"
                                >
                                  <CButton as="a" color="primary" href="#" role="button"
                                    >Open Taxonomic Classification</CButton
                                  ></router-link
                                >
                              </CCol>
                            </CRow>
                          </CCardBody>
                        </CCard>
                      </CCol>
                    </CRow>
                  </CCardBody>
                </CCard>
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
  name: 'ListAnalysis',
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
