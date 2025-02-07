<template>
  <div class="bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-medium mb-4">Donner votre avis</h3>
    
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Rating -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Note</label>
        <div class="flex space-x-2">
          <button
            v-for="star in 5"
            :key="star"
            type="button"
            @click="rating = star"
            class="focus:outline-none"
          >
            <svg
              class="h-6 w-6"
              :class="star <= rating ? 'text-yellow-400' : 'text-gray-300'"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Comment -->
      <div>
        <label for="comment" class="block text-sm font-medium text-gray-700">Commentaire</label>
        <textarea
          id="comment"
          v-model="comment"
          rows="4"
          class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          placeholder="Partagez votre expérience..."
        ></textarea>
      </div>

      <!-- Submit button -->
      <button
        type="submit"
        :disabled="loading || !isValid"
        class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
      >
        <span v-if="loading">Publication en cours...</span>
        <span v-else>Publier l'avis</span>
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useReviews } from '~/composables/useReviews'

const props = defineProps<{
  productId: string
}>()

const { createReview } = useReviews()

const rating = ref(0)
const comment = ref('')
const loading = ref(false)

const isValid = computed(() => rating.value > 0 && comment.value.trim().length >= 10)

const handleSubmit = async () => {
  if (!isValid.value || loading.value) return

  try {
    loading.value = true
    await createReview({
      productId: props.productId,
      rating: rating.value,
      comment: comment.value.trim()
    })
    
    // Reset form
    rating.value = 0
    comment.value = ''
  } finally {
    loading.value = false
  }
}
</script>