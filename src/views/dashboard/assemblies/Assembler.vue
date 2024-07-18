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
              <CAlert color="dark">
                <strong>Min Count</strong>
                <CButton
                  color="link"
                  v-c-tooltip="{
                    content: 'Minimum multiplicity for filtering (k_min+1)-mers, default 2.',
                    placement: 'top',
                  }"
                >
                  <CIcon icon="cil-info" size="lg" class="me-2" />
                </CButton>
                <CFormRange :min="1" :max="10" v-model="minCount" id="minCountRange" />
                <p>Selected Min Count: {{ minCount }}</p>
              </CAlert>
            </div>

            <!-- K-min Range -->
            <div>
              <CAlert color="dark">
                <strong>K-min</strong>
                <CButton
                  color="link"
                  v-c-tooltip="{
                    content: 'Minimum kmer size (<= 127), must be odd number, default 21',
                    placement: 'top',
                  }"
                >
                  <CIcon icon="cil-info" size="lg" class="me-2" />
                </CButton>
                <CFormRange :min="1" :max="127" step="2" v-model="kMin" id="kMinRange" />
                <p>Selected K-min: {{ kMin }}</p>

                <!-- K-max Range -->
                <strong>K-max</strong>
                <CButton
                  color="link"
                  v-c-tooltip="{
                    content: 'Maximum kmer size (<= 127), must be odd number, default 99.',
                    placement: 'top',
                  }"
                >
                  <CIcon icon="cil-info" size="lg" class="me-2" />
                </CButton>
                <CFormRange :min="1" :max="127" step="2" v-model="kMax" id="kMaxRange" />
                <p>Selected K-max: {{ kMax }}</p>
              </CAlert>
            </div>

            <!-- K-step Range -->
            <div>
              <CAlert color="dark">
                <strong>K-step</strong>
                <CButton
                  color="link"
                  v-c-tooltip="{
                    content:
                      'Increment of kmer size of each iteration (<= 28), must be even number, default 20',
                    placement: 'top',
                  }"
                >
                  <CIcon icon="cil-info" size="lg" class="me-2" />
                </CButton>
                <CFormRange :min="2" :max="28" step="2" v-model="kStep" id="kStepRange" />
                <p>Selected K-step: {{ kStep }}</p>
              </CAlert>
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

    // Watchers to enforce the rules for kMin and kMax
    watch(kMin, (newkMin) => {
      if (parseInt(newkMin) > parseInt(kMax.value)) {
        if (parseInt(newkMin) == 127) {
          kMax.value = '127'
        } else {
          kMax.value = (parseInt(newkMin) + 2).toString()
        }
      }
    })

    watch(kMax, (newkMax) => {
      if (parseInt(newkMax) < parseInt(kMin.value)) {
        if (parseInt(newkMax) == 1) {
          kMin.value = '1'
        } else {
          kMin.value = (parseInt(newkMax) - 2).toString()
        }
      }
    })

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
