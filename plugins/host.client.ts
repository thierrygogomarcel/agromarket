// plugins/nhost.client.ts  

import { NhostClient } from '@nhost/nhost-js';
import { useRuntimeConfig } from 'nuxt/app';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const nhost = new NhostClient({
    subdomain: config.public.nhostSubdomain,
    region: config.public.nhostRegion,
  });

  nuxtApp.provide('nhost', nhost); // Inject nhost into the app context
});