import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  ssr: true,

  // Configuration Nhost
  nhost: {
    subdomain: process.env.NHOST_SUBDOMAIN, // Assurez-vous que cette variable est définie dans .env
    region: process.env.NHOST_REGION || 'eu-central-1', // Région par défaut si non spécifiée
  },

  // Configuration Nitro
  nitro: {
    preset: 'node',
  },

  // Configuration runtime (variables d'environnement)
  runtimeConfig: {
    // Variables privées (accessibles uniquement côté serveur)
    jwtSecret: process.env.NHOST_JWT_SECRET || '', // Clé secrète JWT
    mongodbUri: process.env.MONGODB_URI || '', // Conservez cette variable pour une éventuelle compatibilité future

    // Variables publiques (accessibles côté client et serveur)
    public: {
      apiBase: process.env.NHOST_GRAPHQL_URL || 'https://abc123abc.graphql.eu-central-1.nhost.run/v1', // URL GraphQL de Nhost
      baseUrl: process.env.BASE_URL || 'http://localhost:3000', // URL de base de votre application
      auth: {
        isEnabled: true,
        baseURL: process.env.NHOST_AUTH_URL || 'https://abc123abc.auth.eu-central-1.nhost.run/v1', // URL d'authentification de Nhost
        provider: {
          type: 'oauth', // Type de connexion (OAuth)
        },
      },
    },
  },

  // Modules Nuxt
  modules: [
    '@nuxtjs/tailwindcss', // Tailwind CSS
    '@pinia/nuxt', // Pinia pour la gestion de l'état
    '@vueuse/nuxt', // VueUse pour des utilitaires de composition
    '@nuxtjs/color-mode', // Gestion des modes de couleur
  ],

  // Fichiers CSS globaux
  css: [
    'assets/css/style.css', // Votre fichier CSS personnalisé
    'vue3-toastify/dist/index.css', // CSS pour les notifications Toastify
  ],

  // Configuration de build
  build: {
    transpile: ['vue3-toastify'], // Transpiler Vue3 Toastify
  },

  // Date de compatibilité (pour les environnements modernes)
  compatibilityDate: '2025-02-05',
});