import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import Menubar from 'primevue/menubar'

import App from './App.vue'
import router from './router'

import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('app-menubar', Menubar)
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.mount('#app')
