<template>
  <NuxtLayout>
    <div class="relative min-h-screen">
      <!-- Global background -->
      <div class="page-background"></div>
      
      <!-- Company presentation on startup -->
      <CompanyPresentation v-if="showPresentation" @close="closePresentation" />
      
      <!-- Fixed header -->
      <TheHeader class="fixed top-0 left-0 right-0 z-40" />
      
      <!-- Main content with padding for fixed header -->
      <div class="content pt-5">
        <NuxtPage />
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useHead } from 'nuxt/app'

const showPresentation = ref(true)

// Check if presentation was already shown
const hasSeenPresentation = () => {
  return localStorage.getItem('hasSeenPresentation')
}


const closePresentation = () => {
  showPresentation.value = false
  localStorage.setItem('hasSeenPresentation', 'true')
}

onMounted(() => {
  // Only show presentation if not seen before
  if (hasSeenPresentation()) {
    showPresentation.value = false
  } else {
    // Auto-close after 30 seconds
    setTimeout(() => {
      closePresentation()
    }, 30000)
  }
})

useHead({
  title: 'GoGoMarket - La marketplace des produits agricoles',
  meta: [
    {
      name: 'description',
      content: "GogoMarket connecte les producteurs agricoles aux acheteurs pour faciliter la vente de produits agricoles en Afrique de l'Ouest.",
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/logo.png'
    }
  ]
})
</script>

<style>
@import 'assets/css/style.css';
</style>