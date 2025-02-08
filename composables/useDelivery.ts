 
import { ref, computed } from 'vue'
import { useDeliveryStore } from '~/stores/deliveryStore'
import { useToast } from './useToast'

export const useDelivery = () => {
  const deliveryStore = useDeliveryStore()
  const toast = useToast()
  const estimatedFees = ref(null)

  const calculateDeliveryFees = async (data: {
    origin: { latitude: number; longitude: number }
    destination: { latitude: number; longitude: number }
    weight: number
  }) => {
    try {
      const response = await deliveryStore.calculateFees(data)
      estimatedFees.value = response
      return response
    } catch (error: any) {
      toast.error('Erreur lors du calcul des frais de livraison')
      throw error
    }
  }

  return {
    estimatedFees: computed(() => estimatedFees.value),
    loading: computed(() => deliveryStore.loading),
    calculateDeliveryFees
  }
} 