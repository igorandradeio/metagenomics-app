<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader>
          <strong>{{ title }}</strong>
        </CCardHeader>
        <CCardBody>
          <div class="d-grid gap-2">
            <CButton class="p-4" color="dark">
              <router-link :to="{ name: to, params: { id: projectId } }">
                <CIcon icon="cil-media-play" size="xxl" class="me-2" />
                <h5>{{ description }}</h5>
              </router-link>
            </CButton>
          </div>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { reactive, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

export default {
  name: 'LargeButton',
  props: {
    id: {
      required: true,
    },
    title: {
      required: true,
    },
    description: {
      required: true,
    },
    to: {
      required: true,
    },
  },
  setup(props) {
    const projectId = props.id
    const title = ref('')
    const description = ref('')
    const to = ref('')

    onMounted(() => {
      title.value = props.title
      description.value = props.description
      to.value = props.to
    })

    return {
      projectId,
      title,
      description,
    }
  },
}
</script>
