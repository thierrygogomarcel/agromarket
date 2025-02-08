import { useChatStore } from '~/stores/chatStore'
import { useToast } from '~/composables/useToast'

export const useChat = () => {
  const chatStore = useChatStore()
  const toast = useToast()

  const startChat = async (userId: string) => {
    try {
      const response = await chatStore.startChat(userId)
      toast.success('Conversation démarrée')
      return response
    } catch (error: any) {
      toast.error('Erreur lors du démarrage de la conversation')
      throw error
    }
  }

  const sendMessage = async (content: string) => {
    try {
      const response = await chatStore.sendMessage(content)
      return response
    } catch (error: any) {
      toast.error('Erreur lors de l\'envoi du message')
      throw error
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      return await chatStore.loadMessages(conversationId)
    } catch (error: any) {
      toast.error('Erreur lors du chargement des messages')
      throw error
    }
  }

  return {
    startChat,
    sendMessage,
    loadMessages,
    activeConversation: computed(() => chatStore.activeConversation),
    conversations: computed(() => chatStore.conversations)
  }
}