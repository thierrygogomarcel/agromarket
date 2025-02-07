<template>
   <div class="card p-8" style="min-width: 600px; margin: 0 auto;"   >
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-green-600 mb-6 text-center">Publier une offre</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <!-- Category Selection -->
        <div>
          <label for="category" class="block text-sm font-medium text-gray-700 mb-2">
            Sélectionnez une catégorie
          </label>
          <select 
            id="category" 
            v-model="selectedCategory" 
            @change="updateProducts" 
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>Choisissez une catégorie</option>
            <option 
              v-for="category in categories" 
              :key="category" 
              :value="category"
            >
              {{ category }}
            </option>
          </select>
        </div>

        <!-- Product Selection -->
        <div>
          <label for="product" class="block text-sm font-medium text-gray-700 mb-2">
            Choisissez votre produit
          </label>
          <select 
            id="product" 
            v-model="selectedProduct" 
            @change="fillProductDetails" 
            :disabled="!selectedCategory"
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
          >
            <option value="" disabled>
              {{ selectedCategory ? 'Sélectionnez un produit' : 'Choisissez d\'abord une catégorie' }}
            </option>
            <option 
              v-for="product in filteredProducts" 
              :key="product._id" 
              :value="product"
            >
              {{ product.name }}
            </option>
          </select>
        </div>

        <!-- Product Details -->
        <div v-if="selectedProduct?._id" class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Prix (FCFA)</label>
            <input 
              :value="selectedProduct?.price" 
              type="number" 
              disabled 
              class="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Stock disponible (kg)</label>
            <input 
              :value="selectedProduct?.stock" 
              type="number" 
              disabled 
              class="w-full p-3 bg-gray-100 border border-gray-300 rounded-md"
            />
          </div>
        </div>

        <!-- Offer Description -->
        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
            Description de l'offre
          </label>
          <textarea 
            id="description" 
            v-model="description" 
            rows="4" 
            required 
            class="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            placeholder="Décrivez votre offre en détail..."
          ></textarea>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end">
          <button 
            type="submit" 
            :disabled="loading || !isFormValid"
            class="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors disabled:opacity-50"
          >
            <span v-if="loading">Publication en cours...</span>
            <span v-else>Publier l'offre</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuth } from '~/composables/useCustomAuth';

// Types
interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
}

// Constants
const categories = ['Légumes', 'Fruits', 'Céréales', 'Tubercules'];

// Reactive State
const selectedCategory = ref('');
const selectedProduct = ref<Product | null>(null);
const description = ref('');
const loading = ref(false);
const products = ref<Product[]>([]);

// Fetch products on component mount
const fetchProducts = async (selectedCategory?: string) => {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('limit', '100');
    queryParams.append('page', '1');
    
    if (selectedCategory) {
      queryParams.append('category', selectedCategory);
    }

    const response = await $fetch<{
      products: Product[];
      total: number;
      page: number;
      totalPages: number;
    }>(`/api/products/list?${queryParams.toString()}`, {
      method: 'GET',
    });
    
    console.log('Fetched products:', response.products);
    products.value = response.products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    toast.error('Impossible de charger les produits');
  }
};

// Lifecycle hook
onMounted(() => fetchProducts());

// Computed Properties
const filteredProducts = computed(() => 
  products.value.filter(p => p.category === selectedCategory.value)
);

const isFormValid = computed(() => 
  selectedProduct.value && 
  description.value.trim().length >= 10 &&
  useAuth().state.user?.id
);

// Methods
const updateProducts = () => {
  selectedProduct.value = null;
  description.value = '';
  
  if (selectedCategory.value) {
    fetchProducts(selectedCategory.value);
  }
};

const fillProductDetails = () => {
  if (selectedProduct.value) {
    description.value = `Offre spéciale sur ${selectedProduct.value.name}! Contactez-moi pour plus d'infos.`;
  }
};

const handleSubmit = async () => {
  if (!isFormValid.value) {
    toast.error("Veuillez remplir tous les champs correctement.");
    return;
  }

  try {
    loading.value = true;

    const offerData = {
      productId: selectedProduct.value!._id,
      message: description.value.trim(),
    };

    const response = await $fetch('/api/offers/publish', {
      method: 'POST',
      body: offerData,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${useAuth().state.token}` 
      },
    });

    toast.success("Offre publiée avec succès !");
    useRouter().push("/mes-offres");
  } catch (error: any) {
    console.error("Erreur lors de la publication :", error);
    
    // More specific error handling
    if (error.data && error.data.message) {
      toast.error(error.data.message);
    } else if (error.message) {
      toast.error(error.message);
    } else {
      toast.error("Erreur lors de la publication de l'offre");
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Tailwind CSS is already imported via the Nuxt configuration */
/* This empty style section resolves the PostCSS processing error */
</style>