import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useRoles = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const roles = ref([])

  const fetchRoles = async () => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetRoles {
          roles {
            id
            name
            description
          }
        }
      `)

      if (error) throw error
      roles.value = data.roles
      return data.roles
    } catch (error: any) {
      toast.error('Erreur lors du chargement des rôles')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    roles: computed(() => roles.value),
    loading: computed(() => loading.value),
    fetchRoles
  }
}

export default useRoles