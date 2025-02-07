<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Formations disponibles</h2>
    
    <div v-if="loading" class="flex justify-center">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="training in trainings" :key="training.id" 
           class="bg-white rounded-lg shadow-md p-6">
        <h3 class="text-lg font-semibold">{{ training.title }}</h3>
        <p class="text-gray-600 mt-2">{{ training.description }}</p>
        <div class="mt-4 flex justify-between items-center">
          <span class="text-primary-600 font-bold">{{ training.price }} FCFA</span>
          <button class="bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700">
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTraining } from '~/composables/useTraining'

const { trainings, loading, fetchTrainings } = useTraining()

onMounted(() => {
  fetchTrainings()
})
</script>