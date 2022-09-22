import { createApp } from 'vue'
import { createPinia } from 'pinia'
import store from './stores/map'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.config.globalProperties.$store = store;
app.mount('#app')
