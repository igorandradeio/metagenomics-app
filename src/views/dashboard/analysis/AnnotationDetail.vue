<template>
  <CTabs :activeItemKey="1">
    <CTabList variant="underline-border">
      <CTab aria-controls="contact-tab-pane" :itemKey="1">Analysis</CTab>
    </CTabList>
    <CTabContent>
      <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
        <CTabs :activeItemKey="1">
          <CTabList variant="tabs" layout="justified">
            <CTab aria-controls="profile-tab-pane" :itemKey="1">Prodigal Gene Prediction </CTab>
          </CTabList>
          <CTabContent>
            <CTabPanel class="py-3" aria-labelledby="home-tab-pane" :itemKey="1">
              <CRow>
                <CCol :sm="6" :xl="6" :xxl="6">
                  <CWidgetStatsF color="primary">
                    <template #value><h6>Prodigal Gene Prediction</h6></template>
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
  name: 'AnnotationDetail',
  props: {
    id: {
      required: true,
    },
    pairId: {
      required: true,
    },
  },
  setup(props) {
    const loading = ref(true)
    const urlBase = FILE_URL

    const prodigal = reactive({
      predicted_proteins: '',
      predicted_coding_sequences: '',
      predicted_gene_annotations: '',
      detailed_prediction_summary: '',
    })

    const projectId = props.id

    onMounted(() => {
      prodigal.predicted_proteins = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/group-0/MEGAHIT-group-0_prodigal.faa.gz`
      prodigal.predicted_coding_sequences = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/group-0/MEGAHIT-group-0_prodigal.fna.gz`
      prodigal.predicted_gene_annotations = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/group-0/MEGAHIT-group-0_prodigal.gff.gz`
      prodigal.detailed_prediction_summary = `${urlBase}${projectId}/analysis/Annotation/Prodigal/MEGAHIT/group-0/MEGAHIT-group-0_prodigal_all.txt.gz`
    })

    return {
      loading,
      prodigal,
    }
  },
}
</script>
