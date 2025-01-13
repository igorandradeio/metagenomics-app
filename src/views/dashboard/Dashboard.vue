<template>
  <div>
    <CRow>
      <CCol :md="12">
        <h1>Welcome to MetaSoil</h1>
        <CCard class="mb-4"> </CCard>
        <h2>A Web Platform for Metagenome Assembly and Annotation</h2>
        <CButton color="primary" @click="newProject"> create a new project</CButton>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
  name: 'Dashboard',
  setup() {
    const router = useRouter()

    const newProject = () => {
      router.push({ name: 'projects.create' })
    }

    return {
      newProject,
    }
  },
}
</script>
