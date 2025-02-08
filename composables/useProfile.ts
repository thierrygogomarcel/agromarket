 
import { ref, computed } from 'vue'
import { useToast } from './useToast'

interface UserProfile {
  id: string
  email: string
  fullName: string
  phone: string
  avatarUrl?: string
  userType: string
  role: string
}

export const useProfile = () => {
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)
  const toast = useToast()

  const fetchProfile = async (userId: string) => {
    try {
      loading.value = true
      const response = await $fetch(`/api/users/${userId}/profile`)
      profile.value = response
    } catch (error: any) {
      toast.error('Erreur lors du chargement du profil')
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateAvatar = async (file: File) => {
    try {
      loading.value = true
      const formData = new FormData()
      formData.append('avatar', file)
      
      const response = await $fetch('/api/users/avatar', {
        method: 'PATCH',
        body: formData
      })
      
      profile.value = {
        ...profile.value!,
        avatarUrl: response.avatarUrl
      }
      
      toast.success('Avatar mis à jour avec succès')
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour de l\'avatar')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    profile: computed(() => profile.value),
    loading: computed(() => loading.value),
    fetchProfile,
    updateAvatar
  }
} 