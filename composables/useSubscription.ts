import { useSubscriptionStore } from '~/stores/subscriptionStore'
import { useToast } from '~/composables/useToast'

export const useSubscription = () => {
  const subscriptionStore = useSubscriptionStore()
  const toast = useToast()

  const subscribe = async (planId: string) => {
    try {
      const response = await subscriptionStore.subscribe(planId)
      toast.success('Abonnement souscrit avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la souscription')
      throw error
    }
  }

  return {
    currentSubscription: computed(() => subscriptionStore.currentSubscription),
    loading: computed(() => subscriptionStore.loading),
    subscribe
  }
}