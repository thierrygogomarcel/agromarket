<template>
  <div>
    <Connector />
    <NuxtWelcome />
    <iframe
      :src="`${nhostUrl}/console`"
      frameborder="0"
      style="width: 100%; height: 100vh"
    ></iframe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { NhostClient } from '@nhost/nhost-js';
import { createClient, provideClient } from '@urql/vue';
import { useLogger } from '@/composables/useApp';

const logger = useLogger('App');
const config = useRuntimeConfig();
const nhostUrl = computed(() => {
  return `https://${config.public.NHOST_PROJECT_ID}.nhost.run`;
});
const nhost = new NhostClient({
  backendUrl: nhostUrl.value,
});
provide('nhost', nhost);

const client = createClient({
  url: `${nhostUrl.value}/v1/graphql`,
});
provideClient(client);

onMounted(() => {
  logger.log(':onMounted', config);
  logger.log('nhost', nhost);
  logger.log('client', client);
});
</script>
