<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Questions fréquentes</h1>
    
    <div class="space-y-6">
      <div v-for="(item, index) in faqItems" :key="index" class="bg-white shadow rounded-lg p-6">
        <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   >
        <h2 class="text-lg font-medium text-gray-900 mb-2">{{ item.question }}</h2>
        <p class="text-gray-600">{{ item.answer }}</p>
      </div>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
const faqItems = [
  {
    question: "Comment puis-je m'inscrire sur AgroNet ?",
    answer: "L'inscription sur AgroNet est simple. Cliquez sur le bouton 'S'inscrire' en haut à droite, choisissez votre type de compte (producteur ou acheteur), puis remplissez le formulaire avec vos informations."
  },
  {
    question: "Comment publier une annonce ?",
    answer: "En tant que producteur, connectez-vous à votre compte et cliquez sur 'Publier' dans le menu. Remplissez le formulaire avec les détails de votre produit, ajoutez des photos et publiez."
  },
  {
    question: "Comment contacter un vendeur ?",
    answer: "Sur la page d'un produit, cliquez sur le bouton 'Contacter le vendeur'. Vous pourrez alors échanger directement avec le producteur."
  },
  {
    question: "Quels sont les moyens de paiement acceptés ?",
    answer: "AgroNet accepte les paiements via MTN Mobile Money et Orange Money pour garantir des transactions sécurisées."
  }
]
</script>