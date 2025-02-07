<template>
  <div class="min-h-screen relative">
    <!-- Fond dynamique -->
    <div class="page-background"></div>
    
    <!-- Contenu -->
    <div class="relative z-10 min-h-screen flex flex-col">
      <TheHeader />
      
      <!-- Add NuxtPage here to render page content -->
      <NuxtPage />
      
      <TheFooter />
    </div>
  </div>
</template>

<style>
@import '~/assets/css/style.css';
</style>