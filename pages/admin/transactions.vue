<template>
  <div class="min-h-screen py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="card p-6">
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Transactions</h1>
            <p class="mt-1 text-sm text-gray-500">
              Gérez et suivez toutes les transactions de la plateforme
            </p>
          </div>
          
          <!-- Filtres -->
          <div class="flex space-x-4">
            <select 
              v-model="selectedRole" 
              class="rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
            >
              <option value="all">Tous les types</option>
              <option value="buyer">Acheteurs</option>
              <option value="producer">Vendeurs</option>
            </select>
          </div>
        </div>

        <!-- Liste des transactions -->
        <div class="overflow-x-auto">
          <div v-if="loading" class="flex justify-center py-8">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          </div>

          <div v-else-if="!transactions.length" class="text-center py-8">
            <p class="text-gray-500">Aucune transaction trouvée</p>
          </div>

          <div v-else class="grid gap-4">
            <div v-for="transaction in paginatedTransactions" 
                 :key="transaction._id"
                 class="card p-4 hover:shadow-lg transition-shadow"
            >
              <div class="flex justify-between items-center">
                <div class="flex-1">
                  <div class="flex items-center space-x-4">
                    <div :class="[
                      'w-2 h-2 rounded-full',
                      getStatusColor(transaction.status)
                    ]"></div>
                    <div>
                      <h3 class="font-medium text-gray-900">
                        {{ transaction.productId?.name || 'Produit non disponible' }}
                      </h3>
                      <p class="text-sm text-gray-500">
                        {{ formatDate(transaction.createdAt) }}
                      </p>
                    </div>
                  </div>
                </div>

                <div class="flex-1 text-center">
                  <p class="text-sm text-gray-600">Acheteur</p>
                  <p class="font-medium">{{ transaction.buyerId?.fullName || 'Inconnu' }}</p>
                </div>

                <div class="flex-1 text-center">
                  <p class="text-sm text-gray-600">Vendeur</p>
                  <p class="font-medium">{{ transaction.sellerId?.fullName || 'Inconnu' }}</p>
                </div>

                <div class="flex-1 text-right">
                  <p class="text-lg font-bold text-primary-600">
                    {{ formatPrice(transaction.amount) }} FCFA
                  </p>
                  <p class="text-sm" :class="getStatusTextColor(transaction.status)">
                    {{ getStatusLabel(transaction.status) }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="mt-6 flex justify-between items-center">
            <p class="text-sm text-gray-700">
              Affichage de {{ startIndex + 1 }} à {{ endIndex }} sur {{ transactions.length }} transactions
            </p>
            <div class="flex space-x-2">
              <button
                @click="currentPage--"
                :disabled="currentPage <= 1"
                class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Précédent
              </button>
              <button
                @click="currentPage++"
                :disabled="currentPage >= totalPages"
                class="px-3 py-1 rounded border border-gray-300 disabled:opacity-50"
              >
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useToast } from '~/composables/useToast'

interface Transaction {
  _id: string
  amount: number
  status: 'pending' | 'completed' | 'cancelled'
  productId?: {
    name: string
  }
  buyerId?: {
    fullName: string
  }
  sellerId?: {
    fullName: string
  }
  createdAt: string
}

const toast = useToast()
const loading = ref(false)
const transactions = ref<Transaction[]>([])
const selectedRole = ref('all')
const currentPage = ref(1)
const itemsPerPage = 10

// Pagination
const totalPages = computed(() => Math.ceil(transactions.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, transactions.value.length))
const paginatedTransactions = computed(() => 
  transactions.value.slice(startIndex.value, endIndex.value)
)

// Formatters and helpers
const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('fr-FR').format(price)
}

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-400',
    completed: 'bg-green-400',
    cancelled: 'bg-red-400'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-400'
}

const getStatusTextColor = (status: string) => {
  const colors = {
    pending: 'text-yellow-600',
    completed: 'text-green-600',
    cancelled: 'text-red-600'
  }
  return colors[status as keyof typeof colors] || 'text-gray-600'
}

const getStatusLabel = (status: string) => {
  const labels = {
    pending: 'En attente',
    completed: 'Terminée',
    cancelled: 'Annulée'
  }
  return labels[status as keyof typeof labels] || status
}

// Load transactions
const loadTransactions = async () => {
  try {
    loading.value = true
    const response = await $fetch<Transaction[]>('/api/transactions', {
      params: { role: selectedRole.value === 'all' ? undefined : selectedRole.value }
    })
    transactions.value = response as Transaction[]
  } catch (error) {
    toast.error('Erreur lors du chargement des transactions')
  } finally {
    loading.value = false
  }
}

// Watch for role changes
watch(selectedRole, () => {
  currentPage.value = 1
  loadTransactions()
})

onMounted(() => {
  loadTransactions()
})
</script>