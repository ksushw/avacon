import './assets/styles/main.scss'
import './assets/styles/mixins.scss'
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot?.invalidate())

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueTelegram from 'vue-tg'
import VueGtag from 'vue-gtag'

import App from './App.vue'
import router from './router'

const app = createApp(App)
// @ts-ignore
app.use(VueTelegram)
app.use(createPinia())
app.use(router)
app.use(VueGtag, {
  enabled: import.meta.env.NODE_ENV === 'production',
  config: {
    id: 'G-SFHSQTH3SC'
  }
})

app.mount('#app')
