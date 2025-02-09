import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'
import type { Product } from '~/types/product'

export const useProduct = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const products = ref<Product[]>([])
  const loading = ref(false)

  const fetchProducts = async (filters?: any) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetProducts($filters: products_bool_exp) {
          products(where: $filters) {
            id
            name
            description
            price
            stock
            category
            images
            seller_id
            created_at
            updated_at
          }
        }
      `, {
        variables: { filters }
      })

      if (error) throw error
      products.value = data.products
      return data.products
    } catch (error) {
      toast.error('Erreur lors du chargement des produits')
      throw error
    } finally {
      loading.value = false
    }
  }

  const createProduct = async (productData: Omit<Product, 'id'>, images: File[]) => {
    try {
      loading.value = true

      // Upload images first
      const uploadedImages = await Promise.all(
        images.map(file => 
          nhost.storage.upload({
            file,
            bucketId: 'products'
          })
        )
      )

      const imageUrls = uploadedImages
        .filter(upload => !upload.error)
        .map(upload => upload.fileMetadata.downloadUrl)

      // Create product with image URLs
      const { data, error } = await nhost.graphql.request(`
        mutation CreateProduct($product: products_insert_input!) {
          insert_products_one(object: $product) {
            id
            name
            description
            price
            stock
            category
            images
            seller_id
          }
        }
      `, {
        variables: {
          product: {
            ...productData,
            images: imageUrls
          }
        }
      })

      if (error) throw error
      toast.success('Produit créé avec succès')
      return data.insert_products_one
    } catch (error) {
      toast.error('Erreur lors de la création du produit')
      throw error
    } finally {
      loading.value = false
    }
  }

  const updateProduct = async (id: string, updates: Partial<Product>, newImages?: File[]) => {
    try {
      loading.value = true

      let imageUrls = updates.images || []

      // Upload new images if provided
      if (newImages?.length) {
        const uploadedImages = await Promise.all(
          newImages.map(file => 
            nhost.storage.upload({
              file,
              bucketId: 'products'
            })
          )
        )

        const newImageUrls = uploadedImages
          .filter(upload => !upload.error)
          .map(upload => upload.fileMetadata.downloadUrl)

        imageUrls = [...imageUrls, ...newImageUrls]
      }

      const { data, error } = await nhost.graphql.request(`
        mutation UpdateProduct($id: uuid!, $updates: products_set_input!) {
          update_products_by_pk(pk_columns: {id: $id}, _set: $updates) {
            id
            name
            description
            price
            stock
            category
            images
          }
        }
      `, {
        variables: {
          id,
          updates: {
            ...updates,
            images: imageUrls
          }
        }
      })

      if (error) throw error
      toast.success('Produit mis à jour avec succès')
      return data.update_products_by_pk
    } catch (error) {
      toast.error('Erreur lors de la mise à jour du produit')
      throw error
    } finally {
      loading.value = false
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      loading.value = true

      // Get product images to delete from storage
      const { data: productData, error: fetchError } = await nhost.graphql.request(`
        query GetProduct($id: uuid!) {
          products_by_pk(id: $id) {
            images
          }
        }
      `, {
        variables: { id }
      })

      if (fetchError) throw fetchError

      // Delete images from storage
      if (productData.products_by_pk.images?.length) {
        await Promise.all(
          productData.products_by_pk.images.map(async (imageUrl: string) => {
            const fileId = imageUrl.split('/').pop()
            if (fileId) {
              await nhost.storage.delete({ fileId })
            }
          })
        )
      }

      // Delete product
      const { error: deleteError } = await nhost.graphql.request(`
        mutation DeleteProduct($id: uuid!) {
          delete_products_by_pk(id: $id) {
            id
          }
        }
      `, {
        variables: { id }
      })

      if (deleteError) throw deleteError
      
      products.value = products.value.filter(p => p.id !== id)
      toast.success('Produit supprimé avec succès')
    } catch (error) {
      toast.error('Erreur lors de la suppression du produit')
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
}