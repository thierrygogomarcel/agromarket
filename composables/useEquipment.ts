import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useEquipment = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const equipment = ref([])

  const rentEquipment = async (equipmentId: string, duration: number) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation RentEquipment($rental: equipment_rentals_insert_input!) {
          insert_equipment_rentals_one(object: $rental) {
            id
            equipment_id
            renter_id
            duration
            status
            created_at
          }
        }
      `, {
        variables: {
          rental: {
            equipment_id: equipmentId,
            renter_id: nhost.auth.getUser()?.id,
            duration,
            status: 'pending'
          }
        }
      })

      if (error) throw error
      toast.success('Équipement loué avec succès')
      return data.insert_equipment_rentals_one
    } catch (error: any) {
      toast.error('Erreur lors de la location')
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchEquipment = async () => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetEquipment {
          equipment {
            id
            name
            description
            daily_rate
            status
            owner_id
            images
          }
        }
      `)

      if (error) throw error
      equipment.value = data.equipment
      return data.equipment
    } catch (error: any) {
      toast.error('Erreur lors du chargement des équipements')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    equipment: computed(() => equipment.value),
    loading: computed(() => loading.value),
    rentEquipment,
    fetchEquipment
  }
}