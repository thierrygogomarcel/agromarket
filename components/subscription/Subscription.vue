<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">Plans d'abonnement</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="plan in plans" :key="plan.id" 
           class="border rounded-lg p-6 text-center">
        <h3 class="text-xl font-bold">{{ plan.name }}</h3>
        <p class="text-3xl font-bold text-primary-600 mt-4">
          {{ plan.price }} FCFA<span class="text-sm text-gray-500">/mois</span>
        </p>
        
        <ul class="mt-6 space-y-4">
          <li v-for="feature in plan.features" :key="feature">
            {{ feature }}
          </li>
        </ul>

        <button
          @click="handleSubscribe(plan.id)"
          :disabled="loading"
          class="mt-6 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
        >
          {{ loading ? 'En cours...' : 'Souscrire' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSubscription } from '~/composables/useSubscription'

const { subscribe, loading } = useSubscription()

const plans = ref([
  {
    id: 'basic',
    name: 'Basic',
    price: 5000,
    features: ['Accès aux annonces', 'Chat de base', '5 publications/mois']
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 15000,
    features: ['Annonces illimitées', 'Chat prioritaire', 'Statistiques avancées']
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 50000,
    features: ['Support dédié', 'API access', 'Formation personnalisée']
  }
])

const handleSubscribe = async (planId: string) => {
  try {
    await subscribe(planId)
  } catch (error) {
    console.error('Erreur de souscription:', error)
  }
}
</script>