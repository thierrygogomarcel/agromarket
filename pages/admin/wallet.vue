<template>
    <!-- <div class="min-h-screen py-8"> -->
      <div class="card p-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Solde actuel -->
          <div class="card p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-2">Solde actuel</h2>
            <p class="text-3xl font-bold text-primary-600">{{ formatPrice(balance) }} FCFA</p>
          </div>
  
          <!-- Statistiques -->
          <div class="card p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-2">Transactions du mois</h2>
            <p class="text-3xl font-bold text-primary-600">{{ monthlyTransactions }}</p>
          </div>
  
          <div class="card p-6">
            <h2 class="text-lg font-medium text-gray-900 mb-2">Volume mensuel</h2>
            <p class="text-3xl font-bold text-primary-600">{{ formatPrice(monthlyVolume) }} FCFA</p>
          </div>
        </div>
  
        <!-- Actions -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <!-- Recharger -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Recharger mon compte</h2>
            <form @submit.prevent="handleTopUp" class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Montant</label>
                <div class="mt-1 relative rounded-md shadow-sm">
                  <input
                    type="number"
                    v-model="topUpAmount"
                    min="500"
                    step="500"
                    required
                    class="block w-full pr-12 border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  />
                  <div class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span class="text-gray-500 sm:text-sm">FCFA</span>
                  </div>
                </div>
              </div>
  
              <div>
                <label class="block text-sm font-medium text-gray-700">Mode de paiement</label>
                <select
                  v-model="paymentMethod"
                  required
                  class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 rounded-md"
                >
                  <option value="momo">MTN Mobile Money</option>
                  <option value="om">Orange Money</option>
                  <option value="wave">Wave</option>
                </select>
              </div>
  
              <button
                type="submit"
                :disabled="loading"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                {{ loading ? 'Traitement...' : 'Recharger' }}
              </button>
            </form>
          </div>
  
          <!-- Historique -->
          <div class="card p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">Dernières transactions</h2>
            <div class="space-y-4">
              <div v-for="transaction in recentTransactions" :key="transaction.id" 
                   class="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  <p class="font-medium text-gray-900">
                    {{ transaction.type === 'credit' ? 'Rechargement' : 'Retrait' }}
                  </p>
                  <p class="text-sm text-gray-500">{{ formatDate(transaction.date) }}</p>
                </div>
                <p :class="[
                  'font-bold',
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ transaction.type === 'credit' ? '+' : '-' }}{{ formatPrice(transaction.amount) }} FCFA
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'
  import { useWallet } from '~/composables/useWallet'
  import { useToast } from '~/composables/useToast'
  
  const wallet = useWallet()
  const toast = useToast()
  
  const balance = ref(0)
  const monthlyTransactions = ref(0)
  const monthlyVolume = ref(0)
  const loading = ref(false)
  
  const topUpAmount = ref(1000)
  const paymentMethod = ref('momo')
  
  // Sample data for recent transactions
  const recentTransactions = ref([
    {
      id: 1,
      type: 'credit',
      amount: 50000,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 2,
      type: 'debit',
      amount: 15000,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ])
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('fr-FR').format(price)
  }
  
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }
  
  const handleTopUp = async () => {
    try {
      loading.value = true
      await wallet.topUp(topUpAmount.value)
      toast.success('Rechargement effectué avec succès')
      topUpAmount.value = 1000
    } catch (error) {
      toast.error('Erreur lors du rechargement')
    } finally {
      loading.value = false
    }
  }
  
  // Load wallet data
  const loadWalletData = async () => {
    try {
      loading.value = true
      // Here you would typically fetch the wallet data from your API
      balance.value = 150000 // Example value
      monthlyTransactions.value = 12
      monthlyVolume.value = 450000
    } catch (error) {
      toast.error('Erreur lors du chargement des données')
    } finally {
      loading.value = false
    }
  }
  
  onMounted(() => {
    loadWalletData()
  })
  </script>