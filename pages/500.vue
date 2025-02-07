<template>
    <div class="min-h-screen flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-6xl font-bold text-primary-600 mb-4">500</h1>
        <p class="text-xl text-gray-600 mb-8">
          Désolé ! Une erreur inattendue s'est produite.
        </p>
        <button 
          @click="refreshPage"
          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700"
        >
          Rafraîchir la page
          <svg class="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const refreshPage = () => {
    window.location.reload()
  }
  </script>