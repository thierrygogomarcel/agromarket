import { useEquipmentStore } from '~/stores/equipmentStore'
import { useToast } from '~/composables/useToast'

export const useEquipment = () => {
  const equipmentStore = useEquipmentStore()
  const toast = useToast()

  const rentEquipment = async (equipmentId: string, duration: number) => {
    try {
      const response = await equipmentStore.rentEquipment(equipmentId, duration)
      toast.success('Équipement loué avec succès')
      return response
    } catch (error: any) {
      toast.error('Erreur lors de la location')
      throw error
    }
  }

  return {
    equipment: computed(() => equipmentStore.equipment),
    loading: computed(() => equipmentStore.loading),
    rentEquipment
  }
}