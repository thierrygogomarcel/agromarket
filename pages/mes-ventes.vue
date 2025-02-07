<template>
    <div class="card p-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mes Ventes</h1>
          </div>
  
          <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Chargement des ventes...</p>
          </div>
  
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">{{ error }}</p>
          </div>
  
          <div v-else-if="sales.length === 0" class="text-center py-12">
            <p class="text-gray-600">Vous n'avez pas encore de ventes.</p>
          </div>
  
          <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="sale in sales"
              :key="sale._id"
              class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                :src="sale.productImage || 'https://via.placeholder.com/300x200'"
                :alt="sale.productName"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900">{{ sale.productName }}</h3>
                <p class="mt-1 text-sm text-gray-500">Acheteur : {{ sale.buyer }}</p>
                <p class="text-sm text-gray-500">Date : {{ formatDate(sale.date) }}</p>
                <p class="mt-2 text-lg font-bold text-primary-600">{{ sale.amount }} FCFA</p>
                <span
                  class="mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full"
                  :class="statusClass(sale.status)"
                >
                  {{ sale.status }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { useToast } from '~/composables/useToast'
  import { useAuth } from '~/composables/useCustomAuth'
  
  interface Sale {
    _id: string;
    productName: string;
    productImage: string;
    buyer: string;
    date: string;
    amount: number;
    status: 'En cours' | 'Livrée' | 'Annulée';
  }
  
  interface SalesListResponse {
    sales: Sale[]
  }
  
  const auth = useAuth()
  const toast = useToast()
  const sales = ref<Sale[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  async function loadSales() {
    try {
      loading.value = true
      const response = await $fetch<SalesListResponse>('/api/sales/list', {
        headers: {
          Authorization: `Bearer ${auth.state.token}`
        }
      })
      sales.value = response.sales
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des ventes'
      toast.error(error.value || 'Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }
  
  const statusClass = (status: string) => {
    return {
      'text-yellow-600 bg-yellow-100': status === 'En cours',
      'text-green-600 bg-green-100': status === 'Livrée',
      'text-red-600 bg-red-100': status === 'Annulée'
    }
  }
  
  onMounted(() => {
    loadSales()
  })
  </script>
  