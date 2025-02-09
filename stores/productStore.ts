import { defineStore } from 'pinia'
import { useNhostClient } from '@nhost/vue'
import type { Product } from '~/types/product'

export const useProductStore = defineStore('products', () => {
  const nhost = useNhostClient()
  const products = ref<Product[]>([])
  const loading = ref(false)

  async function fetchProducts(filters?: any) {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetProducts($filters: products_bool_exp) {
          products(where: $filters) {
            id
            name
            description
            price
            quantity
            sellerId
            category
            createdAt
            updatedAt
          }
        }
      `, {
        variables: {
          filters
        }
      })

      if (error) throw error
      products.value = data.products
      return data.products
    } catch (error) {
      console.error('Error fetching products:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function createProduct(productData: Omit<Product, 'id'>) {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation CreateProduct($product: products_insert_input!) {
          insert_products_one(object: $product) {
            id
            name
            description
            price
            quantity
            sellerId
            category
            createdAt
            updatedAt
          }
        }
      `, {
        variables: {
          product: productData
        }
      })

      if (error) throw error
      return data.insert_products_one
    } catch (error) {
      console.error('Error creating product:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function updateProduct(id: string, updates: Partial<Product>) {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation UpdateProduct($id: uuid!, $updates: products_set_input!) {
          update_products_by_pk(pk_columns: {id: $id}, _set: $updates) {
            id
            name
            description
            price
            quantity
            sellerId
            category
            updatedAt
          }
        }
      `, {
        variables: {
          id,
          updates
        }
      })

      if (error) throw error
      return data.update_products_by_pk
    } catch (error) {
      console.error('Error updating product:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  async function deleteProduct(id: string) {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation DeleteProduct($id: uuid!) {
          delete_products_by_pk(id: $id) {
            id
          }
        }
      `, {
        variables: {
          id
        }
      })

      if (error) throw error
      products.value = products.value.filter(p => p.id !== id)
      return data.delete_products_by_pk
    } catch (error) {
      console.error('Error deleting product:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    products: computed(() => products.value),
    loading: computed(() => loading.value),
    fetchProducts,
    createProduct,
    updateProduct,
    deleteProduct
  }
})