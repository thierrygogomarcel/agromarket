<template>
  <form @submit.prevent="login" class="p-4 bg-white shadow-md rounded">
    <div>
      <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
      <input v-model="email" type="email" id="email" required class="mt-1 p-2 w-full border rounded" />
    </div>
    <div class="mt-4">
      <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
      <input v-model="password" type="password" id="password" required class="mt-1 p-2 w-full border rounded" />
    </div>
    <button type="submit" class="mt-4 w-full bg-blue-600 text-white py-2 rounded">Se connecter</button>
  </form>
</template>

<script>
const showPassword = ref(false)

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      console.log('Connexion avec', this.email, this.password);
    }
  }
};
</script>