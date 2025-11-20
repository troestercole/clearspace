import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Import views
import LoginView from '@/views/LoginView.vue'

// Define routes
const routes = [{ path: '/login', component: LoginView, meta: { requiresAuth: false } }]

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware to check if user is authenticated
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  if (to.meta.requiresAuth && !authStore.user) {
    next({ name: 'Login' })
  } else if (to.path == '/login' && authStore.user) {
    next('/')
  } else {
    next()
  }
})

export default router
