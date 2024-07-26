<template>
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
                <CFormRange
                  :min="1"
                  :max="10"
                  v-model="assemblyOptions.k_count"
                  id="assemblyOptions.k_countRange"
                />
                <p>Selected Min Count: {{ assemblyOptions.k_count }}</p>
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
                <CFormRange
                  :min="1"
                  :max="127"
                  step="2"
                  v-model="assemblyOptions.k_min"
                  id="assemblyOptions.k_minRange"
                />
                <p>Selected K-min: {{ assemblyOptions.k_min }}</p>

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
                <CFormRange
                  :min="1"
                  :max="127"
                  step="2"
                  v-model="assemblyOptions.k_max"
                  id="assemblyOptions.k_maxRange"
                />
                <p>Selected K-max: {{ assemblyOptions.k_max }}</p>
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
                <CFormRange
                  :min="2"
                  :max="28"
                  step="2"
                  v-model="assemblyOptions.k_step"
                  id="assemblyOptions.k_stepRange"
                />
                <p>Selected K-step: {{ assemblyOptions.k_step }}</p>
              </CAlert>
            </div>
          </div>
          <div class="d-grid gap-2">
            <CButton :disabled="buttonDisabled" color="primary" @click="runAssembler">Run</CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>MEGAHIT</strong> </CCardHeader>
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
</template>

<script>
import { reactive, ref, watch } from 'vue'
import AssemblyService from '@/services/assembly.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'Assembler',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const loading = ref(true)
    const buttonDisabled = ref(false)
    const router = useRouter()

    const projectId = props.id
    const assembly = reactive({
      id: '',
      date: '',
      file_name: '',
      project_id: '',
      upload_source: '',
    })

    const assemblyOptions = reactive({
      k_count: '2',
      k_min: '21',
      k_max: '99',
      k_step: '20',
    })

    const runAssembler = () => {
      buttonDisabled.value = true

      AssemblyService.assembler(props.id, { ...assemblyOptions })
        .then((response) => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('entity.assembly'),
              action: t('notification.actions.scheduled'),
            }),
          )
          router.push({ name: 'task.id', params: { id: response.task_id } })
        })
        .catch(() => {
          toast.error(t('notification.errorMessage'))
        })
        .finally(() => {
          loading.value = false
        })
    }

    // Watchers to enforce the rules for kMin and kMax
    watch(
      () => assemblyOptions.k_min,
      (newkMin) => {
        if (parseInt(newkMin) > parseInt(assemblyOptions.k_max)) {
          if (parseInt(newkMin) == 127) {
            assemblyOptions.k_max = '127'
          } else {
            assemblyOptions.k_max = (parseInt(newkMin) + 2).toString()
          }
        }
      },
    )

    watch(
      () => assemblyOptions.k_max,
      (newkMax) => {
        if (parseInt(newkMax) < parseInt(assemblyOptions.k_min)) {
          if (parseInt(newkMax) == 1) {
            assemblyOptions.k_min = '1'
          } else {
            assemblyOptions.k_min = (parseInt(newkMax) - 2).toString()
          }
        }
      },
    )

    return {
      loading,
      assembly,
      projectId,
      assemblyOptions,
      runAssembler,
      buttonDisabled,
    }
  },
}
</script>
