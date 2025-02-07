<template>
  <div class="space-y-6">
    <h3 class="text-lg font-medium">Avis des clients</h3>

    <div v-if="loading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
    </div>

    <template v-else>
      <div v-if="productReviews.length" class="space-y-4">
        <div v-for="review in productReviews" :key="review.id" class="bg-white p-4 rounded-lg shadow">
          <div class="flex items-center justify-between mb-2">
            <div class="flex space-x-2">
              <svg
                v-for="star in 5"
                :key="star"
                class="h-5 w-5"
                :class="star <= review.rating ? 'text-yellow-400' : 'text-gray-300'"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <span class="text-sm text-gray-500">
              {{ new Date(review.createdAt).toLocaleDateString() }}
            </span>
          </div>
          <p class="text-gray-700">{{ review.comment }}</p>
        </div>
      </div>

      <div v-else class="text-center py-4 text-gray-500">
        Aucun avis pour le moment
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReviews } from '~/composables/useReviews'

const props = defineProps<{
  productId: string
}>()

const { loadReviews, reviews } = useReviews()
const loading = ref(false)

const productReviews = computed(() => reviews.value[props.productId] || [])

onMounted(async () => {
  try {
    loading.value = true
    await loadReviews(props.productId)
  } finally {
    loading.value = false
  }
})
</script>