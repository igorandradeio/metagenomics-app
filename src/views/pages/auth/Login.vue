<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm
                  class="row g-3 needs-validation"
                  novalidate
                  :validated="validatedForm"
                  @submit.prevent="handleSubmit"
                >
                  <h1>Login</h1>
                  <p class="text-body-secondary">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      v-model="email"
                      feedbackValid="Looks good!"
                      feedbackInvalid="Please Enter a valid email address"
                      placeholder="E-mail"
                      name="email"
                      required
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      v-model="password"
                      name="password"
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      feedbackInvalid="Please enter your password"
                      required
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol>
                      <CAlert v-if="error.active" color="warning">{{ error.message }}</CAlert>
                    </CCol>
                  </CRow>
                  <CRow>
                    <CCol :xs="6">
                      <CButton :disabled="loading" color="primary" class="px-4" type="submit">
                        <span v-if="loading">
                          <CSpinner component="span" size="sm" aria-hidden="true" />
                          Loading...</span
                        >
                        <span v-else>Login</span>
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0"> Forgot password? </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Don't have an account ?</p>
                  <CButton @click="signup" color="light" variant="outline" class="mt-3">
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { useUserStore } from '@/stores/modules/users'

export default {
  name: 'Login',

  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    const error = reactive({
      message: '',
      status: 0,
      active: false,
    })

    const signup = () => {
      router.push({ name: 'signup' })
    }

    const validatedForm = ref(false)

    const handleSubmit = (event) => {
      const form = event.currentTarget

      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        validatedForm.value = true
        loading.value = true

        userStore
          .auth({
            email: email.value,
            password: password.value,
          })
          .then((response) => {
            router.push({ name: 'dasboard.home' })
          })
          .catch((errorResponse) => {
            error.active = true
            if (errorResponse.status == 401) {
              error.message = errorResponse.data
              error.status = errorResponse.status
            } else {
              error.message = 'Oops! Something went wrong'
            }
          })
          .finally(() => {
            loading.value = false
          })
      }
    }

    const loading = ref(false)

    const email = ref('')
    const password = ref('')

    return {
      signup,
      loading,
      email,
      password,
      validatedForm,
      handleSubmit,
      error,
    }
  },
}
</script>
