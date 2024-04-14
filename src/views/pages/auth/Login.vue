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
                  <h1>{{ $t('formLogin.signInTitle') }}</h1>
                  <p class="text-body-secondary">{{ $t('formLogin.signInMessage') }}</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      type="email"
                      v-model="email"
                      :feedbackValid="$t('formLogin.feedbackValid')"
                      :feedbackInvalid="$t('formLogin.invalidEmail')"
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
                      :placeholder="$t('formLogin.password')"
                      :feedbackInvalid="$t('formLogin.invalidPassword')"
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
                          Logging in...</span
                        >
                        <span v-else>Login</span>
                      </CButton>
                    </CCol>
                    <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        {{ $t('formLogin.forgotPassword') }}
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>{{ $t('formLogin.signUpTitle') }}</h2>
                  <p>{{ $t('formLogin.signUpMessage') }}</p>
                  <CButton @click="signup" color="light" variant="outline" class="mt-3">
                    {{ $t('formLogin.registerButton') }}
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
import { useUserStore } from '@/stores/users'
import { useI18n } from 'vue-i18n'

export default {
  name: 'Login',

  setup() {
    const { t } = useI18n({ useScope: 'global' })
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
            router.push({ name: 'dashboard.home' })
          })
          .catch((errorResponse) => {
            error.active = true
            error.message = t('formLogin.genericError')

            if (!errorResponse) {
              error.message = t('formLogin.networkError')
            } else if (errorResponse.status === 401) {
              error.message = t('formLogin.passwordError')
              error.status = errorResponse.status
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
