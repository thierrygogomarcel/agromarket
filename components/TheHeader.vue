<!-- components\TheHeader.vue -->
<template>
  <header class="bg-gray-800 text-white">
   <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
     <nav class="w-full px-4 sm:px-6 lg:px-8">
       <div class="flex justify-between h-16">
         <!-- Logo -->
         <div class="flex">
           <NuxtLink to="/" class="flex items-center space-x-2">
             <img 
               src="/logo.png"
               alt="GoGoMarket Logo" 
               class="h-10 w-10 rounded-lg object-cover" 
             />
             <span class="text-2xl font-bold text-white">GoGoMarket 2.0</span>
           </NuxtLink>
            <!-- Info icon -->
            <button @click="showInfo" class="text-white hover:text-gray-300 p-2">
             <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
           </button>
 
         </div>
 
         <!-- Navigation Menu -->
         <div class="flex items-center space-x-4">
           <!-- Menu for unauthenticated users -->
           <template v-if="!isAuthenticated">
             <!-- Login Form -->
             <form @submit.prevent="handleLogin" class="flex items-center space-x-4">
               <div class="relative">
                 <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                   <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                   </svg>
                 </span>
                 <input
                   v-model="email"
                   type="email"
                   placeholder="Email"
                   class="pl-10 pr-4 py-2 border border-transparent rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white/10 text-white placeholder-gray-300"
                   required
                 />
               </div>
               <div class="relative">
                  <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                    <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </span>
                  <input
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    placeholder="Mot de passe"
                    class="pl-10 pr-10 py-2 border border-transparent rounded-md focus:ring-primary-500 focus:border-primary-500 bg-white/10 text-white placeholder-gray-300"
                    required
                  />
                  <button 
                    type="button"
                    @click="showPassword = !showPassword"
                    class="absolute inset-y-0 right-0 pr-3 flex items-center"
                  >
                    <svg v-if="showPassword" class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    <svg v-else class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  </button>
                </div>
 
               <button
                 type="submit"
                 :disabled="loading"
                 class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-700 bg-white hover:bg-primary-50"
               >
                 {{ loading ? 'Connexion...' : 'Se connecter' }}
               </button>
             </form>
 
             <!-- <NuxtLink
               to="/inscription"
               class="text-white hover:text-primary-100"
             >
               S'inscrire
             </NuxtLink> -->
           </template>
 
           <!-- Menu for authenticated users -->
           <template v-else>
             <!-- Admin Menu -->
             <template v-if="isAdmin">
               <div class="relative group">
                 <button class="text-white hover:text-primary-100 flex items-center space-x-1">
                   <span>Administration</span>
                   <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </button>
                 <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                   <NuxtLink to="/admin/dashboard" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Dashboard
                   </NuxtLink>
                   <NuxtLink to="/admin/utilisateurs" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Utilisateurs
                   </NuxtLink>
                   <NuxtLink to="/admin/produits" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Produits
                   </NuxtLink>
                   <NuxtLink to="/admin/transactions" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Transactions
                   </NuxtLink>
                 </div>
               </div>
             </template>
 
             <!-- Producer Menu -->
             <template v-else-if="isProducer">
               <div class="relative group">
                 <button class="text-white hover:text-primary-100 flex items-center space-x-1">
                   <span>Mes Produits</span>
                   <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                   </svg>
                 </button>
                 <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                   <NuxtLink to="/produits/ajouter" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Ajouter un produit
                   </NuxtLink>
                   <NuxtLink to="/produits/publier" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Publier un produit
                   </NuxtLink>
                   <NuxtLink to="/mes-produits" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Gérer mes produits
                   </NuxtLink>
                   <NuxtLink to="/mes-offres" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Gérer mes offres
                   </NuxtLink>
                   <NuxtLink to="/mes-ventes" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                     Mes ventes
                   </NuxtLink>
                 </div>
               </div>
             </template>
 
             <!-- Buyer Menu -->
             <template v-else>
               <NuxtLink to="/explorer" class="text-white hover:text-primary-100">
                 Explorer
               </NuxtLink>
               <NuxtLink to="/favoris" class="text-white hover:text-primary-100">
                 Favoris
               </NuxtLink>
             </template>
 
             <!-- Common menus for all authenticated users -->
             <div class="relative group">
               <button class="text-white hover:text-primary-100 flex items-center space-x-1">
                 <span>Services</span>
                 <svg class="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                 </svg>
               </button>
               <div class="absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                 <NuxtLink to="/location" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   Location d'équipement
                 </NuxtLink>
                 <NuxtLink to="/formations" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   Formations
                 </NuxtLink>
                 <NuxtLink to="/abonnement" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                   Abonnements
                 </NuxtLink>
               </div>
             </div>
 
             <!-- User Menu -->
             <div class="relative ml-3 group">
               <button
                 type="button"
                 class="flex items-center max-w-xs text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-800 focus:ring-white"
               >
                 <img
                   :src="userAvatar"
                   :alt="user?.fullName"
                   class="h-8 w-8 rounded-full object-cover"
                 />
               </button>
               <div class="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-300">
                 <div class="px-4 py-2 text-sm text-gray-700 border-b">
                   {{ user?.fullName }}
                   <div class="text-xs text-gray-500">{{ userTypeLabel }}</div>
                 </div>
                 <NuxtLink
                   :to="dashboardLink"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Tableau de bord
                 </NuxtLink>
                 <NuxtLink
                   to="/admin/wallet"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Portefeuille
                 </NuxtLink>
                 <NuxtLink
                   to="/admin/transactions"
                   class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Transactions
                 </NuxtLink>
                 <div v-if="isAdmin" class="px-4 py-2 text-sm text-red-700 hover:bg-red-50 cursor-pointer" @click="handleDeleteAll">
                   Tout supprimer
                 </div>
                 <button
                   @click="handleLogout"
                   class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                 >
                   Déconnexion
                 </button>
               </div>
             </div>
           </template>
         </div>
       </div>
     </nav>
   </div>
   </header>
 </template>
 
