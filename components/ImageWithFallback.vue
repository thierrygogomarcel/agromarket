<template>
  <img
    :src="imageUrl"
    :alt="alt"
    @error="handleError"
    v-bind="$attrs"
    class="object-cover"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRuntimeConfig } from 'nuxt/app'

const props = defineProps<{
  src?: string
  alt: string
  type?: 'product' | 'profile' | 'category' | 'banner'
}>()

const config = useRuntimeConfig()
const baseUrl = config.public.baseUrl || ''

const imageUrl = computed(() => {
  if (!props.src) {
    return getDefaultImage(props.type)
  }
  return props.src.startsWith('http') ? props.src : `${baseUrl}${props.src}`
})

function getDefaultImage(type?: string) {
  const defaults: Record<string, string> = {
    product: `${baseUrl}/images/moisson.png`,
    profile: `${baseUrl}/images/profile.png`,
    category: `${baseUrl}/images/tracteur.png`,
    banner: `${baseUrl}/images/bg.png`
  }
  return defaults[type || 'product'] || `${baseUrl}/images/bg.png`
}

const handleError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = getDefaultImage(props.type)
}
</script>