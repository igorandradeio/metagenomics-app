import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import DocsExample from '@/components/DocsExample'
import { createI18n } from 'vue-i18n'
import { en } from '@/locales/en.js'
import { pt_br } from '@/locales/pt_br.js'

const languages = {
  en,
  pt_br,
}

const i18n = createI18n({
  legacy: false,
  locale: 'pt_br',
  fallbackLocale: 'en',
  messages: languages,
})

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)
app.use(i18n)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsExample', DocsExample)

app.mount('#app')
