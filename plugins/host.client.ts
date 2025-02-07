import { defineNuxtPlugin } from '#app';
import { NhostClient } from '@nhost/nhost-js';

export default defineNuxtPlugin((nuxtApp: { provide: (arg0: string,arg1: NhostClient) => void; }) => {
  const nhost = new NhostClient({
    subdomain: import.meta.env.NUXT_PUBLIC_NHOST_SUBDOMAIN,
    region: import.meta.env.NUXT_PUBLIC_NHOST_REGION,
  });

  // Ajouter nhost au contexte Nuxt
  nuxtApp.provide('nhost', nhost);
});
