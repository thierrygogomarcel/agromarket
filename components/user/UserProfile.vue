
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="flex items-center space-x-4">
      <img 
        :src="user?.avatarUrl || `https://api.dicebear.com/7.x/initials/svg?seed=${user?.fullName}`" 
        :alt="user?.fullName"
        class="h-20 w-20 rounded-full object-cover"
      />
      <div>
        <h2 class="text-2xl font-bold text-gray-900">{{ user?.fullName }}</h2>
        <p class="text-gray-500">{{ user?.email }}</p>
      </div>
    </div>

    <div class="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
      <div>
        <h3 class="text-lg font-medium text-gray-900">Informations personnelles</h3>
        <dl class="mt-2 space-y-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Type de compte</dt>
            <dd class="text-sm text-gray-900">{{ getUserTypeLabel(user?.userType) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Téléphone</dt>
            <dd class="text-sm text-gray-900">{{ user?.phone }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Statut</dt>
            <dd class="text-sm">
              <span :class="[
                'px-2 py-1 text-xs font-medium rounded-full',
                user?.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              ]">
                {{ user?.status === 'active' ? 'Actif' : 'Inactif' }}
              </span>
            </dd>
          </div>
        </dl>
      </div>

      <div>
        <h3 class="text-lg font-medium text-gray-900">Statistiques</h3>
        <dl class="mt-2 space-y-2">
          <div>
            <dt class="text-sm font-medium text-gray-500">Membre depuis</dt>
            <dd class="text-sm text-gray-900">{{ formatDate(user?.createdAt) }}</dd>
          </div>
          <div>
            <dt class="text-sm font-medium text-gray-500">Dernière connexion</dt>
            <dd class="text-sm text-gray-900">{{ formatDate(user?.lastLoginAt) }}</dd>
          </div>
        </dl>
      </div>
    </div>

    <div class="mt-6">
      <button
        @click="$emit('edit')"
        class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
      >
        Modifier le profil
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface User {
  fullName: string
  email: string
  userType: string
  phone: string
  status: 'active' | 'inactive'
  avatarUrl?: string
  createdAt: string
  lastLoginAt?: string
}

const props = defineProps<{
  user: User | null
}>()

defineEmits(['edit'])

const getUserTypeLabel = (type?: string) => {
  const types = {
    producer: 'Producteur',
    buyer: 'Acheteur',
    transport: 'Transporteur',
    admin: 'Administrateur'
  }
  return type ? (types[type as keyof typeof types] || type) : ''
}

const formatDate = (date?: string) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>
