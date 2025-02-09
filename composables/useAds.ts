import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useAds = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const ads = ref([])

  const createAd = async (data: {
    productId: string
    duration: number
    budget: number
  }) => {
    try {
      loading.value = true
      const { data: result, error } = await nhost.graphql.request(`
        mutation CreateAd($ad: ads_insert_input!) {
          insert_ads_one(object: $ad) {
            id
            product_id
            duration
            budget
            status
            created_at
          }
        }
      `, {
        variables: {
          ad: {
            product_id: data.productId,
            duration: data.duration,
            budget: data.budget,
            status: 'active'
          }
        }
      })

      if (error) throw error
      toast.success('Annonce sponsorisée créée avec succès')
      return result.insert_ads_one
    } catch (error: any) {
      toast.error('Erreur lors de la création de l\'annonce')
      throw error
    } finally {
      loading.value = false
    }
  }

  const getSponsoredAds = async (filters?: any) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetSponsoredAds($filters: ads_bool_exp) {
          ads(where: $filters, order_by: {created_at: desc}) {
            id
            product_id
            duration
            budget
            status
            created_at
            product {
              name
              description
              price
              images
            }
          }
        }
      `, {
        variables: { filters }
      })

      if (error) throw error
      ads.value = data.ads
      return data.ads
    } catch (error: any) {
      toast.error('Erreur lors du chargement des annonces sponsorisées')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    ads: computed(() => ads.value),
    createAd,
    getSponsoredAds
  }
}