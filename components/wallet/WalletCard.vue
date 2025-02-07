<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold">Mon Portefeuille</h2>
      <span class="text-3xl font-bold text-primary-600">{{ balance }} FCFA</span>
    </div>

    <div class="grid grid-cols-2 gap-4">
      <button
        @click="showTopUpModal = true"
        class="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
      >
        Recharger
      </button>
      
      <button
        @click="showWithdrawModal = true"
        class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
      >
        Retirer
      </button>
    </div>

    <!-- Modal de rechargement -->
    <div v-if="showTopUpModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Recharger mon portefeuille</h3>
        <input
          type="number"
          v-model="topUpAmount"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          placeholder="Montant"
        />
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="showTopUpModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="handleTopUp"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Recharger
          </button>
        </div>
      </div>
    </div>

    <!-- Modal de retrait -->
    <div v-if="showWithdrawModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded-lg max-w-md w-full">
        <h3 class="text-lg font-medium mb-4">Retirer des fonds</h3>
        <input
          type="number"
          v-model="withdrawAmount"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
          placeholder="Montant"
        />
        <div class="mt-4 flex justify-end space-x-2">
          <button
            @click="showWithdrawModal = false"
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            @click="handleWithdraw"
            :disabled="loading"
            class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
          >
            Retirer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useWallet } from '~/composables/useWallet'

const { balance, topUp, withdraw } = useWallet()

const showTopUpModal = ref(false)
const showWithdrawModal = ref(false)
const topUpAmount = ref(0)
const withdrawAmount = ref(0)
const loading = ref(false)

const handleTopUp = async () => {
  try {
    loading.value = true
    await topUp(topUpAmount.value)
    showTopUpModal.value = false
    topUpAmount.value = 0
  } finally {
    loading.value = false
  }
}

const handleWithdraw = async () => {
  try {
    loading.value = true
    await withdraw(withdrawAmount.value)
    showWithdrawModal.value = false
    withdrawAmount.value = 0
  } finally {
    loading.value = false
  }
}
</script>