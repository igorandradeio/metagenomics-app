<template>
  <div class="bg-body-tertiary mt-5 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm
                class="row needs-validation"
                novalidate
                :validated="validatedFormProfile"
                @submit.prevent="profileSubmit"
              >
                <h4>Profile</h4>
                <p class="text-body-secondary">Edit your profile</p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="First name"
                    maxlength="40"
                    v-model="formProfile.first_name"
                    feedbackInvalid="Please enter your first name"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput
                    type="text"
                    placeholder="Last name"
                    maxlength="40"
                    v-model="formProfile.last_name"
                    feedbackInvalid="Please enter your last name"
                    required
                  />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput
                    type="email"
                    placeholder="Email"
                    maxlength="254"
                    v-model="formProfile.email"
                    feedbackInvalid="Please enter a valid email address"
                    disabled
                    readonly
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="primary" type="submit">
                    <span v-if="loadingProfile">
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                      Submitting
                    </span>
                    <span v-else>Save</span>
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <CRow class="justify-content-center mt-3">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm
                class="row needs-validation"
                novalidate
                :validated="validatedFormPassword"
                @submit.prevent="passwordSubmit"
              >
                <h4>Change password</h4>
                <p class="text-body-secondary">
                  Enter a new password below to change your password
                </p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="New password"
                    maxlength="100"
                    v-model="password"
                    feedbackInvalid="Please enter the new password"
                    required
                  />
                </CInputGroup>
                <div class="d-grid">
                  <CButton color="primary" type="submit">
                    <span v-if="loadingPassword">
                      <CSpinner component="span" size="sm" aria-hidden="true" />
                      Submitting
                    </span>
                    <span v-else>Save</span>
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { onMounted, reactive, ref } from 'vue'
import AuthService from '@/services/auth.service'
import { useUserStore } from '@/stores/users'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import logo from '@/assets/brand/logo-colorful.svg'

export default {
  name: 'Profile',
  setup() {
    const { t } = useI18n({ useScope: 'global' })
    const toast = useToast()
    const router = useRouter()
    const notification = ref()
    const validatedFormProfile = ref(false)
    const validatedFormPassword = ref(false)

    const loadingProfile = ref(false)
    const loadingPassword = ref(false)

    const userStore = useUserStore()

    const login = () => {
      router.push({ name: 'login' })
    }
    const formProfile = reactive({
      first_name: '',
      last_name: '',
      email: '',
    })

    const password = ref('')

    const profileSubmit = (event) => {
      const form = event.currentTarget

      validatedFormProfile.value = true

      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loadingProfile.value = true

        AuthService.updateProfile({
          first_name: formProfile.first_name,
          last_name: formProfile.last_name,
        })
          .then(() => {
            toast.success('Your profile has been updated')
          })
          .catch((errorResponse) => {
            toast.error(t('notification.errorMessage'))
          })
          .finally(() => {
            loadingProfile.value = false
          })
      }
    }

    const passwordSubmit = (event) => {
      const form = event.currentTarget

      validatedFormPassword.value = true

      if (form.checkValidity() === true) {
        event.preventDefault()
        event.stopPropagation()

        loadingPassword.value = true

        AuthService.changePassword({
          password: password.value,
        })
          .then(() => {
            toast.success('Your password has been changed')
          })
          .catch((errorResponse) => {
            toast.error(t('notification.errorMessage'))
          })
          .finally(() => {
            loadingPassword.value = false
          })
      }
    }

    onMounted(() => {
      formProfile.first_name = userStore.user.first_name
      formProfile.last_name = userStore.user.last_name
      formProfile.email = userStore.user.email
    })

    return {
      logo,
      login,
      validatedFormProfile,
      validatedFormPassword,
      profileSubmit,
      passwordSubmit,
      loadingProfile,
      loadingPassword,
      formProfile,
      password,
      notification,
    }
  },
}
</script>
