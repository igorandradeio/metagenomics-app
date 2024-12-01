<template>
  <div>
    <h2>Files</h2>
    <ul>
      <directory-item v-for="(item, index) in directoryStructure" :key="index" :item="item" />
    </ul>
  </div>
</template>

<script>
import { onMounted, reactive, ref, watch } from 'vue'
import AnnotationService from '@/services/annotation.service'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { useRouter } from 'vue-router'
import DirectoryItem from '@/components/DirectoryItem.vue'

export default {
  name: 'AnalysisDetail',
  props: {
    id: {
      required: true,
    },
  },
  components: {
    DirectoryItem,
  },
  setup(props) {
    const { t } = useI18n({ useScope: 'global' })
    const loading = ref(true)
    const directoryStructure = ref([])

    const projectId = props.id

    const fetchDirectoryStructure = () => {
      AnnotationService.getAnalysis(projectId)
        .then((response) => {
          console.log(response)
          directoryStructure.value = response
        })
        .catch((error) => {
          console.log(error)

          if (error.status === 404) {
            console.log(response)
          }
        })
    }

    onMounted(fetchDirectoryStructure)

    return {
      loading,
      projectId,
      directoryStructure,
    }
  },
}
</script>
