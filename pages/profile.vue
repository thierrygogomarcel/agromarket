<template>
  <div class="card p-8" style="min-width: 600px; margin: 0 auto;">
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-green-600 mb-8">Mon Profil</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Photo de profil -->
        <div class="flex items-center space-x-4">
          <img 
            :src="form.avatarUrl || '/images/profile.png'" 
            alt="Photo de profil"
            class="h-20 w-20 rounded-full object-cover"
          />
          <div>
            <label class="block text-sm font-medium text-gray-700">Photo de profil</label>
            <input 
              type="file" 
              accept="image/*"
              @change="handleImageUpload"
              class="mt-1"
            />
          </div>
        </div>

        <!-- Informations personnelles -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label class="block text-sm font-medium text-gray-700">Nom complet</label>
            <input 
              v-model="form.fullName"
              type="text"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Email</label>
            <input 
              v-model="form.email"
              type="email"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Téléphone</label>
            <input 
              v-model="form.phone"
              type="tel"
              required
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700">Type de compte</label>
            <select 
              v-model="form.userType"
              disabled
              class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 bg-gray-100"
            >
              <option value="producer">Producteur</option>
              <option value="buyer">Acheteur</option>
              <option value="transport">Transporteur</option>
            </select>
          </div>
        </div>

        <!-- Boutons d'action -->
        <div class="flex justify-end space-x-4">
          <button
            type="button"
            @click="$router.back()"
            class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'
import { useToast } from '~/composables/useToast'

const auth = useAuth()
const toast = useToast()
const loading = ref(false)

const form = ref({
  fullName: '',
  email: '',
  phone: '',
  userType: '',
  avatarUrl: ''
})

onMounted(() => {
  if (auth.state.user) {
    form.value = { ...auth.state.user }
  }
})

const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  if (!input.files?.length) return

  const file = input.files[0]
  const formData = new FormData()
  formData.append('avatar', file)

  try {
    loading.value = true
    const response = await $fetch('/api/users/avatar', {
      method: 'PATCH',
      body: formData
    })
    form.value.avatarUrl = response.avatarUrl
    toast.success('Photo de profil mise à jour')
  } catch (error) {
    toast.error('Erreur lors de la mise à jour de la photo')
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  try {
    loading.value = true
    const response = await $fetch(`/api/users/${auth.state.user?.id}`, {
      method: 'PUT',
      body: form.value
    })
    auth.state.user = response
    toast.success('Profil mis à jour avec succès')
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du profil')
  } finally {
    loading.value = false
  }
}
</script>