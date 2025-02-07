<template>
    <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Location d'équipement</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="equipment in equipments" :key="equipment.id" class="card p-6">
          <img :src="equipment.image" :alt="equipment.name" class="w-full h-48 object-cover rounded-lg mb-4">
          <h3 class="text-xl font-semibold mb-2">{{ equipment.name }}</h3>
          <p class="text-gray-600 mb-4">{{ equipment.description }}</p>
          <div class="flex justify-between items-center">
            <span class="text-lg font-bold text-primary-600">{{ equipment.price }} FCFA/jour</span>
            <button 
              @click="showRentModal(equipment)"
              class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
            >
              Louer
            </button>
          </div>
        </div>
      </div>
   
      <!-- Modal de location -->
      <EquipmentRent 
        v-if="selectedEquipment"
        :equipment="selectedEquipment"
        @close="selectedEquipment = null"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  
  const selectedEquipment = ref(null)
  
  // Données de test
  const equipments = ref([
    {
      id: 1,
      name: 'Tracteur agricole',
      description: 'Tracteur puissant pour tous types de terrains',
      price: 50000,
      image: '/tract.png'
    },
    {
      id: 2,
      name: 'Moissonneuse-batteuse',
      description: 'Idéale pour la récolte des céréales',
      price: 75000,
      image: '/moiss.png'
    }
  ])
  
  const showRentModal = (equipment: any) => {
    selectedEquipment.value = equipment
  }
  </script>