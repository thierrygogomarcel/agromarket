import { useWalletStore } from '~/stores/walletStore'
import { useToast } from '~/composables/useToast'
import { ref, computed } from 'vue'

export const useWallet = () => {
  const walletStore = useWalletStore()
  const toast = useToast()
  const loading = ref(false)

  const topUp = async (amount: number) => {
    try {
      loading.value = true
      const response = await walletStore.topUp(amount)
      toast.success('Rechargement effectué avec succès')
      return response
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
      const response = await walletStore.withdraw(amount)
      toast.success('Retrait effectué avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors du retrait')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    topUp,
    withdraw,
    balance: computed(() => walletStore.balance),
    loading,
  }
}
