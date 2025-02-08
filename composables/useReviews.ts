import { useReviewStore } from '~/stores/reviewStore'
import { useToast } from '~/composables/useToast'

export const useReviews = () => {
  const reviewStore = useReviewStore()
  const toast = useToast()

  const createReview = async (data: { productId: string; rating: number; comment: string }) => {
    try {
      const response = await reviewStore.createReview(data)
      toast.success('Avis publié avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la publication de l\'avis')
      throw error
    }
  }

  const loadReviews = async (productId: string) => {
    try {
      return await reviewStore.loadReviews(productId)
    } catch (error: any) {
      toast.error('Erreur lors du chargement des avis')
      throw error
    }
  }

  return {
    createReview,
    loadReviews,
    reviews: computed(() => reviewStore.reviews)
  }
}