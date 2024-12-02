<template>
  <div>
    <h2>Files</h2>
    <ul>
      <li v-for="(item, index) in directoryStructure" :key="index">
        <a v-if="item.is_directory" @click.prevent="navigateToDirectory(item.path)">
          {{ item.name }}
        </a>
        <span v-else>{{ item.name }}</span>
      </li>
    </ul>
    <CTable hover>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">Name</CTableHeaderCell>
          <CTableHeaderCell scope="col">Size</CTableHeaderCell>
          <CTableHeaderCell scope="col">Action</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in directoryStructure" :key="index">
          <CTableHeaderCell scope="row">{{ item.name }}</CTableHeaderCell>
          <CTableDataCell></CTableDataCell>
          <CTableDataCell>
            <span v-if="item.is_directory"> ... </span>
            <span v-else>
              <CButton color="primary" variant="outline">Download</CButton>
            </span>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script>
import { onMounted, ref, watch } from 'vue'
import AnnotationService from '@/services/annotation.service'
import { useRoute, useRouter } from 'vue-router'

export default {
  name: 'AnalysisDetail',
  props: {
    id: {
      required: true,
    },
  },
  setup(props) {
    const router = useRouter()
    const route = useRoute()
    const loading = ref(true)
    const directoryStructure = ref([])

    const fetchDirectoryStructure = (path = '') => {
      const projectId = props.id
      AnnotationService.getAnalysis(projectId, path)
        .then((response) => {
          directoryStructure.value = response
        })
        .catch((error) => {
          console.log(error)
        })
    }

    const navigateToDirectory = (path) => {
      router.push(`/projects/${props.id}/analysis/view/${path}/`)
    }

    onMounted(() => {
      fetchDirectoryStructure(route.params.path || '')
    })

    watch(
      () => route.params.path,
      (newPath) => {
        fetchDirectoryStructure(newPath)
      },
    )

    return {
      directoryStructure,
      loading,
      navigateToDirectory,
    }
  },
}
</script>
