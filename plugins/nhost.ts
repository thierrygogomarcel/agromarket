import { defineNuxtPlugin } from 'nuxt/app'
import { NhostClient } from '@nhost/nhost-js'

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig()
  
  const nhost = new NhostClient({
    subdomain: config.public.nhostSubdomain,
    region: config.public.nhostRegion,
  })

  // Make Nhost client available globally
  nuxtApp.provide('nhost', nhost)
  
  return {
    provide: {
      nhost
    }
  }
})