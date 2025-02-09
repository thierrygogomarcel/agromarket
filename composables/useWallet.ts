import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useWallet = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const balance = ref(0)

  const fetchBalance = async () => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetWalletBalance {
          wallets(where: { user_id: { _eq: auth.uid() } }) {
            balance
          }
        }
      `)

      if (error) throw error
      balance.value = data.wallets[0]?.balance || 0
      return balance.value
    } catch (error: any) {
      toast.error('Erreur lors du chargement du solde')
      throw error
    } finally {
      loading.value = false
    }
  }

  const topUp = async (amount: number) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation TopUpWallet($amount: numeric!) {
          update_wallets(
            where: { user_id: { _eq: auth.uid() } },
            _inc: { balance: $amount }
          ) {
            returning {
              balance
            }
          }
        }
      `, {
        variables: { amount }
      })

      if (error) throw error
      balance.value = data.update_wallets.returning[0].balance
      toast.success('Rechargement effectué avec succès')
      return balance.value
    } catch (error: any) {
      toast.error('Erreur lors du rechargement')
      throw error
    } finally {
      loading.value = false
    }
  }

  const withdraw = async (amount: number) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation WithdrawFromWallet($amount: numeric!) {
          update_wallets(
            where: {
              user_id: { _eq: auth.uid() },
              balance: { _gte: $amount }
            },
            _inc: { balance: -$amount }
          ) {
            returning {
              balance
            }
          }
        }
      `, {
        variables: { amount }
      })

      if (error) throw error
      
      if (!data.update_wallets.returning.length) {
        throw new Error('Solde insuffisant')
      }

      balance.value = data.update_wallets.returning[0].balance
      toast.success('Retrait effectué avec succès')
      return balance.value
    } catch (error: any) {
      toast.error('Erreur lors du retrait')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    balance: computed(() => balance.value),
    loading: computed(() => loading.value),
    fetchBalance,
    topUp,
    withdraw
  }
}