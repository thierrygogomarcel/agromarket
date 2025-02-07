<template>
   <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6">Mes Favoris</h1>
  
        <!-- Liste des favoris -->
        <div v-if="favorites.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div 
            v-for="item in favorites" 
            :key="item._id"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <img 
              :src="item.images[0] || '/placeholder.jpg'" 
              :alt="item.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900">{{ item.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ item.description }}</p>
              <div class="mt-4 flex items-center justify-between">
                <span class="text-lg font-bold text-primary-600">{{ item.price }} FCFA</span>
                <button
                  @click="removeFavorite(item._id)"
                  class="text-red-600 hover:text-red-700"
                >
                  <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Message si aucun favori -->
        <div v-else class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">Aucun favori</h3>
          <p class="mt-1 text-sm text-gray-500">
            Commencez à ajouter des produits à vos favoris en explorant le catalogue.
          </p>
          <div class="mt-6">
            <NuxtLink
              to="/explorer"
              class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
            >
              Explorer les produits
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { onMounted, ref } from 'vue'

  // Define an interface for favorite items
  interface FavoriteItem {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
  }

  const favorites = ref<FavoriteItem[]>([])

  async function loadFavorites() {
    try {
      const response = await $fetch('/api/favoris', {
        method: 'GET'
      })
      favorites.value = response as FavoriteItem[]
    } catch (error) {
      console.error('Error loading favorites:', error)
    }
  }

  async function removeFavorite(productId: string) {
    try {
      await $fetch(`/api/favoris/${productId}`, {
        method: 'DELETE'
      })
      // Remove the item from the local array
      favorites.value = favorites.value.filter(item => item._id !== productId)
    } catch (error) {
      console.error('Error removing favorite:', error)
    }
  }

  onMounted(() => {
    loadFavorites()
  })
  </script>