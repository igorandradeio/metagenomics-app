<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Assembly and annotation of metagenomes</strong> </CCardHeader>
        <CCardBody>
          <div class="d-grid gap-2">
            <CButton :disabled="buttonDisabled" color="primary" @click="runAnnotation">Run</CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>nf-core/mag</strong> </CCardHeader>
        <CCardBody>
          <p>
            "nf-core/mag: a best-practice pipeline for metagenome hybrid assembly and binning".
            <a href="https://doi.org/10.1093/nargab/lqac007" target="_blank"
              >https://doi.org/10.1093/nargab/lqac007</a
            >
          </p>
          <p>
            Citation:
            <mark>
              Sabrina Krakau, Daniel Straub, Hadrien Gourlé, Gisela Gabernet, Sven Nahnsen,
              nf-core/mag: a best-practice pipeline for metagenome hybrid assembly and binning, NAR
              Genomics and Bioinformatics, Volume 4, Issue 1, March 2022, lqac007,
              https://doi.org/10.1093/nargab/lqac007
            </mark>
          </p>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { reactive, ref, watch } from 'vue'
import AnnotationService from '@/services/annotation.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'

export default {
  name: 'Analysis',
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

    const runAnnotation = () => {
      buttonDisabled.value = true
      alert(projectId)

      AnnotationService.annotation(projectId)
        .then((response) => {
          toast.success(
            t('notification.successfulMessage', {
              entity: t('entity.annotation'),
              action: t('notification.actions.scheduled'),
            }),
          )
          router.push({ name: 'task.id', params: { id: response.task_id } })
        })
        .catch((error) => {
          console.log(error)
          toast.error(t('notification.errorMessage'))
        })
        .finally(() => {
          loading.value = false
        })
    }

    return {
      loading,
      projectId,
      runAnnotation,
      buttonDisabled,
    }
  },
}
</script>
