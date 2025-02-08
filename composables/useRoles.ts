import { ref, computed } from 'vue'
import { useToast } from './useToast'

export default function useRoles() {
  const roles = ref([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const toast = useToast()

  const fetchRoles = async () => {
    try {
      loading.value = true
      const response = await $fetch('/api/users/roles')
      roles.value = response
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