import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)

  function initializeAuth() {
    onAuthStateChanged(auth, (currentUser) => {
      user.value = currentUser
      loading.value = false
    })
  }

  async function login() {
    loading.value = true
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      user.value = result.user
    } catch (error) {
      console.error('Error signing in:', error)
    } finally {
      loading.value = false
    }
  }

  async function logout() {
    loading.value = true
    try {
      await signOut(auth)
      user.value = null
    } catch (error) {
      console.error('Error signing out:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    initializeAuth,
    login,
    logout,
  }
})
