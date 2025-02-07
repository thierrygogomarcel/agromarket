<template>
  <div class="connector">
    <button class="btn" @click="signIn()">Connect</button>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useQuery } from '@urql/vue';
import { useLogger } from '@/composables/useApp';
import { ethers } from 'ethers';

const logger = useLogger('App');
const provider = new ethers.providers.Web3Provider(window.ethereum);
await provider.send('eth_requestAccounts', []);
// const result = useQuery({
//   query: `
//     query {
//   users {
//     id
//     email
//   }
// }
//   `,
// });

const signIn = async () => {
  logger.log(':signIn');
  // get provider, signer, address, chainId
  // findUser
  // signUp/signIn
};

onMounted(() => {
  logger.log(':onMounted');
});
</script>

<style lang="scss">
.connector {
  position: fixed;
  top: 16px;
  right: 16px;
  z-index: 999;
  .btn {
    padding: 8px;
    background: #00dc82;
    color: white;
    border-radius: 8px;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background: #80eec0;
    }
  }
}
</style>
