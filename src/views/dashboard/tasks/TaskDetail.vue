<template>
  <CRow>
    <CCol :xs="12">
      <CCard class="mb-4">
        <CCardHeader> <strong>Task Detail</strong> </CCardHeader>
        <CCardBody>
          <StepProgress :id="taskId" :steps="mySteps"></StepProgress>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { ref } from 'vue'
import StepProgress from '@/components/StepProgress.vue'

export default {
  name: 'Assembler',
  props: {
    id: {
      required: true,
    },
  },
  components: {
    StepProgress,
  },
  setup(props) {
    const taskId = props.id
    const mySteps = ['Schedule Task', 'Start Execution', 'Complete task']

    return {
      taskId,
      mySteps,
    }
  },
}
</script>
