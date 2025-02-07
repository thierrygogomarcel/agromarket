<template>
   <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Filtres -->
      <div class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white p-4 rounded-lg shadow">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Filtres</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700">Catégorie</label>
              <select
                v-model="selectedCategory"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Toutes les catégories</option>
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Prix maximum</label>
              <input
                type="number"
                v-model="maxPrice"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">Localisation</label>
              <select
                v-model="selectedLocation"
                class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
              >
                <option value="">Toutes les régions</option>
                <option v-for="location in locations" :key="location" :value="location">
                  {{ location }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Liste des produits -->
      <div class="flex-1">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="bg-white rounded-lg shadow overflow-hidden"
          >
            <img
              :src="product.image"
              :alt="product.name"
              class="w-full h-48 object-cover"
            />
            <div class="p-4">
              <h3 class="text-lg font-medium text-gray-900">{{ product.name }}</h3>
              <p class="mt-1 text-sm text-gray-500">{{ product.description }}</p>
              <div class="mt-2 flex items-center justify-between">
                <span class="text-lg font-bold text-primary-600">{{ product.price }} FCFA</span>
                <NuxtLink
                  :to="`/produits/${product.id}`"
                  class="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
                >
                  Voir détails
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
   

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

// Mock data
const categories = ['Légumes', 'Fruits', 'Céréales', 'Tubercules']
const locations = ['Littoral', 'Centre', 'Ouest', 'Nord']

const selectedCategory = ref('')
const maxPrice = ref<number>()
const selectedLocation = ref('')

// Mock products data
const products = ref([
  {
    id: 1,
    name: 'Tomates fraîches',
    description: 'Tomates bio cultivées localement',
    price: 1500,
    image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000',
    category: 'Légumes',
    location: 'Littoral'
  },
  {
    id: 2,
    name: 'Bananes plantains',
    description: 'Régime de plantains mûrs',
    price: 2000,
    image: 'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&q=80&w=1000',
    category: 'Fruits',
    location: 'Centre'
  },
  // Add more mock products as needed
])

// Filtered products based on selected filters
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesPrice = !maxPrice.value || product.price <= maxPrice.value
    const matchesLocation = !selectedLocation.value || product.location === selectedLocation.value
    return matchesCategory && matchesPrice && matchesLocation
  })
})
</script>