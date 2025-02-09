import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const usePayments = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)

  const initiatePayment = async (data: {
    amount: number
    method: string
    description?: string
  }) => {
    try {
      loading.value = true
      const { data: result, error } = await nhost.graphql.request(`
        mutation InitiatePayment($payment: payments_insert_input!) {
          insert_payments_one(object: $payment) {
            id
            amount
            method
            status
            created_at
          }
        }
      `, {
        variables: {
          payment: {
            amount: data.amount,
            method: data.method,
            description: data.description,
            user_id: nhost.auth.getUser()?.id,
            status: 'pending'
          }
        }
      })

      if (error) throw error
      toast.success('Paiement initié avec succès')
      return result.insert_payments_one
    } catch (error: any) {
      toast.error('Erreur lors de l\'initiation du paiement')
      throw error
    } finally {
      loading.value = false
    }
  }

  const checkStatus = async (transactionId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query CheckPaymentStatus($id: uuid!) {
          payments_by_pk(id: $id) {
            id
            status
            updated_at
          }
        }
      `, {
        variables: { id: transactionId }
      })

      if (error) throw error
      return data.payments_by_pk
    } catch (error: any) {
      toast.error('Erreur lors de la vérification du statut')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    initiatePayment,
    checkStatus
  }
}