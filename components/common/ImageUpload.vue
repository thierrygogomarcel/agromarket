<template>
    <div>
      <div class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div class="space-y-1 text-center">
          <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" 
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          <div class="flex text-sm text-gray-600">
            <label class="relative cursor-pointer bg-white rounded-md font-medium text-primary-600 hover:text-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-500">
              <span>Télécharger des photos</span>
              <input type="file" 
                     class="sr-only" 
                     multiple 
                     accept="image/*"
                     @change="handleFileUpload" />
            </label>
            <p class="pl-1">ou glisser-déposer</p>
          </div>
          <p class="text-xs text-gray-500">PNG, JPG jusqu'à 5MB</p>
        </div>
      </div>
  
      <!-- Image previews -->
      <div v-if="previewUrls.length > 0" class="mt-4 grid grid-cols-3 gap-4">
        <div v-for="(url, index) in previewUrls" 
             :key="index" 
             class="relative">
          <img :src="url" 
               class="h-24 w-24 object-cover rounded-lg" />
          <button type="button"
                  @click="removeImage(index)"
                  class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600">
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onBeforeUnmount } from 'vue'
import { toast } from 'vue3-toastify/index'
  
  const emit = defineEmits(['update:files'])
  const previewUrls = ref<string[]>([])
  const files = ref<File[]>([])
  
  const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
  
  const handleFileUpload = (event: Event) => {
    const input = event.target as HTMLInputElement
    if (!input.files?.length) return
  
    const newFiles = Array.from(input.files).filter(file => {
      if (file.size > MAX_FILE_SIZE) {
        toast.error(`Le fichier ${file.name} dépasse la taille maximale de 5MB`)
        return false
      }
      if (!file.type.startsWith('image/')) {
        toast.error(`Le fichier ${file.name} n'est pas une image`)
        return false
      }
      return true
    })
  
    files.value = [...files.value, ...newFiles]
    
    // Create preview URLs
    newFiles.forEach(file => {
      const url = URL.createObjectURL(file)
      previewUrls.value.push(url)
    })
  
    emit('update:files', files.value)
  }
  
  const removeImage = (index: number) => {
    URL.revokeObjectURL(previewUrls.value[index])
    previewUrls.value.splice(index, 1)
    files.value.splice(index, 1)
    emit('update:files', files.value)
  }
  
  // Clean up URLs when component is destroyed
  onBeforeUnmount(() => {
    previewUrls.value.forEach(url => URL.revokeObjectURL(url))
  })
  </script>