<template>
    <!-- <div class="min-h-screen bg-gray-50 py-8"> -->
      <div class="card p-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mes Produits</h1>
            <NuxtLink
              to="/produits/ajouter"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Ajouter un produit
            </NuxtLink>
          </div>
  
          <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Chargement des produits...</p>
          </div>
  
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">{{ error }}</p>
          </div>
  
          <div v-else-if="products.length === 0" class="text-center py-12">
            <p class="text-gray-600">Vous n'avez pas encore de produits.</p>
            <NuxtLink
              to="/publier"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
            >
              Ajouter votre premier produit
            </NuxtLink>
          </div>
  
          <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="product in products"
              :key="product._id"
              class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
            <img
  :src="(product.images && product.images.length > 0) ? product.images[0] : 'https://via.placeholder.com/300x200'"
  :alt="product.name || 'Image indisponible'"
  class="w-full h-48 object-cover"
/>

              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-lg font-bold text-primary-600">{{ product.price }} FCFA</span>
                  <span class="text-sm text-gray-500">Stock: {{ product.stock }}</span>
                </div>
                <div class="mt-4 flex justify-end space-x-2">
                  <button
                    @click="editProduct(product._id)"
                    class="px-3 py-1 text-sm text-primary-600 hover:text-primary-700"
                  >
                    Modifier
                  </button>
                  <button
                    @click="deleteProduct(product._id)"
                    class="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch } from 'vue'
  import { useToast } from '~/composables/useToast'
  import { useAuth } from '~/composables/useCustomAuth'
import { navigateTo } from 'nuxt/app';
  
  interface Product {
    _id: string;
    name: string;
    images: string[];
    description: string;
    price: number;
    stock: number;
  }
  
  interface ProductListResponse {
    products: Product[]
  }
  
  const auth = useAuth()
  const toast = useToast()
  const products = ref<Product[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  async function loadProducts() {
    try {
      loading.value = true
      const response = await $fetch<ProductListResponse>('/api/products/list', {
        headers: {
          Authorization: `Bearer ${auth.state.token}`
        }
      })
      products.value = response.products
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des produits'
      toast.error(error.value || 'Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }
  
watch(products, () => {
  console.log("Produits chargés :", products.value)
}, { deep: true })
  
  const editProduct = (productId: string) => {
    navigateTo(`/produits/${productId}/edit`)
  }
  
  const deleteProduct = async (productId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) return
  
    try {
      await $fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.state.token}`
        }
      })
      products.value = products.value.filter(p => p._id !== productId)
      toast.success('Produit supprimé avec succès')
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression du produit'
      toast.error(errorMessage || 'Une erreur est survenue')
    }
  }

  
watch(products, () => {
  console.log("Produits chargés :", products.value)
}, { deep: true })
  
  onMounted(() => {
    loadProducts()
  })
  </script>