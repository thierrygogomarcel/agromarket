import { ref, computed } from 'vue'
import { useNhostClient } from '@nhost/vue'
import { useToast } from './useToast'

export const useChat = () => {
  const nhost = useNhostClient()
  const toast = useToast()
  const loading = ref(false)
  const activeConversation = ref<string | null>(null)
  const conversations = ref<Record<string, any[]>>({})

  const startChat = async (userId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation StartConversation($userId: uuid!) {
          insert_conversations_one(object: {
            participant_ids: [auth.uid(), $userId]
          }) {
            id
            participant_ids
            created_at
          }
        }
      `, {
        variables: { userId }
      })

      if (error) throw error
      activeConversation.value = data.insert_conversations_one.id
      toast.success('Conversation démarrée')
      return data.insert_conversations_one
    } catch (error: any) {
      toast.error('Erreur lors du démarrage de la conversation')
      throw error
    } finally {
      loading.value = false
    }
  }

  const sendMessage = async (content: string) => {
    if (!activeConversation.value) throw new Error('Aucune conversation active')

    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        mutation SendMessage($message: messages_insert_input!) {
          insert_messages_one(object: $message) {
            id
            content
            sender_id
            conversation_id
            created_at
          }
        }
      `, {
        variables: {
          message: {
            content,
            conversation_id: activeConversation.value,
            sender_id: nhost.auth.getUser()?.id
          }
        }
      })

      if (error) throw error
      
      // Update local messages
      if (!conversations.value[activeConversation.value]) {
        conversations.value[activeConversation.value] = []
      }
      conversations.value[activeConversation.value].push(data.insert_messages_one)
      
      return data.insert_messages_one
    } catch (error: any) {
      toast.error('Erreur lors de l\'envoi du message')
      throw error
    } finally {
      loading.value = false
    }
  }

  const loadMessages = async (conversationId: string) => {
    try {
      loading.value = true
      const { data, error } = await nhost.graphql.request(`
        query GetMessages($conversationId: uuid!) {
          messages(
            where: { conversation_id: { _eq: $conversationId } }
            order_by: { created_at: asc }
          ) {
            id
            content
            sender_id
            created_at
          }
        }
      `, {
        variables: { conversationId }
      })

      if (error) throw error
      conversations.value[conversationId] = data.messages
      return data.messages
    } catch (error: any) {
      toast.error('Erreur lors du chargement des messages')
      throw error
    } finally {
      loading.value = false
    }
  }

  return {
    loading: computed(() => loading.value),
    activeConversation: computed(() => activeConversation.value),
    conversations: computed(() => conversations.value),
    startChat,
    sendMessage,
    loadMessages
  }
}