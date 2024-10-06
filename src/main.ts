import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import ToastService from 'primevue/toastservice'
import ConfirmationService from 'primevue/confirmationservice'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'
import Radio from 'primevue/radiobutton'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import ConfirmDialog from 'primevue/confirmdialog'
import Message from 'primevue/message'
import Badge from 'primevue/badge'
import InputNumber from 'primevue/inputnumber'
import DatePicker from 'primevue/datepicker'
import Textarea from 'primevue/textarea'
import Tooltip from 'primevue/tooltip'

import App from './App.vue'
import router from './router'
import { firebaseConfig } from '@/api'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-dark.css'
import './assets/main.css'

const firebaseApp = initializeApp(firebaseConfig)
export const db = getFirestore(firebaseApp)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.use(ConfirmationService)
app.directive('tooltip', Tooltip)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-input-number', InputNumber)
app.component('app-textarea', Textarea)
app.component('app-toast', Toast)
app.component('app-progress-spinner', ProgressSpinner)
app.component('app-card', Card)
app.component('app-radio', Radio)
app.component('app-datatable', DataTable)
app.component('app-column', Column)
app.component('app-dialog', ConfirmDialog)
app.component('app-message', Message)
app.component('app-badge', Badge)
app.component('app-calendar', DatePicker)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
