import { defineStore } from 'pinia'
import { ref } from 'vue'
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(true)
  let authReadyPromise = null
  let authReadyResolver = null

  function initializeAuth() {
    if (authReadyPromise) {
      return authReadyPromise
    }

    authReadyPromise = new Promise((resolve) => {
      authReadyResolver = resolve

      onAuthStateChanged(auth, (currentUser) => {
        user.value = currentUser
        loading.value = false
        if (authReadyResolver) {
          authReadyResolver()
          authReadyResolver = null
        }
      })
    })

    return authReadyPromise
  }

  function waitForAuth() {
    if (!loading.value) {
      return Promise.resolve()
    }
    if (authReadyPromise) {
      return authReadyPromise
    }
    return initializeAuth()
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
    waitForAuth,
    login,
    logout,
  }
})
