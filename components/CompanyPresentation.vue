<template>
  <div v-if="showPresentation" class="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
    <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity cursor-pointer" @click="closePresentation"></div>
    
    <div class="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-auto animate-slide-down">
      <button 
        @click="closePresentation" 
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-500 cursor-pointer"
      >
        <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-6">
        <div class="flex items-center mb-6">
          <img 
            src="/images/profile.png" 
            alt="Photo professionnelle" 
            class="h-20 w-20 rounded-full object-cover border-2 border-primary-500"
            onerror="this.src='https://img.freepik.com/free-photo/african-american-business-man-working-laptop-computer-office_1303-15719.jpg'"
          />
          <div class="ml-4">
            <h2 class="text-2xl font-bold text-gray-900">Bienvenue chez GogoSoft & Co</h2>
            <p class="text-sm text-gray-500 italic">Innovation et qualité au service de l'Afrique qui marche vers la modernité</p>
          </div>
        </div>

        <div class="flex space-x-6 mb-6">
          <a href="tel:+2250758966156" class="flex items-center text-primary-600 hover:text-primary-700">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            +225 07 58 96 61 56
          </a>
          <a href="mailto:2024dibo@gmail.com" class="flex items-center text-primary-600 hover:text-primary-700">
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            2024dibo@gmail.com
          </a>
        </div>

        <div class="mb-6">
          <p class="text-gray-600 mb-4">
            GogoSoft & Co est spécialisée dans le développement de solutions technologiques pour tous services. 
            Nous vous accompagnons dans la modernisation de vos exploitations avec des outils innovants et performants.
          </p>
          <p class="text-primary-600 font-semibold">
            Nous sommes fiers de vous présenter <span class="font-bold">GogoMarket 2.0</span>, notre plateforme de gestion agricole tout-en-un.
          </p>
        </div>

        <div>
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Nos solutions</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(solution, index) in solutions" :key="index" class="text-center">
              <img 
                :src="solution.image" 
                :alt="solution.alt" 
                class="w-full h-40 object-cover rounded-lg mb-2"
              />
              <p class="text-sm text-gray-600">{{ solution.title }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const emit = defineEmits(['close'])
const showPresentation = ref(true)
let autoCloseTimer: number | null = null

const solutions = ref([
  { image: 'https://images.unsplash.com/photo-1586880244406-556ebe35f282?w=300', title: 'Gestion agricole intelligente', alt: 'Solution 1' },
  { image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=300', title: 'Analyse de données', alt: 'Solution 2' },
  { image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300', title: 'Solutions mobiles', alt: 'Solution 3' }
])

const closePresentation = () => {
  showPresentation.value = false
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
    autoCloseTimer = null
  }
  emit('close')
}

onMounted(() => {
  autoCloseTimer = window.setTimeout(() => {
    closePresentation()
  }, 900000) // 15 minutes
})

onBeforeUnmount(() => {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer)
  }
})
</script>

<style scoped>
.animate-slide-down {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>