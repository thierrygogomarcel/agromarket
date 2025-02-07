<template>
  <!-- <div class="min-h-screen bg-gray-50 py-8"> -->
    <div class="card p-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white rounded-lg shadow p-6">
        <!-- En-tête -->
        <div class="flex justify-between items-center mb-6">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Gestion des produits</h1>
            <p class="mt-1 text-sm text-gray-500">
              {{ filteredProducts.length }} produit(s) trouvé(s)
            </p>
          </div>
          <button
            @click="exportProducts"
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
              placeholder="Rechercher un produit..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <select
            v-model="selectedCategory"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Toutes les catégories</option>
            <option value="electronics">Électronique</option>
            <option value="clothing">Vêtements</option>
            <option value="home_appliance">Électroménager</option>
          </select>
          <select
            v-model="selectedStatus"
            class="px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
          >
            <option value="">Tous les statuts</option>
            <option value="in_stock">En stock</option>
            <option value="out_of_stock">Rupture de stock</option>
          </select>
        </div>

        <!-- Liste des produits -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Produit
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prix
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="product in paginatedProducts" :key="product._id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="h-10 w-10 flex-shrink-0">
                      <img
                        :src="product.imageUrl || `https://via.placeholder.com/150`"
                        class="h-10 w-10 rounded-full object-cover"
                        :alt="product.name"
                      />
                    </div>
                    <div class="ml-4">
                      <div class="text-sm font-medium text-gray-900">
                        {{ product.name }}
                      </div>
                      <div class="text-sm text-gray-500">
                        {{ product.description }}
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="getCategoryClass(product.category)"
                  >
                    {{ getCategoryLabel(product.category) }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 text-green-800': product.status === 'in_stock',
                      'bg-red-100 text-red-800': product.status === 'out_of_stock'
                    }"
                  >
                    {{ product.status === 'in_stock' ? 'En stock' : 'Rupture de stock' }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ formatCurrency(product.price) }}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    @click="toggleProductStatus(product)"
                    class="text-primary-600 hover:text-primary-900 mr-4"
                  >
                    {{ product.status === 'in_stock' ? 'Rupture de stock' : 'Disponible' }}
                  </button>
                  <button
                    @click="deleteProduct(product._id)"
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
                <span class="font-medium">{{ filteredProducts.length }}</span>
                résultats
              </p>
            </div>
            <div>
              <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                <button
                  v-for="page in totalPages"
                  :key="page"
                  @click="currentPage = page"
                  :class="[currentPage === page
                    ? 'z-10 bg-primary-50 border-primary-500 text-primary-600'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50', 
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium']"
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
import { ref, computed } from 'vue'
import { useToast } from '~/composables/useToast'
import { useAuth } from '~/composables/useCustomAuth'

interface Product {
  _id: string
  name: string
  description: string
  category: 'electronics' | 'clothing' | 'home_appliance'
  status: 'in_stock' | 'out_of_stock'
  price: number
  imageUrl?: string
}

const auth = useAuth()
const toast = useToast()

const products = ref<Product[]>([])
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = 10

// Filtrer les produits
const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchesSearch = (
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
    const matchesCategory = !selectedCategory.value || product.category === selectedCategory.value
    const matchesStatus = !selectedStatus.value || product.status === selectedStatus.value
    return matchesSearch && matchesCategory && matchesStatus
  })
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))
const startIndex = computed(() => (currentPage.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, filteredProducts.value.length))
const paginatedProducts = computed(() => filteredProducts.value.slice(startIndex.value, endIndex.value))

// Actions
function exportProducts() {
  toast.info('Exportation en cours...')
}

function toggleProductStatus(product: Product) {
  product.status = product.status === 'in_stock' ? 'out_of_stock' : 'in_stock'
  toast.success(`${product.name} a été mis à jour !`)
}

function deleteProduct(id: string) {
  const index = products.value.findIndex(product => product._id === id)
  if (index !== -1) {
    products.value.splice(index, 1)
    toast.success('Produit supprimé !')
  }
}

function getCategoryClass(category: string) {
  switch (category) {
    case 'electronics':
      return 'bg-blue-100 text-blue-800'
    case 'clothing':
      return 'bg-green-100 text-green-800'
    case 'home_appliance':
      return 'bg-yellow-100 text-yellow-800'
    default:
      return ''
  }
}

function getCategoryLabel(category: string) {
  switch (category) {
    case 'electronics':
      return 'Électronique'
    case 'clothing':
      return 'Vêtements'
    case 'home_appliance':
      return 'Électroménager'
    default:
      return ''
  }
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('fr-FR', { 
    style: 'currency', 
    currency: 'EUR' 
  }).format(value)
}
</script>
