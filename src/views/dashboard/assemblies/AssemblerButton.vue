<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Assembler</strong> </CCardHeader>
        <CCardBody>
          <div class="d-grid gap-2">
            <CButton class="p-4" color="dark">
              <router-link :to="{ name: 'assembler', params: { id: projectId } }">
                <CIcon icon="cil-media-play" size="xxl" class="me-2" />
                <h5>Run Assembler</h5>
              </router-link>
            </CButton>
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

    return {
      loading,
      assembly,
      hasAssembly,
      projectId,
    }
  },
}
</script>
