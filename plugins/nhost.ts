import { defineNuxtPlugin } from 'nuxt/app'
import { createNhostClient } from '@nhost/nhost-js'

export default defineNuxtPlugin(nuxtApp => {
  // Créez le client Nhost côté client
  const nhost = createNhostClient({
    subdomain: process.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
    region: process.env.NUXT_PUBLIC_NHOST_REGION,
  })

  // Assurez-vous que le client est accessible dans l'application via $nhost
  nuxtApp.provide('nhost', nhost)

  // Si vous avez besoin d'une logique côté serveur, vous pouvez créer un autre client ici, mais il faut veiller à ce qu'il soit correctement implémenté pour le serveur
  // const nhostServer = createNhostClient({
  //   subdomain: process.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
  //   region: process.env.NUXT_PUBLIC_NHOST_REGION,
  // })
  // nuxtApp.provide('nhostServer', nhostServer)
})
