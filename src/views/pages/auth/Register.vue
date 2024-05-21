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
              <CForm>
                <h1>Register</h1>
                <p class="text-body-secondary">Create your account</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="First name" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Last name" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput type="password" placeholder="Password" autocomplete="new-password" />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="success">Create Account</CButton>
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
import logo from '@/assets/brand/logo-colorful.svg'

export default {
  name: 'Register',

  setup() {
    const router = useRouter()

    const login = () => {
      router.push({ name: 'login' })
    }

    return {
      logo,
      login,
    }
  },
}
</script>
