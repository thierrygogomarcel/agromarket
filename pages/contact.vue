<template>
  <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 

  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Contactez-nous</h1>
    
    <div class="bg-white shadow rounded-lg p-8">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div>
          <label for="name" class="block text-sm font-medium text-gray-700">Nom complet</label>
          <input
            id="name"
            v-model="form.name"
            type="text"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            v-model="form.email"
            type="email"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="subject" class="block text-sm font-medium text-gray-700">Sujet</label>
          <input
            id="subject"
            v-model="form.subject"
            type="text"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          />
        </div>

        <div>
          <label for="message" class="block text-sm font-medium text-gray-700">Message</label>
          <textarea
            id="message"
            v-model="form.message"
            rows="4"
            required
            class="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          ></textarea>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            {{ loading ? 'Envoi en cours...' : 'Envoyer' }}
          </button>
        </div>
      </form>

      <div v-if="success" class="mt-4 p-4 bg-green-50 rounded-md">
        <p class="text-sm text-green-700">
          Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
        </p>
      </div>
    </div>
  </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const form = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const loading = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  success.value = true
  loading.value = false
  form.value = {
    name: '',
    email: '',
    subject: '',
    message: ''
  }
}
</script>