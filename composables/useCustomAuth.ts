import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useNhostClient } from '@nhost/vue'
import type { User } from '@nhost/core'
import { useToast } from './useToast'

interface AuthState {
  user: User | null
  loading: boolean
  token: string | null
}

export const useAuth = defineStore('auth', () => {
  const nhost = useNhostClient()
  const toast = useToast()
  
  const state = ref<AuthState>({
    user: null,
    loading: false,
    token: null
  })

  const isAuthenticated = computed(() => !!state.value.user)

  async function login(email: string, password: string) {
    try {
      state.value.loading = true
      const { session, error } = await nhost.auth.signIn({
        email,
        password
      })

      if (error) throw error

      state.value.user = session?.user ?? null
      state.value.token = session?.accessToken ?? null
      
      toast.success('Connexion réussie')
      return session
    } catch (error: any) {
      toast.error('Email ou mot de passe incorrect')
      throw error
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
      state.value.token = session?.accessToken ?? null
      
      toast.success('Inscription réussie')
      return session
    } catch (error: any) {
      toast.error('Erreur lors de l\'inscription')
      throw error
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
      state.value.token = null
      
      toast.success('Déconnexion réussie')
    } catch (error: any) {
      toast.error('Erreur lors de la déconnexion')
      throw error
    } finally {
      state.value.loading = false
    }
  }

  // Initialize auth state
  nhost.auth.onAuthStateChanged((event, session) => {
    state.value.user = session?.user ?? null
    state.value.token = session?.accessToken ?? null
  })

  return {
    state,
    isAuthenticated,
    login,
    register,
    logout
  }
})