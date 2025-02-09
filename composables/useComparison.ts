import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
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
  const nhost = useNhostClient()
  const toast = useToast()
  const comparison = ref<ComparisonResult | null>(null)
  const loading = ref(false)

  const compareProducts = async (productIds: string[]) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query CompareProducts($productIds: [uuid!]!) {
          products(where: { id: { _in: $productIds } }) {
            id
            name
            description
            price
            category
            seller {
              id
              displayName
            }
          }
        }
      `, {
        variables: { productIds }
      })

      if (error) throw error

      const products = data.products
      const prices = products.map((p: any) => p.price)
      
      comparison.value = {
        products,
        differences: {
          price: {
            min: Math.min(...prices),
            max: Math.max(...prices),
            difference: Math.max(...prices) - Math.min(...prices)
          }
        }
      }

      return comparison.value
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