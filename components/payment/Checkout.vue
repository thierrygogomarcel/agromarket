<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Paiement</h2>
    
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Montant</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">FCFA</span>
          </div>
          <input
            type="number"
            v-model="amount"
            class="focus:ring-primary-500 focus:border-primary-500 block w-full pl-16 pr-12 sm:text-sm border-gray-300 rounded-md"
            placeholder="0.00"
          />
        </div>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Mode de paiement</label>
        <select
          v-model="paymentMethod"
          class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
        >
          <option value="momo">MTN Mobile Money</option>
          <option value="om">Orange Money</option>
          <option value="wallet">Portefeuille</option>
        </select>
      </div>

      <button
        @click="handlePayment"
        :disabled="loading"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
      >
        <span v-if="loading">Traitement en cours...</span>
        <span v-else>Payer maintenant</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { usePayments } from '~/composables/usePayments'

const amount = ref(0)
const paymentMethod = ref('momo')
const loading = ref(false)

const { initiatePayment } = usePayments()

const handlePayment = async () => {
  try {
    loading.value = true
    await initiatePayment({
      amount: amount.value,
      method: paymentMethod.value
    })
  } catch (error) {
    console.error('Payment error:', error)
  } finally {
    loading.value = false
  }
}
</script>