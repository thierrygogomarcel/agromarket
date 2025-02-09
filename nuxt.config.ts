import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: true,

  // Configuration Nhost
  nhost: {
    subdomain: process.env.NHOST_SUBDOMAIN,
    region: process.env.NHOST_REGION || 'eu-central-1',
  },

  // Configuration runtime
  runtimeConfig: {
    // Variables privées (côté serveur uniquement)
    nhostAdminSecret: process.env.NHOST_ADMIN_SECRET,
    nhostWebhookSecret: process.env.NHOST_WEBHOOK_SECRET,

    // Variables publiques (côté client et serveur)
    public: {
      nhostSubdomain: process.env.NHOST_SUBDOMAIN,
      nhostRegion: process.env.NHOST_REGION,
      nhostGraphqlUrl: process.env.NHOST_GRAPHQL_URL,
      nhostAuthUrl: process.env.NHOST_AUTH_URL,
      nhostStorageUrl: process.env.NHOST_STORAGE_URL,
      nhostFunctionsUrl: process.env.NHOST_FUNCTIONS_URL,
    }
  },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxtjs/color-mode'
  ],

  // CSS global
  css: [
    'assets/css/style.css',
    'vue3-toastify/dist/index.css'
  ],

  // Build
  build: {
    transpile: ['vue3-toastify']
  },

  // Date de compatibilité
  compatibilityDate: '2025-02-05'
})