<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Assembly List</strong> </CCardHeader>
        <CCardBody>
          <div v-if="hasAssembly">
            <CRow>
              <CCol :sm="6" :xl="6" :xxl="6" :key="assembly.id">
                <CWidgetStatsF color="primary">
                  <template #value
                    ><h6>
                      {{ assembly.file_name }}
                      <CBadge v-if="isAssembledByPlatform" color="success"
                        >Assembled by the platform</CBadge
                      >
                    </h6>
                  </template>

                  <template #title
                    ><h6>Date: {{ assembly.date }}</h6>
                  </template>

                  <template #icon>
                    <CIcon icon="cil-file" size="xl" />
                  </template>

                  <template #footer>
                    <CLink
                      class="fw-semibold font-xs text-body-secondary"
                      href="#"
                      @click="download(assembly.id)"
                      rel="noopener norefferer"
                    >
                      Download
                      <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                    </CLink>
                  </template>
                </CWidgetStatsF>
              </CCol>
            </CRow>
            <CRow class="mt-3">
              <CCol :md="4">
                <router-link :to="{ name: 'assemblies.create', params: { id: projectId } }">
                  <div class="d-grid gap-2">
                    <CButton color="info" variant="outline"
                      ><CIcon icon="cil-cloud-upload" size="xl" /> Resend assembly manually</CButton
                    >
                  </div>
                </router-link>
              </CCol>
            </CRow>
          </div>
          <div v-else>
            <CRow v-if="loading">
              <CCol :sm="6">
                <CCard>
                  <CCardBody>
                    <CCardText v-c-placeholder="{ animation: 'glow' }">
                      <CPlaceholder :xs="7" />
                      <CPlaceholder :xs="4" />
                      <CPlaceholder :xs="4" />
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
            </CRow>
            <CRow v-else>
              <CCol :md="6">
                <CCard class="mb-3 border-primary" color="light" text-color="primary">
                  <CCardBody>
                    <CCardText
                      ><CIcon icon="cil-find-in-page" size="xl" />
                      <strong> You don't have any assembly yet </strong>
                      <hr />
                      <small> When you upload/run, you'll see it here</small>
                    </CCardText>
                  </CCardBody>
                </CCard>
              </CCol>
              <CCol :md="6">
                <router-link :to="{ name: 'assemblies.create', params: { id: projectId } }">
                  <CCard class="mb-3" color="success" text-color="white">
                    <CCardBody>
                      <CCardText
                        ><CIcon icon="cil-cloud-upload" size="xl" />
                        <strong> Upload your assembly manually </strong>
                        <hr />
                        <small> Add a new assembly manually</small>
                      </CCardText>
                    </CCardBody>
                  </CCard>
                </router-link>
              </CCol>
            </CRow>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { computed, onMounted, reactive, ref } from 'vue'
import AssemblyService from '@/services/assembly.service'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ListAssembly',
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
      download: '',
      file_name: '',
      project_id: '',
      upload_source: '',
    })
    const hasAssembly = ref(false)

    onMounted(() => {
      AssemblyService.getAssemblyByProject(projectId)
        .then((response) => {
          hasAssembly.value = true
          assembly.id = response.id
          assembly.date = response.date
          assembly.download = response.download
          assembly.file_name = response.file_name
          assembly.project_id = response.project_id
          assembly.upload_source = response.upload_source
        })
        .catch((error) => error)
        .finally(() => {
          loading.value = false
        })
    })

    const isAssembledByPlatform = computed(() => {
      return assembly.upload_source == 1 ? true : false
    })

    const download = (assemblyId) => {
      AssemblyService.download(assemblyId)
        .then((response) => {})
        .catch((error) => console.error('Error downloading file:', error))
    }

    return {
      loading,
      assembly,
      download,
      hasAssembly,
      projectId,
      isAssembledByPlatform,
    }
  },
}
</script>
