import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNhostClient } from '@nhost/vue'
import type { User } from '@nhost/core'

interface AuthState {
  user: User | null
  loading: boolean
}

export const useCustomAuth = defineStore('auth', () => {
  const nhost = useNhostClient()
  const state = ref<AuthState>({
    user: null,
    loading: false,
  })

  const isAuthenticated = computed(() => !!state.value.user)

  async function login(email: string, password: string) {
    try {
      state.value.loading = true
      const { session, error } = await nhost.auth.signIn({
        email,
        password,
      })

      if (error) throw error

      state.value.user = session?.user ?? null
      return session
    } catch (error: any) {
      console.error('Login error:', error)
      throw new Error(error.message)
    } finally {
      state.value.loading = false
    }
  }

  async function register(data: {
    email: string
    password: string
    fullName: string
    userType: string
    entityType: string
    phone: string
  }) {
    try {
      state.value.loading = true
      const { session, error } = await nhost.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          displayName: data.fullName,
          metadata: {
            userType: data.userType,
            entityType: data.entityType,
            phone: data.phone
          }
        }
      })

      if (error) throw error

      state.value.user = session?.user ?? null
      return session
    } catch (error: any) {
      console.error('Registration error:', error)
      throw new Error(error.message)
    } finally {
      state.value.loading = false
    }
  }

  async function logout() {
    try {
      state.value.loading = true
      const { error } = await nhost.auth.signOut()
      if (error) throw error
      
      state.value.user = null
    } catch (error: any) {
      console.error('Logout error:', error)
      throw new Error(error.message)
    } finally {
      state.value.loading = false
    }
  }

  // Initialize auth state
  nhost.auth.onAuthStateChanged((event, session) => {
    state.value.user = session?.user ?? null
  })

  return {
    state,
    isAuthenticated,
    login,
    register,
    logout
  }
})