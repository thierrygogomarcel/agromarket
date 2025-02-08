
import { ref, computed } from 'vue'
import { useToast } from './useToast'

interface ComparisonResult {
  products: any[]
  differences: {
    price: {
      min: number
      max: number
      difference: number
    }
  }
}

export const useComparison = () => {
  const comparison = ref<ComparisonResult | null>(null)
  const loading = ref(false)
  const toast = useToast()

  const compareProducts = async (productIds: string[]) => {
    try {
      loading.value = true
      const response = await $fetch('/api/products/compare', {
        method: 'POST',
        body: { productIds }
      })
      comparison.value = response
    } catch (error: any) {
      toast.error('Erreur lors de la comparaison des produits')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    comparison: computed(() => comparison.value),
    loading: computed(() => loading.value),
    compareProducts
  }
} 