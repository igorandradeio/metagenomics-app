<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Associated analysis </strong> </CCardHeader>
        <CCardBody>
          <CCol :md="12">
            <div v-if="hasAnalysis">
              <CTable>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell scope="col">Run accession</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Sample sheet</CTableHeaderCell>
                    <CTableHeaderCell scope="col">Pipeline version</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  <CTableRow>
                    <CTableHeaderCell scope="row">{{ analysis.id }}</CTableHeaderCell>
                    <CTableDataCell>
                      <CButton color="info" variant="outline">Download</CButton>
                    </CTableDataCell>
                    <CTableDataCell>nf-core/mag V.3.2.1</CTableDataCell>
                  </CTableRow>
                </CTableBody>
              </CTable>
            </div>
            <div v-else>No analysis</div>
          </CCol>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import AnalysisService from '@/services/analysis.service.js'
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
    const hasAnalysis = ref(false)

    const projectId = props.id
    const analysis = reactive({
      id: '',
      date: '',
      project_id: '',
    })

    onMounted(() => {
      AnalysisService.getAnalysisByProject(projectId)
        .then((response) => {
          hasAnalysis.value = true
          analysis.id = response.id
          analysis.date = response.date
          analysis.project_id = response.project_id
          console.log(response)
        })
        .catch((error) => error)
        .finally(() => {
          loading.value = false
        })
    })

    return {
      loading,
      analysis,
      projectId,
      hasAnalysis,
    }
  },
}
</script>
