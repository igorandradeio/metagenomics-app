<template>
  <div class="bg-body-tertiary mt-5 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <div class="clearfix">
                <CImage align="start" :src="logo" :height="32" />
              </div>
              <CForm
                class="row needs-validation"
                novalidate
                :validated="validatedForm"
                @submit.prevent="handleSubmit"
              >
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="First name"
                    v-model="formData.first_name"
                    feedbackInvalid="This field is required"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    placeholder="Last name"
                    v-model="formData.last_name"
                    feedbackInvalid="This field is required"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="Email"
                    autocomplete="email"
                    v-model="formData.email"
                    feedbackInvalid="This field is required"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="formData.password"
                    feedbackInvalid="This field is required"
                    required
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="primary" type="submit">
                    <span v-if="loading">
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                      Submitting
                    </span>
                    <span v-else>Create Account</span>
                  </CButton>
                </div>
              </CForm>
              <div class="d-grid mt-3">
                <CButton @click="login" color="info" variant="ghost"
                  >Already have an account? Sign in</CButton
                >
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/users'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import logo from '@/assets/brand/logo-colorful.svg'

export default {
  name: 'Register',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()
    const userStore = useUserStore()
    const notification = ref()
    const validatedForm = ref(false)

    const loading = ref(false)

    const login = () => {
      router.push({ name: 'login' })
    }
    const formData = reactive({
      first_name: '',
      last_name: '',
      email: '',
      password: '',
    })

    const handleSubmit = (event) => {
      const form = event.currentTarget
      validatedForm.value = true
      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loading.value = true

        userStore
          .register({
            first_name: formData.first_name,
            last_name: formData.last_name,
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            toast.success('The user has been created')
            router.push({ name: 'dashboard.home' })
          })
          .catch(() => {
            toast.error(t('notification.errorMessage'))
          })
          .finally(() => {
            loading.value = false
          })
      }
    }
    return {
      logo,
      login,
      validatedForm,
      handleSubmit,
      loading,
      formData,
      notification,
    }
  },
}
</script>
