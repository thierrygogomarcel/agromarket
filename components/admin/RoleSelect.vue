<template>
    <div class="flex flex-col space-y-2">
      <label :for="roleSelectId" class="block text-sm font-medium text-gray-700">
        {{ label }}
      </label>
      <select
        :id="roleSelectId"
        v-model="selectedRole"
        class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        :disabled="loading"
      >
        <option v-for="role in roles" :key="role.id" :value="role.id">
          {{ role.name }}
        </option>
      </select>
  
      <!-- Loading indicator -->
      <div v-if="loading" class="flex items-center text-sm text-gray-500">
        <svg class="animate-spin h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
        Mise à jour...
      </div>
  
      <!-- Error message -->
      <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    </div>
  </template>
<!--   
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import useRoles from '~/composables/useRoles'
  import { useUserManagement } from '~/composables/useUserManagement'
  
  const props = defineProps<{
    userId: string
    currentRole: string
    label?: string
    id?: string
  }>()
  
  const emit = defineEmits<{
    (e: 'update:role', role: string): void
    (e: 'error', error: string): void
  }>()
  
  const { roles, fetchRoles } = useRoles()
  
  const { updateUserRole, loading } = useUserManagement()
  
  const selectedRole = ref(props.currentRole)
  const error = ref<string | null>(null)
  
  // Add a default value for id if not provided
  const roleSelectId = props.id || `role-select-${props.userId}`
  
  // Charger les rôles au montage du composant
  onMounted(async () => {
    try {
      await fetchRoles()
    } catch (err: any) {
      error.value = 'Erreur lors du chargement des rôles'
    }
  })
  
  // Observer les changements de rôle
  watch(selectedRole, async (newRole) => {
    if (newRole === props.currentRole) return
  
    try {
      error.value = null
      await updateUserRole(props.userId, newRole)
      emit('update:role', newRole)
    } catch (err: any) {
      error.value = err.message || 'Erreur lors de la mise à jour du rôle'
      emit('error', error.value)
      // Réinitialiser la sélection en cas d'erreur
      selectedRole.value = props.currentRole
    }
  })
  </script> -->