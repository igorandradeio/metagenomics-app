<template>
  <CTabs :activeItemKey="1">
    <CTabList variant="underline-border">
      <CTab aria-controls="home-tab-pane" :itemKey="1">Assembly</CTab>
      <CTab aria-controls="profile-tab-pane" :itemKey="2">QUAST</CTab>
      <CTab aria-controls="profile-tab-pane" :itemKey="3">Multiqc</CTab>
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
      <CTabPanel class="py-3" aria-labelledby="profile-tab-pane" :itemKey="3">
        <CButton as="a" color="primary" :href="multiqc" target="_blank" role="button"
          >Open multiqc</CButton
        >
      </CTabPanel>
    </CTabContent>
  </CTabs>
</template>

<script>
import { onMounted, ref, reactive, watch } from 'vue'
import { FILE_URL } from '@/utils/constants'

export default {
  name: 'AssemblyDetail',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const loading = ref(true)
    const directoryStructure = ref([])
    const urlBase = FILE_URL
    const qc = ref('')
    const assembly = ref('')
    const icarus = ref('')
    const multiqc = ref('')

    const projectId = props.id

    onMounted(() => {
      qc.value = `${urlBase}${projectId}/analysis/Assembly/MEGAHIT/QC/group-0/QUAST/report.html`
      assembly.value = `${urlBase}${projectId}/analysis/Assembly/MEGAHIT/MEGAHIT-group-0.contigs.fa.gz`
      icarus.value = `${urlBase}${projectId}/analysis/Assembly/MEGAHIT/QC/group-0/QUAST/icarus_viewers/contig_size_viewer.html`
      multiqc.value = `${urlBase}${projectId}/analysis/multiqc/multiqc_report.html#general_stats`
    })

    return {
      directoryStructure,
      loading,
      qc,
      assembly,
      icarus,
      multiqc,
    }
  },
}
</script>
