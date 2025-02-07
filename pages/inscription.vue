<template>
  <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   > 
  <div class="min-h-screen flex items-start justify-center  px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full mt-2"> 
      <div class="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-8">
        <div class="text-center">
          <h2 class="text-3xl font-extrabold text-gray-900 mb-2">
            Créez votre compte
          </h2>
          <!-- <p class="text-sm text-gray-600">
            Ou
            <NuxtLink to="/connexion" class="font-medium text-primary-600 hover:text-primary-500">
              connectez-vous à votre compte existant
            </NuxtLink>
          </p> -->
        </div>

        <RegisterForm class="mt-8" />
      </div>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '~/components/auth/RegisterForm.vue'
</script>