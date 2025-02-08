import { useTrainingStore } from '~/stores/trainingStore'
import { useToast } from '~/composables/useToast'

export const useTraining = () => {
  const trainingStore = useTrainingStore()
  const toast = useToast()

  const fetchTrainings = async () => {
    try {
      await trainingStore.fetchTrainings()
    } catch (error: any) {
      toast.error('Erreur lors du chargement des formations')
      throw error
    }
  }

  return {
    trainings: computed(() => trainingStore.trainings),
    loading: computed(() => trainingStore.loading),
    fetchTrainings
  }
}