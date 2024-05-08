<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Assembly List</strong> </CCardHeader>
        <CCardBody>
          <CRow :xs="{ gutter: 4 }">
            <CCol :sm="6" :xl="6" :xxl="6" :key="assembly.id">
              <CWidgetStatsF
                color="primary"
                :title="'Date: ' + assembly.date"
                :value="assembly.file_name"
              >
                <template #icon>
                  <CIcon icon="cil-file" size="xl" />
                </template>
                <template #footer>
                  <CLink
                    class="fw-semibold font-xs text-body-secondary"
                    href="#"
                    @click="download(assembly.id, assembly.file_name)"
                    rel="noopener norefferer"
                  >
                    Download
                    <CIcon icon="cil-arrow-right" class="ms-auto" width="16" />
                  </CLink>
                </template>
              </CWidgetStatsF>
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import AssemblyService from '@/services/assembly.service'
import { useI18n } from 'vue-i18n'

export default {
  name: 'ListAssembly',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const loading = ref(false)
    const projectId = props.id
    const assembly = ref([])

    onMounted(() => {
      AssemblyService.getAssemblyByProject(projectId)
        .then((response) => {
          assembly.value = response
        })
        .catch((error) => error)
    })

    const download = (assemblyId, fileName) => {
      AssemblyService.download(assemblyId)
        .then((response) => {
          const FILE = window.URL.createObjectURL(new Blob([response.data]))
          const docUrl = document.createElement('x')
          docUrl.href = FILE
          docUrl.setAttribute('download', fileName)
          document.body.appendChild(docUrl)
          docUrl.click()
        })
        .catch((error) => console.error('Error downloading file:', error))
    }

    return {
      loading,
      assembly,
      download,
    }
  },
}
</script>