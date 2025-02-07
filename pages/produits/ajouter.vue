<template>
   <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   >
    <div class="bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-2xl font-bold text-green-600 mb-8">Ajouter un produit</h1>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Informations de base -->
        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Détails du produit</h2>
          <div class="grid grid-cols-1 gap-6">
            <div>
              <label for="name" class="block text-sm font-medium text-gray-700">Nom du produit</label>
              <input id="name" v-model="form.name" type="text" required class="input-field" />
            </div>
            
            <div>
              <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>
              <select id="category" v-model="form.category" required class="input-field">
                <option v-for="category in categories" :key="category" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>

            <div>
              <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
              <textarea id="description" v-model="form.description" rows="4" required class="input-field"></textarea>
            </div>
          </div>
        </div>

        <!-- Prix, stock et paiement -->
        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Prix et paiement</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label for="price" class="block text-sm font-medium text-gray-700">Prix (FCFA)</label>
              <input id="price" v-model="form.price" type="number" min="0" required class="input-field" />
            </div>

            <div>
              <label for="stock" class="block text-sm font-medium text-gray-700">Stock disponible (kg)</label>
              <input id="stock" v-model="form.stock" type="number" min="0" required class="input-field" />
            </div>
          </div>
          <div class="mt-4">
            <label for="paypal" class="block text-sm font-medium text-gray-700">Lien PayPal</label>
            <input id="paypal" v-model="form.paypal" type="url" placeholder="https://www.paypal.com/" class="input-field" />
          </div>
        </div>

        <!-- Images -->
        <div>
          <h2 class="text-lg font-medium text-gray-900 mb-4">Photos du produit</h2>
          <input type="file" accept="image/*" multiple @change="handleFileUpload" class="input-field" />
          <div v-if="imageUrls.length" class="mt-4 grid grid-cols-3 gap-4">
            <div v-for="(url, index) in imageUrls" :key="index" class="relative">
              <img :src="url" class="h-24 w-24 object-cover rounded-lg" />
              <button @click="removeImage(index)" class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1">X</button>
            </div>
          </div>
        </div>

        <!-- Bouton de soumission -->
        <div class="flex justify-end">
          <button type="submit" :disabled="loading" class="submit-button">
            <span v-if="loading">Ajout en cours...</span>
            <span v-else>Ajouter le produit</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { useAuth } from '~/composables/useCustomAuth'

const form = ref({ name: '', category: '', description: '', price: null, stock: null, paypal: '', images: [] })
const categories = ['Légumes', 'Fruits', 'Céréales', 'Tubercules']
const imageUrls = ref([])
const loading = ref(false)
const error = ref(null)
const router = useRouter()
const { state } = useAuth()

const handleFileUpload = (event) => {
  const newFiles = Array.from(event.target.files)
  form.value.images = [...form.value.images, ...newFiles]
  newFiles.forEach(file => imageUrls.value.push(URL.createObjectURL(file)))
}

const removeImage = (index) => {
  URL.revokeObjectURL(imageUrls.value[index])
  imageUrls.value.splice(index, 1)
  form.value.images.splice(index, 1)
}

const handleSubmit = async () => {
  try {
    loading.value = true
    const formData = new FormData()
    Object.entries(form.value).forEach(([key, value]) => {
      if (key !== 'images' && value) formData.append(key, value)
    })
    form.value.images.forEach(file => formData.append('images', file))
    
    const token = state.token
    await $fetch('/api/products/add', { method: 'POST', body: formData, headers: { Authorization: `Bearer ${token}` } })
    toast.success('Produit ajouté avec succès')
    router.push('/mes-produits')
  } catch (error) {
    toast.error(error.message || 'Erreur lors de l\'ajout du produit')
  } finally {
    loading.value = false
  }
}

onBeforeUnmount(() => imageUrls.value.forEach(url => URL.revokeObjectURL(url)))
</script>

<style>
.input-field {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  outline: none;
  transition: border 0.2s;
}
.input-field:focus {
  border-color: #4CAF50;
}
.submit-button {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  font-weight: bold;
  transition: background 0.2s;
}
.submit-button:hover {
  background-color: #388E3C;
}
</style>
