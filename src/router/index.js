import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/authStore'

// Import views
import LoginView from '@/views/LoginView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import BoardView from '@/views/BoardView.vue'

// Define routes
const routes = [
  { path: '/login', component: LoginView, meta: { requiresAuth: false } },
  { path: '/', component: BoardView, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', component: NotFoundView, meta: { requiresAuth: false } },
]

// Create router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Middleware to check if user is authenticated
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()
  await authStore.waitForAuth()

  if (to.meta.requiresAuth && !authStore.user) {
    next({ path: '/login' })
  } else if (to.path === '/login' && authStore.user) {
    next('/')
  } else {
    next()
  }
})

export default router
