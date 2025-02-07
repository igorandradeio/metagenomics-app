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
    const urlBase = FILE_URL
    const taxonomy = ref('')

    onMounted(() => {
      taxonomy.value = `${urlBase}${projectId}/analysis/Taxonomy/kraken2/sample_${pairId}/sample_${pairId}.html`
    })

    return {
      loading,
      taxonomy,
    }
  },
}
</script>
