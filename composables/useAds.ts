 
import { ref, computed } from 'vue'
import { useAdsStore } from '~/stores/adsStore'
import { useToast } from './useToast'

export const useAds = () => {
  const adsStore = useAdsStore()
  const toast = useToast()

  const createAd = async (data: {
    productId: string
    duration: number
    budget: number
  }) => {
    try {
      const response = await adsStore.createAd(data)
      toast.success('Annonce sponsorisée créée avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la création de l\'annonce')
      throw error
    }
  }

  const getSponsoredAds = async (filters?: any) => {
    try {
      return await adsStore.getSponsoredAds(filters)
    } catch (error: any) {
      toast.error('Erreur lors du chargement des annonces sponsorisées')
      throw error
    }
  }

  return {
    loading: computed(() => adsStore.loading),
    createAd,
    getSponsoredAds
  }
} 