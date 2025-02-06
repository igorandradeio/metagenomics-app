<template>
  <CTabs :activeItemKey="1">
    <CTabList variant="underline-border">
      <CTab aria-controls="contact-tab-pane" :itemKey="1">Analysis</CTab>
    </CTabList>
    <CTabContent>
      <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
        <CTabs :activeItemKey="1">
          <CTabList variant="tabs" layout="justified">
            <CTab aria-controls="home-tab-pane" :itemKey="1">Taxonomic analysis </CTab>
            <CTab aria-controls="profile-tab-pane" :itemKey="2">Prodigal </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel class="py-5" aria-labelledby="profile-tab-pane" :itemKey="1">
              <CROW>
                <iframe
                  :src="taxonomy"
                  width="100%"
                  height="700px"
                  frameborder="0"
                  sandbox="allow-scripts allow-same-origin"
                ></iframe>
              </CROW>
            </CTabPanel>
            <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="2">
              <CRow>
                <CCol :sm="6" :xl="6" :xxl="6">
                  <CWidgetStatsF color="primary">
                    <template #value><h6>Predicted proteins</h6></template>
                    <template #icon>
                      <CIcon icon="cil-file" size="xl" />
                    </template>

                    <template #footer>
                      <CLink
                        class="fw-semibold font-xs text-body-secondary"
                        :href="prodigal.predicted_proteins"
                        rel="noopener norefferer"
                      >
                        Download
                        <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                      </CLink>
                    </template>
                  </CWidgetStatsF>
                  <br />
                  <CWidgetStatsF color="primary">
                    <template #value><h6>Predicted coding sequences</h6></template>
                    <template #icon>
                      <CIcon icon="cil-file" size="xl" />
                    </template>

                    <template #footer>
                      <CLink
                        class="fw-semibold font-xs text-body-secondary"
                        :href="prodigal.predicted_coding_sequences"
                        rel="noopener norefferer"
                      >
                        Download
                        <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                      </CLink>
                    </template>
                  </CWidgetStatsF>
                  <br />
                  <CWidgetStatsF color="primary">
                    <template #value><h6>Predicted gene annotations</h6></template>
                    <template #icon>
                      <CIcon icon="cil-file" size="xl" />
                    </template>

                    <template #footer>
                      <CLink
                        class="fw-semibold font-xs text-body-secondary"
                        :href="prodigal.predicted_gene_annotations"
                        rel="noopener norefferer"
                      >
                        Download
                        <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                      </CLink>
                    </template>
                  </CWidgetStatsF>
                  <br />
                  <CWidgetStatsF color="primary">
                    <template #value><h6>Detailed prediction summary</h6></template>
                    <template #icon>
                      <CIcon icon="cil-file" size="xl" />
                    </template>

                    <template #footer>
                      <CLink
                        class="fw-semibold font-xs text-body-secondary"
                        :href="prodigal.detailed_prediction_summary"
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
          </CTabContent>
        </CTabs>
      </CTabPanel>
    </CTabContent>
  </CTabs>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { FILE_URL } from '@/utils/constants'

export default {
  name: 'AnalysisDetail',
  props: {
    id: {
      required: true,
    },
    pairId: {
      required: true,
    },
  },
  setup(props) {
    const projectId = props.id
    const pairId = props.pairId

    const loading = ref(true)
    const directoryStructure = ref([])
    const urlBase = FILE_URL
    const taxonomy = ref('')
    const qc = ref('')
    const assembly = ref('')
    const icarus = ref('')
    const prodigal = reactive({
      predicted_proteins: '',
      predicted_coding_sequences: '',
      predicted_gene_annotations: '',
      detailed_prediction_summary: '',
    })

    console.log('ID:', props.id, 'Pair ID:', props.pairId)

    onMounted(() => {
      taxonomy.value = `${urlBase}${projectId}/analysis/Taxonomy/kraken2/sample_${pairId}/sample_${pairId}.html`

      // prodigal.predicted_proteins = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/sample_1/MEGAHIT-sample_1_prodigal.faa.gz`
      // prodigal.predicted_coding_sequences = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/sample_1/MEGAHIT-sample_1_prodigal.fna.gz`
      // prodigal.predicted_gene_annotations = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/sample_1/MEGAHIT-sample_1_prodigal.gff.gz`
      // prodigal.detailed_prediction_summary = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/sample_1/MEGAHIT-sample_1_prodigal_all.txt.gz`
    })

    return {
      directoryStructure,
      loading,
      taxonomy,
      prodigal,
    }
  },
}
</script>
