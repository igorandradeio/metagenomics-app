<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>MEGAHIT Citation</strong> </CCardHeader>
        <CCardBody>
          <p>
            "MEGAHIT is an ultra-fast and memory-efficient NGS assembler. It is optimized for
            metagenomes, but also works well on generic single genome assembly (small or mammalian
            size) and single-cell assembly".
            <a href="http://www.ncbi.nlm.nih.gov/pubmed/25609793" target="_blank"
              >http://www.ncbi.nlm.nih.gov/pubmed/25609793</a
            >
          </p>
          <p>
            Citation:
            <mark>
              Li D, Liu CM, Luo R, Sadakane K, Lam TW. MEGAHIT: an ultra-fast single-node solution
              for large and complex metagenomics assembly via succinct de Bruijn graph.
              Bioinformatics. 2015 May 15;31(10):1674-6. doi: 10.1093/bioinformatics/btv033. Epub
              2015 Jan 20. PMID: 25609793.
            </mark>
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Run MEGAHIT</strong> </CCardHeader>
        <CCardBody>
          <div>
            <!-- Min Count Range -->
            <div>
              <CFormRange
                label="Min Count"
                :min="1"
                :max="10"
                v-model="minCount"
                id="minCountRange"
              />
              <p>Selected Min Count: {{ minCount }}</p>
            </div>

            <!-- K-min Range -->
            <div>
              <CFormRange
                label="K-min"
                :min="1"
                :max="127"
                step="2"
                v-model="kMin"
                id="kMinRange"
              />
              <p>Selected K-min: {{ kMin }}</p>
            </div>

            <!-- K-max Range -->
            <div>
              <CFormRange
                label="K-max"
                :min="1"
                :max="127"
                step="2"
                v-model="kMax"
                id="kMaxRange"
              />
              <p>Selected K-max: {{ kMax }}</p>
            </div>

            <!-- K-step Range -->
            <div>
              <CFormRange
                label="K-step"
                :min="2"
                :max="28"
                step="2"
                v-model="kStep"
                id="kStepRange"
              />
              <p>Selected K-step: {{ kStep }}</p>
            </div>
          </div>
          <div class="d-grid gap-2">
            <CButton color="primary">Run</CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { computed, onMounted, reactive, ref, watch } from 'vue'
import AssemblyService from '@/services/assembly.service'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Assembler',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const loading = ref(true)
    const projectId = props.id
    const assembly = reactive({
      id: '',
      date: '',
      file_name: '',
      project_id: '',
      upload_source: '',
    })
    const hasAssembly = ref(true)

    const minCount = ref('2')
    const kMin = ref('21')
    const kMax = ref('99')
    const kStep = ref('20')

    return {
      loading,
      assembly,
      hasAssembly,
      projectId,
      minCount,
      kMin,
      kMax,
      kStep,
    }
  },
}
</script>
