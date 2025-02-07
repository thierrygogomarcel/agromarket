<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- En-tête -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Tableau de bord administrateur</h1>
        <p class="mt-2 text-gray-600">Gérez les utilisateurs, les produits et les transactions de la plateforme.</p>
      </div>

      <!-- Statistiques -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div v-for="(stat, index) in statsCards" :key="index" 
             class="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
          <div class="flex items-center">
            <div :class="[stat.iconBg, 'rounded-full p-3']">
              <svg :class="stat.iconClass" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path :d="stat.iconPath" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
              </svg> 
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium text-gray-500">{{ stat.title }}</div>
              <div class="text-lg font-semibold text-gray-900">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal en 2 colonnes -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Actions rapides -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Actions rapides</h2>
          <div class="space-y-3">
            <NuxtLink v-for="action in quickActions" :key="action.to"
                     :to="action.to"
                     class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <span class="font-medium text-gray-700">{{ action.label }}</span>
              <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </NuxtLink>
          </div>
        </div>

        <!-- Derniers utilisateurs -->
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Derniers utilisateurs</h2>
          <div class="space-y-4">
            <div v-if="loading" class="flex justify-center py-4">
              <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            </div>
            <template v-else>
              <div v-for="user in recentUsers" :key="user._id" 
                   class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div class="flex items-center">
                  <img :src="getUserAvatar(user)" :alt="user.fullName" 
                       class="h-10 w-10 rounded-full object-cover" />
                  <div class="ml-3">
                    <div class="text-sm font-medium text-gray-900">{{ user.fullName }}</div>
                    <div class="text-sm text-gray-500">{{ user.email }}</div>
                  </div>
                </div>
                <span :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                ]">
                  {{ user.status }}
                </span>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'

interface User {
  _id: string
  fullName: string
  email: string
  status: 'active' | 'inactive'
  avatarUrl?: string
}

interface DashboardStats {
  totalUsers: number
  totalProducts: number
  totalTransactions: number
  totalRevenue: number
}

const auth = useAuth()
const loading = ref(true)
const stats = ref<DashboardStats>({
  totalUsers: 0,
  totalProducts: 0,
  totalTransactions: 0,
  totalRevenue: 0
})

const recentUsers = ref<User[]>([])

const statsCards = computed(() => [
  {
    title: 'Utilisateurs',
    value: stats.value.totalUsers,
    iconBg: 'bg-blue-100 text-blue-600',
    iconClass: 'h-6 w-6',
    iconPath: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
  },
  {
    title: 'Produits',
    value: stats.value.totalProducts,
    iconBg: 'bg-green-100 text-green-600',
    iconClass: 'h-6 w-6',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    title: 'Transactions',
    value: stats.value.totalTransactions,
    iconBg: 'bg-yellow-100 text-yellow-600',
    iconClass: 'h-6 w-6',
    iconPath: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
  },
  {
    title: 'Revenus',
    value: `${stats.value.totalRevenue} FCFA`,
    iconBg: 'bg-purple-100 text-purple-600',
    iconClass: 'h-6 w-6',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
])

const quickActions = [
  { label: 'Gérer les utilisateurs', to: '/admin/utilisateurs' },
  { label: 'Gérer les produits', to: '/admin/produits' },
  { label: 'Voir les transactions', to: '/admin/transactions' }
]

const getUserAvatar = (user: User): string => {
  return user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`
}

const loadDashboardData = async () => {
  try {
    loading.value = true
    
    // Ajouter le token d'authentification
    const headers = {
      'Authorization': `Bearer ${auth.state.token}`
    }

    const [statsData, usersData] = await Promise.all([
      $fetch('/api/admin/stats', { headers }) as Promise<DashboardStats>,
      $fetch('/api/admin/recent-users', { headers }) as Promise<User[]>
    ])

    // Vérifier que les données sont bien reçues
    console.log('Stats reçues:', statsData)
    console.log('Utilisateurs récents reçus:', usersData)

    if (statsData) {
      stats.value = statsData
    }

    if (Array.isArray(usersData)) {
      recentUsers.value = usersData
    }
  } catch (error) {
    console.error('Erreur lors du chargement des données:', error)
  } finally {
    loading.value = false
  }
}

// S'assurer que l'utilisateur est admin avant de charger les données
onMounted(() => {
  if (auth.state.user?.role === 'admin') {
    loadDashboardData()
  } else {
    console.error('Accès non autorisé')
  }
})
</script>