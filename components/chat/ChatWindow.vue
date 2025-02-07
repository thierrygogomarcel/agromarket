<template>
  <div class="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-lg">
    <!-- Header -->
    <div class="p-4 border-b flex justify-between items-center bg-primary-600 text-white rounded-t-lg">
      <h3 class="font-medium">Chat</h3>
      <button @click="minimized = !minimized" class="text-white hover:text-gray-200">
        <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path v-if="minimized" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
    </div>

    <!-- Chat content -->
    <div v-show="!minimized" class="h-96 flex flex-col">
      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" ref="messagesContainer">
        <template v-if="currentMessages.length">
          <div v-for="message in currentMessages" :key="message.id" class="flex flex-col">
            <div
              :class="[
                'max-w-[75%] rounded-lg px-4 py-2',
                message.senderId === userId
                  ? 'bg-primary-100 self-end'
                  : 'bg-gray-100 self-start'
              ]"
            >
              <p class="text-sm">{{ message.content }}</p>
              <span class="text-xs text-gray-500">
                {{ new Date(message.timestamp).toLocaleTimeString() }}
              </span>
            </div>
          </div>
        </template>
        <div v-else class="text-center text-gray-500">
          Aucun message
        </div>
      </div>

      <!-- Input -->
      <div class="border-t p-4">
        <form @submit.prevent="sendMessage" class="flex space-x-2">
          <input
            v-model="newMessage"
            type="text"
            class="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-primary-500 focus:border-primary-500"
            placeholder="Votre message..."
          />
          <button
            type="submit"
            :disabled="!newMessage.trim() || loading"
            class="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
          >
            <span v-if="loading">...</span>
            <span v-else>Envoyer</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useChat } from '~/composables/useChat'
import { useAuth } from '~/composables/useCustomAuth'

const props = defineProps<{
  recipientId: string
}>()

const auth = useAuth()
const { startChat, sendMessage, loadMessages, activeConversation, conversations } = useChat()

const minimized = ref(false)
const newMessage = ref('')
const loading = ref(false)
const messagesContainer = ref<HTMLElement | null>(null)

const userId = computed(() => auth.state.user?.id)

const currentMessages = computed(() => {
  if (!activeConversation.value) return []
  return conversations.value[activeConversation.value] || []
})

const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

const handleSendMessage = async () => {
  if (!newMessage.value.trim() || loading.value) return

  try {
    loading.value = true
    await sendMessage(newMessage.value)
    newMessage.value = ''
    scrollToBottom()
  } finally {
    loading.value = false
  }
}

watch(currentMessages, () => {
  nextTick(scrollToBottom)
})

onMounted(async () => {
  try {
    await startChat(props.recipientId)
    if (activeConversation.value) {
      await loadMessages(activeConversation.value)
    }
  } catch (error) {
    console.error('Error initializing chat:', error)
  }
})
</script>