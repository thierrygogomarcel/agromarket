import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
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
  const nhost = useNhostClient()
  const toast = useToast()
  const profile = ref<UserProfile | null>(null)
  const loading = ref(false)

  const fetchProfile = async (userId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetUserProfile($userId: uuid!) {
          users_by_pk(id: $userId) {
            id
            email
            displayName
            metadata
            avatarUrl
          }
        }
      `, {
        variables: { userId }
      })

      if (error) throw error

      const user = data.users_by_pk
      profile.value = {
        id: user.id,
        email: user.email,
        fullName: user.displayName,
        phone: user.metadata?.phone || '',
        avatarUrl: user.avatarUrl,
        userType: user.metadata?.userType || '',
        role: user.metadata?.role || 'user'
      }
    } catch (error) {
      toast.error('Erreur lors du chargement du profil')
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateAvatar = async (file: File) => {
    try {
      loading.value = true
      
      // Upload file to Nhost Storage
      const { error: uploadError, fileMetadata } = await nhost.storage.upload({
        file,
        bucketId: 'avatars'
      })

      if (uploadError) throw uploadError

      // Update user avatar URL
      const { error: updateError } = await nhost.auth.updateUserAvatar({
        avatarUrl: fileMetadata.downloadUrl
      })

      if (updateError) throw updateError

      if (profile.value) {
        profile.value.avatarUrl = fileMetadata.downloadUrl
      }
      
      toast.success('Avatar mis à jour avec succès')
    } catch (error) {
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