// src/main.js
import { createApp } from 'vue'
import * as quasarExports from 'quasar'
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/dist/quasar.css'
import App from './App.vue'
import router from './router'

const { Quasar, Notify } = quasarExports

createApp(App)
  .use(Quasar, {
    components: Object.fromEntries(
      Object.entries(quasarExports).filter(([key]) => key.startsWith('Q') && key[1] === key[1].toUpperCase())
    ),
    plugins: { Notify },
    config: {
      brand: {
        primary: '#D32F2F',
        secondary: '#B71C1C',
        accent: '#FF5252',
        dark: '#1d1d1d',
        positive: '#21BA45',
        negative: '#C10015',
        info: '#31CCEC',
        warning: '#F2C037'
      }
    }
  })
  .use(router)
  .mount('#app')