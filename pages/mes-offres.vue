<template>
    <div class="card p-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-2xl font-bold text-gray-900">Mes Offres</h1>
            <NuxtLink
              to="/produits/publier"
              class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
            >
              <svg class="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
              Publier une offre
            </NuxtLink>
          </div>
  
          <div v-if="loading" class="text-center py-12">
            <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p class="mt-4 text-gray-600">Chargement des offres...</p>
          </div>
  
          <div v-else-if="error" class="text-center py-12">
            <p class="text-red-600">{{ error }}</p>
          </div>
  
          <div v-else-if="offers.length === 0" class="text-center py-12">
            <p class="text-gray-600">Vous n'avez pas encore d'offres publiées.</p>
            <NuxtLink
              to="/offres/publier"
              class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-primary-600 bg-primary-50 hover:bg-primary-100"
            >
              Publier une offre maintenant
            </NuxtLink>
          </div>
  
          <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div
              v-for="offer in offers"
              :key="offer._id"
              class="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                :src="(offer.images && offer.images.length > 0) ? offer.images[0] : 'https://via.placeholder.com/300x200'"
                :alt="offer.name || 'Image indisponible'"
                class="w-full h-48 object-cover"
              />
  
              <div class="p-4">
                <h3 class="text-lg font-medium text-gray-900">{{ offer.name }}</h3>
                <p class="mt-1 text-sm text-gray-500">{{ offer.description }}</p>
                <div class="mt-4 flex items-center justify-between">
                  <span class="text-lg font-bold text-primary-600">{{ offer.price }} FCFA</span>
                  <span class="text-sm text-gray-500">Stock: {{ offer.stock }}</span>
                </div>
                <div class="mt-4 flex justify-end space-x-2">
                  <button
                    @click="editOffer(offer._id)"
                    class="px-3 py-1 text-sm text-primary-600 hover:text-primary-700"
                  >
                    Modifier
                  </button>
                  <button
                    @click="deleteOffer(offer._id)"
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
  import { navigateTo } from 'nuxt/app'
  
  interface Offer {
    _id: string;
    name: string;
    images: string[];
    description: string;
    price: number;
    stock: number;
  }
  
  interface OfferListResponse {
    offers: Offer[];
  }
  
  const auth = useAuth()
  const toast = useToast()
  const offers = ref<Offer[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)
  
  async function loadOffers() {
    try {
      loading.value = true
      const response = await $fetch<OfferListResponse>('/api/offers/list', {
        headers: {
          Authorization: `Bearer ${auth.state.token}`
        }
      })
      offers.value = response.offers
    } catch (err: any) {
      error.value = err.message || 'Erreur lors du chargement des offres'
      toast.error(error.value || 'Une erreur est survenue')
    } finally {
      loading.value = false
    }
  }
  
  watch(offers, () => {
    console.log("Offres chargées :", offers.value)
  }, { deep: true })
  
  const editOffer = (offerId: string) => {
    navigateTo(`/offres/${offerId}/edit`)
  }
  
  const deleteOffer = async (offerId: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette offre ?')) return
  
    try {
      await $fetch(`/api/offers/${offerId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${auth.state.token}`
        }
      })
      offers.value = offers.value.filter(o => o._id !== offerId)
      toast.success('Offre supprimée avec succès')
    } catch (err: any) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la suppression de l\'offre'
      toast.error(errorMessage || 'Une erreur est survenue')
    }
  }
  
  onMounted(() => {
    loadOffers()
  })
  </script>
  