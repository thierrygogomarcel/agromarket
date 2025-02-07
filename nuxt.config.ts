export default defineNuxtConfig({
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'gogomarket2025',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // Nhost Plugin to initialize client
    { src: '~/plugins/nhost.client.ts', mode: 'client' },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: ['@nuxt/typescript-build', '@nuxtjs/tailwindcss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nhost/nhost-vue', // Integrate Nhost with Vue (for auth, etc.)
  ],

  // Environment variables
  runtimeConfig: {
    public: {
      nhostSubdomain: process.env.NUXT_PUBLIC_NHOST_SUBDOMAIN || 'localhost',
      nhostRegion: process.env.NUXT_PUBLIC_NHOST_REGION || 'us-east-1',
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
});
