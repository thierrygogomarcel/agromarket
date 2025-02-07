<template>
  <div class="bg-white rounded-lg shadow-md p-6">
    <h2 class="text-2xl font-bold mb-6">Location d'équipement</h2>
    
    <form @submit.prevent="handleRent" class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Durée (jours)</label>
        <input 
          v-model="duration"
          type="number"
          min="1"
          required
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
        />
      </div>

      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700 disabled:opacity-50"
      >
        {{ loading ? 'En cours...' : 'Louer' }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useEquipment } from '~/composables/useEquipment'

const props = defineProps<{
  equipmentId: string
}>()

const { rentEquipment, loading } = useEquipment()
const duration = ref(1)

const handleRent = async () => {
  try {
    await rentEquipment(props.equipmentId, duration.value)
  } catch (error) {
    console.error('Erreur de location:', error)
  }
}
</script>