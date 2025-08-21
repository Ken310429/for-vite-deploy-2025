// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/all.scss'

//PrimeVue
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message';
import Button from 'primevue/button';
// PrimeVue CSS
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'


const app = createApp(App)
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark-mode'  // 使用 options 物件
    }
  },
})

app.component('PrimeMenubar', Menubar)
app.component('Message', Message) // eslint-disable-line
app.component('Button', Button) // eslint-disable-line

app.mount('#app')
