<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="bg-white rounded-lg shadow-lg overflow-hidden">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- Image du produit -->
        <div class="relative h-96">
          <img
            :src="product.image"
            :alt="product.name"
            class="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <!-- Détails du produit -->
        <div class="p-8">
          <h1 class="text-3xl font-bold text-gray-900">{{ product.name }}</h1>
          <p class="mt-4 text-lg text-gray-500">{{ product.description }}</p>

          <div class="mt-8 space-y-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Prix</span>
              <span class="text-2xl font-bold text-primary-600">{{ product.price }} FCFA</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Catégorie</span>
              <span class="text-sm text-gray-900">{{ product.category }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Localisation</span>
              <span class="text-sm text-gray-900">{{ product.location }}</span>
            </div>

            <div class="flex items-center justify-between">
              <span class="text-sm font-medium text-gray-500">Stock disponible</span>
              <span class="text-sm text-gray-900">{{ product.stock }} kg</span>
            </div>
          </div>

          <!-- Informations du vendeur -->
          <div class="mt-8 pt-8 border-t border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Informations du vendeur</h2>
            <div class="mt-4 space-y-2">
              <p class="text-sm text-gray-500">{{ product.seller.name }}</p>
              <p class="text-sm text-gray-500">{{ product.seller.location }}</p>
              <p class="text-sm text-gray-500">Membre depuis {{ product.seller.memberSince }}</p>
            </div>
          </div>

          <!-- Boutons d'action -->
          <div class="mt-8 space-y-4">
            <button
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg md:px-10"
              @click="handleContact"
            >
              Contacter le vendeur
            </button>
            <button
              class="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary-600 bg-white hover:bg-gray-50 border-primary-600 md:py-4 md:text-lg md:px-10"
              @click="handlePurchase"
            >
              Acheter maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const productId = route.params.id

// Mock product data
const product = ref({
  id: productId,
  name: 'Tomates fraîches',
  description: 'Tomates bio cultivées localement, sans pesticides. Idéales pour la cuisine ou la revente.',
  price: 1500,
  image: 'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?auto=format&fit=crop&q=80&w=1000',
  category: 'Légumes',
  location: 'Littoral',
  stock: 100,
  seller: {
    name: 'Jean Dupont',
    location: 'Douala, Littoral',
    memberSince: 'Janvier 2024'
  }
})

const handleContact = () => {
  // TODO: Implement contact functionality
  console.log('Contacting seller...')
}

const handlePurchase = () => {
  // TODO: Implement purchase functionality
  console.log('Initiating purchase...')
}
</script>