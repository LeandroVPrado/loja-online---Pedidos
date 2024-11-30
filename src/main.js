//importação dos estilos .css
import './assets/global-css.css'
import './assets/dashboard-css.css'
import './assets/login-css.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
