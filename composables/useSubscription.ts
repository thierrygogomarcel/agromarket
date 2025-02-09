import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useSubscription = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const currentSubscription = ref(null)

  const subscribe = async (planId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation CreateSubscription($subscription: subscriptions_insert_input!) {
          insert_subscriptions_one(object: $subscription) {
            id
            plan_id
            user_id
            status
            current_period_start
            current_period_end
            created_at
          }
        }
      `, {
        variables: {
          subscription: {
            plan_id: planId,
            user_id: nhost.auth.getUser()?.id,
            status: 'active'
          }
        }
      })

      if (error) throw error
      currentSubscription.value = data.insert_subscriptions_one
      toast.success('Abonnement souscrit avec succès')
      return data.insert_subscriptions_one
    } catch (error: any) {
      toast.error('Erreur lors de la souscription')
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchCurrentSubscription = async () => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetCurrentSubscription {
          subscriptions(
            where: {
              user_id: { _eq: auth.uid() },
              status: { _eq: "active" }
            },
            limit: 1
          ) {
            id
            plan_id
            status
            current_period_start
            current_period_end
            created_at
            plan {
              name
              description
              price
              features
            }
          }
        }
      `)

      if (error) throw error
      currentSubscription.value = data.subscriptions[0] || null
      return currentSubscription.value
    } catch (error: any) {
      toast.error('Erreur lors du chargement de l\'abonnement')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    currentSubscription: computed(() => currentSubscription.value),
    loading: computed(() => loading.value),
    subscribe,
    fetchCurrentSubscription
  }
}