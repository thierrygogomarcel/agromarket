import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useReviews = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const reviews = ref<Record<string, any[]>>({})

  const createReview = async (data: {
    productId: string
    rating: number
    comment: string
  }) => {
    try {
      loading.value = true
      const { data: result, error } = await nhost.graphql.request(`
        mutation CreateReview($review: reviews_insert_input!) {
          insert_reviews_one(object: $review) {
            id
            product_id
            user_id
            rating
            comment
            created_at
          }
        }
      `, {
        variables: {
          review: {
            product_id: data.productId,
            rating: data.rating,
            comment: data.comment,
            user_id: nhost.auth.getUser()?.id
          }
        }
      })

      if (error) throw error
      
      // Update local reviews
      if (!reviews.value[data.productId]) {
        reviews.value[data.productId] = []
      }
      reviews.value[data.productId].push(result.insert_reviews_one)
      
      toast.success('Avis publié avec succès')
      return result.insert_reviews_one
    } catch (error: any) {
      toast.error('Erreur lors de la publication de l\'avis')
      throw error
    } finally {
      loading.value = false
    }
  }

  const loadReviews = async (productId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetProductReviews($productId: uuid!) {
          reviews(
            where: { product_id: { _eq: $productId } }
            order_by: { created_at: desc }
          ) {
            id
            rating
            comment
            created_at
            user {
              id
              displayName
              avatarUrl
            }
          }
        }
      `, {
        variables: { productId }
      })

      if (error) throw error
      reviews.value[productId] = data.reviews
      return data.reviews
    } catch (error: any) {
      toast.error('Erreur lors du chargement des avis')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    reviews: computed(() => reviews.value),
    createReview,
    loadReviews
  }
}