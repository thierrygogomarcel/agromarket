<template>
  <div class="card p-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tableau de bord vendeur</h1>
        <p class="mt-2 text-gray-600">Gérez vos produits et suivez vos ventes.</p>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Produits en vente</h2>
              <p class="text-3xl font-bold text-gray-900">{{ stats.productsCount || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Ventes totales</h2>
              <p class="text-3xl font-bold text-gray-900">{{ stats.salesCount || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Commandes en cours</h2>
              <p class="text-3xl font-bold text-gray-900">{{ stats.pendingOrders || 0 }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Profil utilisateur, Historique des transactions et Chat -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <!-- Profil utilisateur -->
        <UserProfile :user="user" @edit="handleEditProfile" />
        
        <!-- Historique des transactions -->
        <TransactionHistory 
          :transactions="transactions" 
          :loading="loadingTransactions" 
        />
        
        <!-- Chat -->
        <ChatWindow v-if="selectedUser" :recipientId="selectedUser" />
      </div>

      <!-- Actions rapides -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
          <div class="space-y-4">
            <NuxtLink
              to="/produits/publier"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span class="font-medium text-gray-700">Publier un produit</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/mes-produits"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span class="font-medium text-gray-700">Gérer mes produits</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Dernières ventes</h2>
          <div class="space-y-4">
            <div v-for="sale in recentSales" :key="sale.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{{ sale.product }}</p>
                <p class="text-sm text-gray-500">{{ sale.date }}</p>
              </div>
              <p class="font-bold text-primary-600">{{ sale.amount }} FCFA</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'

interface Transaction {
  id: string
  amount: number
  date: string
  // Add other properties as needed
}

interface Stats {
  productsCount: number;
  salesCount: number;
  pendingOrders: number;
}

const auth = useAuth()
const user = computed(() => auth.state.user)

const stats = ref<Stats>({
  productsCount: 0,
  salesCount: 0,
  pendingOrders: 0
})

const transactions = ref<Transaction[]>([])
const loadingTransactions = ref(false)
const selectedUser = ref<string | null>(null)

const recentSales = ref([
  {
    id: 1,
    product: 'Tomates Bio',
    amount: 15000,
    date: 'Aujourd\'hui, 14:30'
  },
  {
    id: 2,
    product: 'Bananes Plantain',
    amount: 12000,
    date: 'Hier, 16:45'
  }
])

const loadStats = async () => {
  try {
    const response = await $fetch<Stats>('/api/users/stats')
    stats.value = response
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

const loadTransactions = async () => {
  try {
    loadingTransactions.value = true
    const response = await $fetch<Transaction[]>('/api/transactions?role=producer')
    transactions.value = response
  } catch (error) {
    console.error('Error loading transactions:', error)
  } finally {
    loadingTransactions.value = false
  }
}

const handleEditProfile = () => {
  // Logique pour éditer le profil
}

onMounted(() => {
  loadStats()
  loadTransactions()
})
</script>