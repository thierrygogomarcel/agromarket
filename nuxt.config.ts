export default defineNuxtConfig({
  ssr: true,

  // Configuration runtime
  runtimeConfig: {
    public: {
      nhostSubdomain: process.env.NHOST_SUBDOMAIN,
      nhostRegion: process.env.NHOST_REGION || 'eu-central-1',
      nhostGraphqlUrl: process.env.NHOST_GRAPHQL_URL,
      nhostAuthUrl: process.env.NHOST_AUTH_URL,
      nhostStorageUrl: process.env.NHOST_STORAGE_URL,
      nhostFunctionsUrl: process.env.NHOST_FUNCTIONS_URL,
      appName: process.env.APP_NAME || 'GoGoMarket',
      appDescription: process.env.APP_DESCRIPTION || 'La marketplace des produits agricoles'
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

  // App configuration
  app: {
    head: {
      title: 'GoGoMarket - La marketplace des produits agricoles',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { 
          hid: 'description', 
          name: 'description', 
          content: 'GoGoMarket connecte les producteurs agricoles aux acheteurs pour faciliter la vente de produits agricoles en Afrique de l\'Ouest.'
        }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/logo.png' }
      ]
    }
  },

  // Compatibilité
  compatibilityDate: '2025-02-05'
})