<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <UserProfile 
      :user="user" 
      :is-editing="isEditing"
      @edit="startEditing"
      @update="updateProfile"
      @cancel="cancelEditing"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'
import { useToast } from '~/composables/useToast'

interface User {
  id?: string
  email: string
  fullName: string
  userType: 'admin' | 'producer' | 'buyer' | 'transport'
  role: string
  status: 'active' | 'inactive'
  avatarUrl?: string
  phone?: string
  entityType?: string
}

const auth = useAuth()
const toast = useToast()
const user = computed(() => auth.state.user)
const isEditing = ref(false)

const startEditing = () => {
  isEditing.value = true
}

const cancelEditing = () => {
  isEditing.value = false
}

const updateProfile = async (data: any) => {
  try {
    const response = await $fetch(`/api/users/${user.value?.id}`, {
      method: 'PUT',
      body: data,
      headers: {
        Authorization: `Bearer ${auth.state.token}`
      }
    })
    
    // Update local user data
    auth.state.user = {
      ...(auth.state.user as User),
      ...(response as User)
    }
    
    toast.success('Profil mis à jour avec succès')
    isEditing.value = false
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du profil')
  }
}
</script>
