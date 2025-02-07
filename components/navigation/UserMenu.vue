<!-- UserMenu.vue -->
<template>
  <div class="relative">
    <button @click="toggleMenu" class="flex items-center space-x-2 p-2 bg-gray-200 rounded">
      <span>👤 {{ username }}</span>
    </button>
    <div v-if="menuOpen" class="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded p-2">
      <button class="block w-full text-left p-2 hover:bg-gray-100" @click="logout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserMenu',
  data() {
    return {
      menuOpen: false,
      username: 'Utilisateur'
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      console.log('Déconnexion');
    }
  }
};
</script>