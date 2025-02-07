 
<template>
   <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  ">
      <h1 class="text-3xl font-bold text-white mb-8">Plans d'abonnement</h1>
  
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- Plan Basic -->
        <div class="card p-6 flex flex-col">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900">Basic</h2>
            <p class="mt-4 text-gray-500">Idéal pour commencer</p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-primary-600">5,000</span>
              <span class="text-gray-500">/mois</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Accès aux annonces</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Chat de base</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">5 publications/mois</span>
              </li>
            </ul>
          </div>
          <button
            @click="subscribe('basic')"
            class="mt-8 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            :disabled="loading"
          >
            {{ loading ? 'En cours...' : 'Souscrire' }}
          </button>
        </div>
  
        <!-- Plan Pro -->
        <div class="card p-6 flex flex-col border-2 border-primary-500">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900">Pro</h2>
            <p class="mt-4 text-gray-500">Pour les professionnels</p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-primary-600">15,000</span>
              <span class="text-gray-500">/mois</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Annonces illimitées</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Chat prioritaire</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Statistiques avancées</span>
              </li>
            </ul>
          </div>
          <button
            @click="subscribe('pro')"
            class="mt-8 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            :disabled="loading"
          >
            {{ loading ? 'En cours...' : 'Souscrire' }}
          </button>
        </div>
  
        <!-- Plan Enterprise -->
        <div class="card p-6 flex flex-col">
          <div class="flex-1">
            <h2 class="text-2xl font-bold text-gray-900">Enterprise</h2>
            <p class="mt-4 text-gray-500">Solutions sur mesure</p>
            <p class="mt-8">
              <span class="text-4xl font-bold text-primary-600">50,000</span>
              <span class="text-gray-500">/mois</span>
            </p>
            <ul class="mt-6 space-y-4">
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Support dédié</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">API access</span>
              </li>
              <li class="flex items-center">
                <svg class="h-5 w-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="ml-3">Formation personnalisée</span>
              </li>
            </ul>
          </div>
          <button
            @click="subscribe('enterprise')"
            class="mt-8 w-full bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
            :disabled="loading"
          >
            {{ loading ? 'En cours...' : 'Souscrire' }}
          </button>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useSubscription } from '~/composables/useSubscription'
  import { useToast } from '~/composables/useToast'
  
  const { subscribe: subscribeToplan } = useSubscription()
  const toast = useToast()
  const loading = ref(false)
  
  const subscribe = async (plan: string) => {
    try {
      loading.value = true
      await subscribeToplan(plan)
      toast.success('Abonnement souscrit avec succès')
    } catch (error: any) {
      toast.error('Erreur lors de la souscription')
    } finally {
      loading.value = false
    }
  }
  </script> 