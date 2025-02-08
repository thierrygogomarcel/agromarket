import { usePaymentStore } from '~/stores/paymentStore'
import { useToast } from '~/composables/useToast'

export const usePayments = () => {
  const paymentStore = usePaymentStore()
  const toast = useToast()

  const initiatePayment = async (data: any) => {
    try {
      const response = await paymentStore.initiatePayment(data)
      toast.success('Paiement initié avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de l\'initiation du paiement')
      throw error
    }
  }

  const checkStatus = async (transactionId: string) => {
    try {
      return await paymentStore.checkTransactionStatus(transactionId)
    } catch (error: any) {
      toast.error('Erreur lors de la vérification du statut')
      throw error
    }
  }

  return {
    initiatePayment,
    checkStatus
  }
}