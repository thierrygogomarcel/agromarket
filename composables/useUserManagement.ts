 
import { ref } from 'vue'
import { useToast } from './useToast'

interface User {
  id: string
  email: string
  fullName: string
  userType: string
  role: string
  status: 'active' | 'inactive'
}

export const useUserManagement = () => {
  const loading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  const updateUserRole = async (userId: string, role: string) => {
    try {
      loading.value = true
      const response = await $fetch(`/api/users/${userId}/role`, {
        method: 'PUT',
        body: { role }
      })
      toast.success('Rôle mis à jour avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du rôle')
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateUserStatus = async (userId: string, status: 'active' | 'inactive') => {
    try {
      loading.value = true
      const response = await $fetch(`/api/users/${userId}/status`, {
        method: 'PUT',
        body: { status }
      })
      toast.success('Statut mis à jour avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du statut')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    updateUserRole,
    updateUserStatus
  }
} 