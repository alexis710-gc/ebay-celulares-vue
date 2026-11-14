// src/main.js
import { createApp } from 'vue'
import * as quasarExports from 'quasar'
import iconSet from 'quasar/icon-set/material-symbols-rounded'
import '@quasar/extras/material-symbols-rounded/material-symbols-rounded.css'
import '@fontsource-variable/fraunces'
import '@fontsource-variable/nunito'
import 'quasar/dist/quasar.css'
import './styles/theme.css'
import App from './App.vue'
import router from './router'

const { Quasar, Notify } = quasarExports

createApp(App)
  .use(Quasar, {
    iconSet,
    components: Object.fromEntries(
      Object.entries(quasarExports).filter(([key]) => key.startsWith('Q') && key[1] === key[1].toUpperCase())
    ),
    plugins: { Notify },
    config: {
      // Nombres sueltos (search, visibility...) salen en Material Symbols Rounded.
      // Los que ya traen prefijo se dejan como están.
      iconMapFn: (name) => {
        if (/^(sym_|o_|r_|s_|mdi-|fa-|ion-|eva-|bi-|img:|svguse:)/.test(name)) return
        return { icon: 'sym_r_' + name }
      },
      brand: {
        primary: '#C62828',
        secondary: '#4A1214',
        accent: '#FF7A59',
        dark: '#2B1416',
        positive: '#2E9E6B',
        negative: '#B71C1C',
        info: '#D9825B',
        warning: '#FFB547'
      }
    }
  })
  .use(router)
  .mount('#app')