<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'
import { useRouter } from 'vue-router'
import { useToast } from '~/composables/useToast'

const router = useRouter()
const auth = useAuth()
const toast = useToast()
const showPassword = ref(false)

const email = ref('')
const password = ref('')
const loading = ref(false)
const showModal = ref(false);

const isAuthenticated = computed(() => {
  console.log('Authentication state:', auth.isAuthenticated)
  return auth.isAuthenticated
})
const user = computed(() => {
  console.log('User object:', auth.state.user)
  return auth.state.user
})
const isAdmin = computed(() => {
  const adminStatus = user.value?.role === 'admin'
  console.log('Is Admin:', adminStatus, 'User role:', user.value?.role)
  return adminStatus
})
const isProducer = computed(() => {
  const producerStatus = user.value?.userType === 'producer'
  console.log('Is Producer:', producerStatus, 'User type:', user.value?.userType)
  return producerStatus
})

const userTypeLabel = computed(() => {
  const types = {
    admin: 'Administrateur',
    producer: 'Producteur',
    buyer: 'Acheteur',
    transport: 'Transporteur'
  }
  const userType = user.value?.userType
  return userType ? (types[userType as keyof typeof types] || userType) : ''
})

const dashboardLink = computed(() => {
  if (isAdmin.value) return '/admin/dashboard'
  if (isProducer.value) return '/dashboard/SellerDashboard'
  return '/dashboard/BuyerDashboard'
})

const userAvatar = computed(() => {
  if (user.value?.avatarUrl) return user.value.avatarUrl
  const type = user.value?.userType
  const name = user.value?.fullName || 'user'
  return `https://api.dicebear.com/7.x/personas/svg?seed=${type}-${name}`
})

const handleLogin = async () => {
  try {
    loading.value = true
    await auth.login(email.value, password.value)
    toast.success('Connexion réussie')
    email.value = ''
    password.value = ''
  } catch (error: any) {
    toast.error('Email ou mot de passe incorrect')
  } finally {
    loading.value = false
  }
}

const handleLogout = () => {
  auth.logout()
  toast.success('Déconnexion réussie')
  router.push('/')
}

const showInfo = () => {
  showModal.value = true;
};

const handleDeleteAll = async () => {
  if (!confirm('Êtes-vous sûr de vouloir supprimer toutes les données ? Cette action est irréversible.')) {
    return
  }

  try {
    await $fetch('/api/users/delete-all', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${auth.state.token}`
      }
    })
    toast.success('Toutes les données ont été supprimées avec succès')
    auth.logout()
    router.push('/connexion')
  } catch (error: any) {
    toast.error('Erreur lors de la suppression des données')
  }
}

// Surveiller les changements d'authentification pour mettre à jour les headers
watch(() => auth.state.token, (newToken) => {
  if (newToken) {
    // Mettre à jour les headers globaux pour les requêtes
    const headers = {
      'Authorization': `Bearer ${newToken}`,
      'Content-Type': 'application/json'
    }

    if (auth.state.user?.role === 'admin') {
      Object.assign(headers, {
        'X-Admin-Access': 'true',
        'X-Admin-Permissions': 'full'
      })
    }

    // Mettre à jour les headers globaux
    $fetch.create({
      headers
    })
  }
})
</script>