<template>
  <!-- <div class="min-h-screen bg-gray-50 py-8"> -->
    <div class="card p-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow p-6">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestion des utilisateurs</h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ filteredUsers.length }} utilisateur(s) trouvé(s)
            </p>
          </div>
          <button
            @click="exportUsers"
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
          >
            <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Exporter
          </button>
        </div>

        <!-- Filtres -->
        <div class="mb-6 flex flex-wrap gap-4">
          <div class="flex-1 min-w-[200px]">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher un utilisateur..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            v-model="selectedUserType"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Tous les types</option>
            <option value="producer">Producteurs</option>
            <option value="buyer">Acheteurs</option>
            <option value="transport">Transporteurs</option>
            <option value="admin">Administrateurs</option>
          </select>
          <select
            v-model="selectedEntityType"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Toutes les entités</option>
            <option value="particulier">Particuliers</option>
            <option value="structure_privee">Structures Privées</option>
            <option value="ong">ONG</option>
          </select>
          <select
            v-model="selectedStatus"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>

        <!-- Liste des utilisateurs -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date d'inscription
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="user in paginatedUsers" :key="user._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        :src="user.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user.fullName}`"
                        class="h-10 w-10 rounded-full object-cover"
                        :alt="user.fullName"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ user.fullName }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ user.email }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getUserTypeClass(user.userType)"
                  >
                    {{ getUserTypeLabel(user.userType) }}
                  </span>
                  <span
                    class="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800"
                  >
                    {{ getEntityTypeLabel(user.entityType) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': user.status === 'active',
                      'bg-red-100 text-red-800': user.status === 'inactive'
                    }"
                  >
                    {{ user.status === 'active' ? 'Actif' : 'Inactif' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatDate(user.createdAt) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="toggleUserStatus(user)"
                    class="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    {{ user.status === 'active' ? 'Désactiver' : 'Activer' }}
                  </button>
                  <button
                    v-if="user.role !== 'admin'"
                    @click="deleteUser(user._id)"
                    class="text-red-600 hover:text-red-900"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="mt-4 flex items-center justify-between">
          <div class="flex-1 flex justify-between sm:hidden">
            <button
              @click="currentPage--"
              :disabled="currentPage === 1"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Précédent
            </button>
            <button
              @click="currentPage++"
              :disabled="currentPage >= totalPages"
              class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Suivant
            </button>
          </div>
          <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p class="text-sm text-gray-700">
                Affichage de
                <span class="font-medium">{{ startIndex + 1 }}</span>
                à
                <span class="font-medium">{{ endIndex }}</span>
                sur
                <span class="font-medium">{{ filteredUsers.length }}</span>
                résultats
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[
                    currentPage === page
                      ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium'
                  ]"
                >
                  {{ page }}
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useToast } from '~/composables/useToast'
import { useAuth } from '~/composables/useCustomAuth'

interface User {
  _id: string
  email: string
  fullName: string
  phone: string
  userType: 'producer' | 'buyer' | 'transport' | 'admin'
  entityType: 'particulier' | 'structure_privee' | 'ong'
  role: 'producer' | 'buyer' | 'transport' | 'admin'
  status: 'active' | 'inactive'
  avatarUrl?: string
  createdAt: Date
}

const auth = useAuth()
const toast = useToast()

const users = ref<User[]>([])
const searchQuery = ref('')
const selectedUserType = ref('')
const selectedEntityType = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const loading = ref(false)

// Filtrer les utilisateurs
const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = (
      user.fullName.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    const matchesType = !selectedUserType.value || user.userType === selectedUserType.value
    const matchesEntityType = !selectedEntityType.value || user.entityType === selectedEntityType.value
    const matchesStatus = !selectedStatus.value || user.status === selectedStatus.value
    return matchesSearch && matchesType && matchesEntityType && matchesStatus
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredUsers.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredUsers.value.length))
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  return filteredUsers.value.slice(startIndex, startIndex + itemsPerPage)
})

// Formatage et labels
const formatDate = (date: Date) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const getUserTypeLabel = (userType: string) => {
  const labels = {
    producer: 'Producteur',
    buyer: 'Acheteur',
    transport: 'Transporteur',
    admin: 'Administrateur'
  }
  return labels[userType as keyof typeof labels] || userType
}

const getEntityTypeLabel = (entityType: string) => {
  const labels = {
    particulier: 'Particulier',
    structure_privee: 'Structure Privée',
    ong: 'ONG'
  }
  return labels[entityType as keyof typeof labels] || entityType
}

const getUserTypeClass = (userType: string) => {
  const classes = {
    producer: 'bg-green-100 text-green-800',
    buyer: 'bg-blue-100 text-blue-800',
    transport: 'bg-yellow-100 text-yellow-800',
    admin: 'bg-purple-100 text-purple-800'
  }
  return classes[userType as keyof typeof classes] || 'bg-gray-100 text-gray-800'
}

// Actions
const toggleUserStatus = async (user: User) => {
  try {
    const newStatus = user.status === 'active' ? 'inactive' : 'active'
    await $fetch(`/api/users/${user._id}`, {
      method: 'PUT',
      body: { status: newStatus },
      headers: {
        Authorization: `Bearer ${auth.state.token}`
      }
    })
    user.status = newStatus
    toast.success(`Statut de l'utilisateur mis à jour`)
  } catch (error) {
    toast.error('Erreur lors de la mise à jour du statut')
  }
}

const deleteUser = async (userId: string) => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) return
  
  try {
    await $fetch(`/api/users/${userId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.state.token}`
      }
    })
    users.value = users.value.filter(user => user._id !== userId)
    toast.success('Utilisateur supprimé avec succès')
  } catch (error) {
    toast.error('Erreur lors de la suppression')
  }
}

const exportUsers = () => {
  const data = filteredUsers.value.map(user => ({
    'Nom complet': user.fullName,
    'Email': user.email,
    'Type': getUserTypeLabel(user.userType),
    'Entité': getEntityTypeLabel(user.entityType),
    'Statut': user.status === 'active' ? 'Actif' : 'Inactif',
    'Date d\'inscription': formatDate(user.createdAt)
  }))

  const csv = [
    Object.keys(data[0]).join(','),
    ...data.map(row => Object.values(row).join(','))
  ].join('\n')

  const blob = new Blob([csv], { type: 'text/csv' })
  const url = window.URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'utilisateurs.csv'
  a.click()
  window.URL.revokeObjectURL(url)
}

// Charger les utilisateurs
const loadUsers = async () => {
  loading.value = true
  try {
    interface UserListResponse {
      users: User[]
    }

    const response = await $fetch<UserListResponse>('/api/users/list', {
      headers: {
        Authorization: `Bearer ${auth.state.token}`
      }
    })
    users.value = response.users
  } catch (error: any) {
    toast.error('Erreur lors du chargement des utilisateurs')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadUsers()
})
</script>