import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { initializeApp } from 'firebase/app'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'

import Menubar from 'primevue/menubar'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Toast from 'primevue/toast'
import ToastService from 'primevue/toastservice'
import ProgressSpinner from 'primevue/progressspinner'
import Card from 'primevue/card'

import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import 'primeflex/themes/primeone-dark.css'
import './assets/main.css'

const firebaseConfig = {
  apiKey: 'AIzaSyBX-yJ-iDQk8ceAqJly20GaKCtbcQfPuTw',
  authDomain: 'interviews-6ec83.firebaseapp.com',
  projectId: 'interviews-6ec83',
  storageBucket: 'interviews-6ec83.appspot.com',
  messagingSenderId: '623392175144',
  appId: '1:623392175144:web:98c316ff3c540bf367711d'
}

initializeApp(firebaseConfig)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ToastService)
app.component('app-menubar', Menubar)
app.component('app-button', Button)
app.component('app-input-text', InputText)
app.component('app-toast', Toast)
app.component('app-progress-spinner', ProgressSpinner)
app.component('app-card', Card)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
