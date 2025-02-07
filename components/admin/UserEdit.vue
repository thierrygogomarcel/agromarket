<template>
    <div class="bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Modifier l'utilisateur
        </h3>
        
        <form @submit.prevent="handleSubmit" class="mt-5 space-y-6">
          <!-- Informataions de base -->
          <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label for="fullName" class="block text-sm font-medium text-gray-700">
                Nom complet
              </label>
              <input
                id="fullName"
                v-model="form.fullName"
                type="text"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
  
            <div>
              <label for="phone" class="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                required
                class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              />
            </div>
  
            <div>
              <RoleSelect
                :user-id="userId"
                :current-role="form.role"
                label="Rôle"
                @update:role="form.role = $event"
                @error="handleError"
              />
            </div>
          </div>
  
          <!-- Statut -->
          <div>
            <label class="text-sm font-medium text-gray-700">Statut</label>
            <div class="mt-2">
              <div class="flex items-center">
                <button
                  type="button"
                  :class="[
                    'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500',
                    form.status === 'active' ? 'bg-primary-600' : 'bg-gray-200'
                  ]"
                  @click="toggleStatus"
                >
                  <span
                    :class="[
                      'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                      form.status === 'active' ? 'translate-x-5' : 'translate-x-0'
                    ]"
                  />
                </button>
                <span class="ml-3 text-sm">
                  {{ form.status === 'active' ? 'Actif' : 'Inactif' }}
                </span>
              </div>
            </div>
          </div>
  
          <!-- Message d'erreur -->
          <div v-if="error" class="rounded-md bg-red-50 p-4">
            <div class="flex">
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">Erreur</h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ error }}</p>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Actions -->
          <div class="flex justify-end space-x-3">
            <button
              type="button"
              class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              @click="$emit('cancel')"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="loading"
              class="inline-flex justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              {{ loading ? 'Enregistrement...' : 'Enregistrer' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import RoleSelect from './RoleSelect.vue'
  
  const props = defineProps<{
    userId: string
    userData: {
      fullName: string
      email: string
      phone: string
      role: string
      status: 'active' | 'inactive'
    }
  }>()
  
  const emit = defineEmits<{
    (e: 'update', data: any): void
    (e: 'cancel'): void
  }>()
  
  const form = ref({ ...props.userData })
  const loading = ref(false)
  const error = ref<string | null>(null)
  
  const toggleStatus = () => {
    form.value.status = form.value.status === 'active' ? 'inactive' : 'active'
  }
  
  const handleError = (message: string) => {
    error.value = message
  }
  
  const handleSubmit = async () => {
    try {
      loading.value = true
      error.value = null
  
      // Appel API pour mettre à jour l'utilisateur
      const response = await $fetch(`/api/users/${props.userId}`, {
        method: 'PUT',
        body: form.value
      })
  
      emit('update', response)
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour'
    } finally {
      loading.value = false
    }
  }
  </script>