<!-- pages/connexion.vue -->

<template>
  <div class="min-h-screen flex items-start justify-center  px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full mt-2"> 
      <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Connectez-vous à votre compte
          </h2>
          <p class="text-sm text-gray-600">
            Ou
            <NuxtLink to="/inscription" class="font-medium text-primary-600 hover:text-primary-500">
              créez un nouveau compte
            </NuxtLink>
          </p>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
          <div class="space-y-4">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Adresse e-mail
              </label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="email"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="vous@exemple.com"
              />
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <input
                id="password"
                v-model="password"
                name="password"
                type="password"
                required
                class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Votre mot de passe"
              />
            </div>
          </div>

          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Erreur de connexion</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
          >
            <span v-if="loading">Connexion en cours...</span>
            <span v-else>Se connecter</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'

const auth = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref<string | null>(null)

const handleLogin = async () => {
  loading.value = true
  error.value = null

  try {
    await auth.login(email.value, password.value)
  } catch (err: any) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>