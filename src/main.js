import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useAuthStore } from './stores/authStore'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

const authStore = useAuthStore()
authStore.initializeAuth()

app.mount('#app')
