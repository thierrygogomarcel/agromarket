<template>
  <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   >
          <h1 class="text-3xl font-bold text-gray-900 mb-8">Formations agricoles</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="training in trainings" :key="training.id" class="card p-6">
          <img :src="training.image" :alt="training.title" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-xl font-semibold mb-2">{{ training.title }}</h3>
          <p class="text-gray-600 mb-4">{{ training.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-primary-600">{{ training.price }} FCFA</span>
            <button 
              @click="enrollInTraining(training)"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              S'inscrire
            </button>
          </div>
        </div>
      </div>
  </div>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useToast } from '~/composables/useToast'
  
  const toast = useToast()
  
  // Données de test
  const trainings = ref([
    {
      id: 1,
      title: 'Agriculture biologique',
      description: 'Apprenez les techniques de l\'agriculture biologique',
      price: 25000,
      image: '/ab.png'
    },
    {
      id: 2,
      title: 'Gestion des cultures',
      description: 'Optimisez vos rendements agricoles',
      price: 30000,
      image: '/gest.png'
    }
  ])
  
  const enrollInTraining = (training: any) => {
    // Logique d'inscription à implémenter
    toast.success(`Inscription à la formation "${training.title}" effectuée avec succès`)
  }
  </script>