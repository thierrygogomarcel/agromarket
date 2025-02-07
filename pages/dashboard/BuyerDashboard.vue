<template>
  <div class="card p-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tableau de bord acheteur</h1>
        <p class="mt-2 text-gray-600">Suivez vos achats et découvrez de nouveaux produits.</p>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Achats totaux</h2>
              <p class="text-3xl font-bold text-gray-900">{{ stats.purchasesCount || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">Favoris</h2>
              <p class="text-3xl font-bold text-gray-900">{{ stats.favoritesCount || 0 }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-primary-100 text-primary-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <h2 class="text-lg font-semibold text-gray-700">En attente</h2>
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
              to="/explorer"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span class="font-medium text-gray-700">Explorer les produits</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </NuxtLink>
            <NuxtLink
              to="/favoris"
              class="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100"
            >
              <span class="font-medium text-gray-700">Mes favoris</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-semibold text-gray-900 mb-4">Derniers achats</h2>
          <div class="space-y-4">
            <div v-for="purchase in recentPurchases" :key="purchase.id" class="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p class="font-medium text-gray-900">{{ purchase.product }}</p>
                <p class="text-sm text-gray-500">{{ purchase.date }}</p>
              </div>
              <p class="font-bold text-primary-600">{{ purchase.amount }} FCFA</p>
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

const auth = useAuth()
const user = computed(() => auth.state.user)

interface UserStats {
  purchasesCount: number;
  favoritesCount: number;
  pendingOrders: number;
}

const stats = ref<UserStats>({
  purchasesCount: 0,
  favoritesCount: 0,
  pendingOrders: 0
})

interface Transaction {
  id: string;
  amount: number;
  date: string;
  // Add other relevant fields based on your transaction structure
}

const transactions = ref<Transaction[]>([])
const loadingTransactions = ref(false)
const selectedUser = ref<string | null>(null)

const recentPurchases = ref([
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
    const response = await $fetch<UserStats>('/api/users/stats')
    stats.value = response
  } catch (error) {
    console.error('Error loading stats:', error)
  }
}

async function loadTransactions() {
  try {
    loadingTransactions.value = true
    const response = await $fetch('/api/transactions?role=buyer')
    transactions.value = response as Transaction[]
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