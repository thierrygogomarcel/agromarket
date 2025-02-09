import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useTransaction = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const transactions = ref([])

  const fetchTransactions = async (filters?: any) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetTransactions($filters: transactions_bool_exp) {
          transactions(
            where: $filters,
            order_by: { created_at: desc }
          ) {
            id
            amount
            status
            created_at
            buyer {
              id
              displayName
            }
            seller {
              id
              displayName
            }
            product {
              id
              name
              price
            }
          }
        }
      `, {
        variables: { filters }
      })

      if (error) throw error
      transactions.value = data.transactions
      return data.transactions
    } catch (error: any) {
      toast.error('Erreur lors du chargement des transactions')
      throw error
    } finally {
      loading.value = false
    }
  }

  const createTransaction = async (data: {
    productId: string
    amount: number
    sellerId: string
  }) => {
    try {
      loading.value = true
      const { data: result, error } = await nhost.graphql.request(`
        mutation CreateTransaction($transaction: transactions_insert_input!) {
          insert_transactions_one(object: $transaction) {
            id
            amount
            status
            created_at
          }
        }
      `, {
        variables: {
          transaction: {
            product_id: data.productId,
            amount: data.amount,
            seller_id: data.sellerId,
            buyer_id: nhost.auth.getUser()?.id,
            status: 'pending'
          }
        }
      })

      if (error) throw error
      toast.success('Transaction créée avec succès')
      return result.insert_transactions_one
    } catch (error: any) {
      toast.error('Erreur lors de la création de la transaction')
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateTransactionStatus = async (id: string, status: 'completed' | 'cancelled') => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation UpdateTransactionStatus($id: uuid!, $status: String!) {
          update_transactions_by_pk(
            pk_columns: { id: $id },
            _set: { status: $status }
          ) {
            id
            status
            updated_at
          }
        }
      `, {
        variables: { id, status }
      })

      if (error) throw error
      toast.success('Statut de la transaction mis à jour')
      return data.update_transactions_by_pk
    } catch (error: any) {
      toast.error('Erreur lors de la mise à jour du statut')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    transactions: computed(() => transactions.value),
    loading: computed(() => loading.value),
    fetchTransactions,
    createTransaction,
    updateTransactionStatus
  }
}