<template>
  <CTabs :activeItemKey="1">
    <CTabList variant="underline-border">
      <CTab aria-controls="home-tab-pane" :itemKey="1">Assembly</CTab>
      <CTab aria-controls="profile-tab-pane" :itemKey="2">Quality control</CTab>
      <CTab aria-controls="contact-tab-pane" :itemKey="3">Taxonomic analysis</CTab>
      <CTab aria-controls="contact-tab-pane" :itemKey="4">Annotation</CTab>
      <CTab aria-controls="disabled-tab-pane" :itemKey="5">Download</CTab>
    </CTabList>
    <CTabContent>
      <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
        <CTabs :activeItemKey="1">
          <CTabList variant="tabs" layout="justified">
            <CTab aria-controls="home-tab-pane" :itemKey="1">Assembly</CTab>
            <CTab aria-controls="profile-tab-pane" :itemKey="2">Contig Browser </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
              <CRow>
                <CCol :sm="6" :xl="6" :xxl="6">
                  <CWidgetStatsF color="primary">
                    <template #value><h6>MEGAHIT-sample_1.contigs.fa.gz</h6></template>
                    <template #icon>
                      <CIcon icon="cil-file" size="xl" />
                    </template>

                    <template #footer>
                      <CLink
                        class="fw-semibold font-xs text-body-secondary"
                        :href="assembly"
                        rel="noopener norefferer"
                      >
                        Download
                        <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                      </CLink>
                    </template>
                  </CWidgetStatsF>
                </CCol>
              </CRow>
            </CTabPanel>
            <CTabPanel class="py-3" aria-labelledby="profile-tab-pane" :itemKey="2">
              <CROW>
                <iframe
                  :src="icarus"
                  width="100%"
                  height="700px"
                  frameborder="0"
                  sandbox="allow-scripts allow-same-origin"
                ></iframe>
              </CROW>
            </CTabPanel>
          </CTabContent>
        </CTabs>
      </CTabPanel>
      <CTabPanel class="py-3" aria-labelledby="profile-tab-pane" :itemKey="2">
        <iframe
          :src="qc"
          width="100%"
          height="700px"
          frameborder="0"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </CTabPanel>
      <CTabPanel class="py-3" aria-labelledby="contact-tab-pane" :itemKey="3">
        <iframe
          :src="taxonomy"
          width="100%"
          height="700px"
          frameborder="0"
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </CTabPanel>
      <CTabPanel class="py-3" aria-labelledby="contact-tab-pane" :itemKey="4"> </CTabPanel>
      <CTabPanel class="py-3" aria-labelledby="contact-tab-pane" :itemKey="5">
        <h5>Sequence data</h5>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell scope="col" class="w-25">Name</CTableHeaderCell>
              <CTableHeaderCell scope="col" class="w-25">Action</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            <CTableRow>
              <CTableDataCell>Otto</CTableDataCell>
              <CTableDataCell
                ><CButton color="info" variant="outline">Download</CButton></CTableDataCell
              >
            </CTableRow>
            <CTableRow>
              <CTableDataCell>Thornton</CTableDataCell>
              <CTableDataCell
                ><CButton color="info" variant="outline">Download</CButton></CTableDataCell
              >
            </CTableRow>
          </CTableBody>
        </CTable>
      </CTabPanel>
    </CTabContent>
  </CTabs>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import AnnotationService from '@/services/annotation.service'
import { useRoute, useRouter } from 'vue-router'
import { FILE_URL } from '@/utils/constants'

export default {
  name: 'AnalysisDetail',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const directoryStructure = ref([])
    const urlBase = FILE_URL
    const taxonomy = ref('')
    const qc = ref('')
    const assembly = ref('')
    const icarus = ref('')

    const projectId = props.id

    onMounted(() => {
      taxonomy.value = `${urlBase}${projectId}/analysis/Taxonomy/kraken2/sample_1/sample_1.html`

      qc.value = `${urlBase}${projectId}/analysis/QC_shortreads/fastp/sample_1/sample_1_run0_fastp.fastp.html`
      assembly.value = `${urlBase}${projectId}/analysis/Assembly/MEGAHIT/MEGAHIT-sample_1.contigs.fa.gz`
      icarus.value = `${urlBase}${projectId}/analysis/Assembly/MEGAHIT/QC/sample_1/QUAST/icarus_viewers/contig_size_viewer.html`

      console.log(icarus.value)
    })

    return {
      directoryStructure,
      loading,
      taxonomy,
      qc,
      assembly,
      icarus,
    }
  },
}
</script>
