<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Type de compte -->
    <div>
      <label for="userType" class="block text-sm font-medium text-gray-700">
        Type de compte
      </label>
      <select
        id="userType"
        v-model="form.userType"
        required
        class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      >
        <option value="producer">Vendeur</option>
        <option value="buyer">Acheteur</option>
        <option value="transport">Transporteur</option>
      </select>
    </div>

    <!-- Type d'entité -->
    <div>
      <label for="entityType" class="block text-sm font-medium text-gray-700">
        Type d'entité
      </label>
      <select
        id="entityType"
        v-model="form.entityType"
        required
        class="mt-1 block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
      >
        <option value="particulier">Particulier</option>
        <option value="structure_privee">Structure Privée</option>
        <option value="ong">ONG</option>
      </select>
    </div>

    <!-- Nom complet -->
    <div>
      <label for="fullName" class="block text-sm font-medium text-gray-700">
        Nom complet
      </label>
      <input
        id="fullName"
        v-model="form.fullName"
        type="text"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        placeholder="Votre nom complet"
      />
    </div>

    <!-- Email -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">
        Adresse e-mail
      </label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        placeholder="vous@exemple.com"
      />
    </div>

    <!-- Téléphone -->
    <div>
      <label for="phone" class="block text-sm font-medium text-gray-700">
        Numéro de téléphone
      </label>
      <input
        id="phone"
        v-model="form.phone"
        type="tel"
        required
        class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        placeholder="+225 XX XX XX XX XX"
      />
    </div>
<!-- Password field -->
<div>
<label for="password" class="block text-sm font-medium text-gray-700">
  Mot de passe
</label>
<div class="relative">
  <input
    id="password"
    v-model="form.password"
    :type="showPassword ? 'text' : 'password'"
    required
    minlength="6"
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
    placeholder="Minimum 6 caractères"
  />
  <button 
    type="button"
    @click="showPassword = !showPassword"
    class="absolute inset-y-0 right-0 pr-3 flex items-center"
  >
    <svg v-if="showPassword" class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <svg v-else class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  </button>
</div>
</div>

<!-- Confirm Password field -->
<div>
<label for="confirmPassword" class="block text-sm font-medium text-gray-700">
  Confirmer le mot de passe
</label>
<div class="relative">
  <input
    id="confirmPassword"
    v-model="form.confirmPassword"
    :type="showConfirmPassword ? 'text' : 'password'"
    required
    class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
    placeholder="Confirmez votre mot de passe"
  />
  <button 
    type="button"
    @click="showConfirmPassword = !showConfirmPassword"
    class="absolute inset-y-0 right-0 pr-3 flex items-center"
  >
    <svg v-if="showConfirmPassword" class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
    <svg v-else class="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  </button>
</div>
</div>

    <!-- Message d'erreur -->
    <div v-if="error" class="rounded-md bg-red-50 p-4">
      <div class="flex">
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Erreur d'inscription</h3>
          <div class="mt-2 text-sm text-red-700">
            <p>{{ error }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Bouton de soumission -->
    <button
      type="submit"
      :disabled="loading || !isValid"
      class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
    >
      <span v-if="loading">Inscription en cours...</span>
      <span v-else>S'inscrire</span>
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useCustomAuth'

const router = useRouter()
const auth = useAuth()
  const showPassword = ref(false)
const showConfirmPassword = ref(false)


interface RegisterForm {
  userType: 'producer' | 'buyer' | 'transport'
  entityType: 'particulier' | 'structure_privee' | 'ong'
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
}

const form = ref<RegisterForm>({
  userType: 'buyer',
  entityType: 'particulier',
  fullName: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: ''
})

const loading = ref(false)
const error = ref<string | null>(null)

// Validation du formulaire
const isValid = computed(() => {
  return (
    form.value.fullName.length >= 2 &&
    form.value.email.includes('@') &&
    form.value.phone.length >= 8 &&
    form.value.password.length >= 6 &&
    form.value.password === form.value.confirmPassword
  )
})

const handleSubmit = async () => {
  if (!isValid.value) return

  try {
    loading.value = true
    error.value = null

    const { confirmPassword, ...userData } = form.value
    await auth.register(userData)
    
    router.push('/connexion')
  } catch (err: any) {
    error.value = err.message || 'Une erreur est survenue lors de l\'inscription'
  } finally {
    loading.value = false
  }
}
</script>