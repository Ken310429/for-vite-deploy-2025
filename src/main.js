// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//PrimeVue
import PrimeVue from 'primevue/config'
import Menubar from 'primevue/menubar'
import Message from 'primevue/message';
// PrimeVue CSS
import Aura from '@primeuix/themes/aura'


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
// eslint-disable-next-line
app.component('Message', Message)

app.mount('#app')
