import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useDelivery = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const estimatedFees = ref(null)

  const calculateDeliveryFees = async (data: {
    origin: { latitude: number; longitude: number }
    destination: { latitude: number; longitude: number }
    weight: number
  }) => {
    try {
      loading.value = true
      const { data: result, error } = await nhost.graphql.request(`
        mutation CalculateDeliveryFees($input: delivery_calculation_input!) {
          calculate_delivery_fees(input: $input) {
            amount
            estimated_time
            distance
          }
        }
      `, {
        variables: {
          input: {
            origin_lat: data.origin.latitude,
            origin_lng: data.origin.longitude,
            dest_lat: data.destination.latitude,
            dest_lng: data.destination.longitude,
            weight: data.weight
          }
        }
      })

      if (error) throw error
      estimatedFees.value = result.calculate_delivery_fees
      return result.calculate_delivery_fees
    } catch (error: any) {
      toast.error('Erreur lors du calcul des frais de livraison')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    estimatedFees: computed(() => estimatedFees.value),
    loading: computed(() => loading.value),
    calculateDeliveryFees
  }
}