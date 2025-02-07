```vue
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <h3 class="text-lg font-medium text-gray-900 mb-4">Recharger mon portefeuille</h3>

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <label for="amount" class="block text-sm font-medium text-gray-700">
          Montant (FCFA)
        </label>
        <input
          id="amount"
          v-model="amount"
          type="number"
          min="500"
          step="500"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <div>
        <label for="paymentMethod" class="block text-sm font-medium text-gray-700">
          Moyen de paiement
        </label>
        <select
          id="paymentMethod"
          v-model="paymentMethod"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        >
          <option value="momo">MTN Mobile Money</option>
          <option value="om">Orange Money</option>
          <option value="wave">Wave</option>
        </select>
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        <span v-if="loading">Traitement en cours...</span>
        <span v-else>Recharger</span>
      </button>
    </form>

    <!-- Modal de confirmation -->
    <div v-if="showConfirmation" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-lg font-medium text-gray-900 mb-4">Confirmation de paiement</h3>
        <p class="text-gray-600 mb-4">
          Veuillez confirmer le paiement de {{ amount }} FCFA via {{ getPaymentMethodLabel }}.
        </p>
        <div class="flex justify-end space-x-3">
          <button
            @click="showConfirmation = false"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
          >
            Annuler
          </button>
          <button
            @click="confirmPayment"
            class="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-md"
          >
            Confirmer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useWallet } from '~/composables/useWallet'
import { useToast } from '~/composables/useToast'

const wallet = useWallet()
const toast = useToast()

const amount = ref(1000)
const paymentMethod = ref('momo')
const loading = ref(false)
const showConfirmation = ref(false)

const getPaymentMethodLabel = computed(() => {
  const methods = {
    momo: 'MTN Mobile Money',
    om: 'Orange Money',
    wave: 'Wave'
  }
  return methods[paymentMethod.value as keyof typeof methods]
})

const handleSubmit = () => {
  if (amount.value < 500) {
    toast.error('Le montant minimum est de 500 FCFA')
    return
  }
  showConfirmation.value = true
}

const confirmPayment = async () => {
  try {
    loading.value = true
    await wallet.topUp(amount.value)
    toast.success('Rechargement effectué avec succès')
    showConfirmation.value = false
    amount.value = 1000
  } catch (error: any) {
    toast.error(error.message || 'Erreur lors du rechargement')
  } finally {
    loading.value = false
  }
}
</script>
```