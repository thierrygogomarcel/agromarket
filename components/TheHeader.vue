<template>
  <header class="bg-gray-800 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <nav class="w-full px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <!-- Logo -->
          <div class="flex">
            <NuxtLink to="/" class="flex items-center space-x-2">
              <img 
                src="/logo.png"
                alt="GoGoMarket Logo" 
                class="h-10 w-10 rounded-lg object-cover" 
              />
              <span class="text-2xl font-bold text-white">GoGoMarket 2.0</span>
            </NuxtLink>
          </div>

          <!-- Navigation Menu -->
          <div class="flex items-center space-x-4">
            <!-- Menu for unauthenticated users -->
            <template v-if="!isAuthenticated">
              <form @submit.prevent="handleLogin" class="flex items-center space-x-4">
                <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <input
                    v-model="email"
                    type="email"
                    placeholder="Email"
                    class="pl-10 pr-4 py-2 border border-transparent rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white/10 text-white placeholder-gray-300"
                    required
                  />
                </div>
                <div class="relative">
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Mot de passe"
                    class="pl-10 pr-10 py-2 border border-transparent rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white/10 text-white placeholder-gray-300"
                    required
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
                <button
                  type="submit"
                  :disabled="loading"
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
                >
                  {{ loading ? 'Connexion...' : 'Se connecter' }}
                </button>
              </form>
            </template>

            <!-- Menu for authenticated users -->
            <template v-else>
              <div class="relative ml-3 group">
                <button @click="handleLogout" class="text-white hover:text-primary-100">Déconnexion</button>
              </div>
            </template>
          </div>
        </div>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useToast } from '~/composables/useToast'
import { useAuthenticated, useSignOut } from '@nhost/vue'

const toast = useToast()
const showPassword = ref(false)

const email = ref('')
const password = ref('')
const loading = ref(false)

const isAuthenticated = useAuthenticated()
const { signOut } = useSignOut()

const handleLogin = async () => {
  try {
    loading.value = true
    // Update the login logic to use the Nhost Vue authentication
    // For example:
    // const { error } = await auth.signIn({
    //   email: email.value,
    //   password: password.value,
    // })
    // if (error) {
    //   throw error
    // }
    toast.success('Connexion réussie')
    email.value = ''
    password.value = ''
  } catch (error: any) {
    toast.error('Email ou mot de passe incorrect')
  } finally {
    loading.value = false
  }
}

const handleLogout = async () => {
  await signOut()
  toast.success('Déconnexion réussie')
}
</script>