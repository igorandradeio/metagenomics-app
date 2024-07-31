<template>
  <div>
    <CRow>
      <CCol :sm="12" :lg="12">
        <CRow>
          <CCol :xs="12">
            <div class="border-start border-start-4 border-start-info py-1 px-3 mb-3">
              <div class="text-body-secondary small fw-semibold">Task Id:</div>
              <div class="fs-5">{{ taskId }}</div>
            </div>
          </CCol>
        </CRow>
        <hr class="mt-0" />

        <CRow>
          <div class="d-grid col-2 mx-auto">
            <CButton color="danger" variant="outline" class="mb-3">STOP TASK</CButton>
          </div>
        </CRow>
        <CRow>
          <div>
            <CProgress>
              <CProgressBar :value="progressValue" :max="maxValue"
                >{{ progressValue }}%</CProgressBar
              >
            </CProgress>
            <div class="steps">
              <div
                v-for="(step, index) in steps"
                :key="index"
                :class="['step', { active: currentStep === index + 1 }]"
              >
                {{ step }}
              </div>
            </div>
            <div class="step-content">
              <slot :name="'step-' + currentStep"></slot>
            </div>
          </div>
        </CRow>
      </CCol>
    </CRow>
  </div>
</template>
<script>
import { CProgress, CProgressBar } from '@coreui/vue'
import { computed } from 'vue'

export default {
  name: 'StepProgress',
  components: {
    CProgress,
    CProgressBar,
  },
  props: {
    id: {
      required: true,
    },
    steps: {
      type: Array,
      required: true,
    },
    currentStep: {
      type: Number,
      default: 1,
    },
  },
  setup(props) {
    const taskId = props.id
    const maxValue = computed(() => props.steps.length)
    const progressValue = computed(() => (props.currentStep / maxValue.value) * 100)

    return {
      taskId,
      maxValue,
      progressValue,
    }
  },
}
</script>

<style>
.steps {
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
  position: relative;
}

.step {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.step.active {
  background-color: #007bff;
  color: white;
}

.step-content {
  margin-top: 20px;
}
</style>
