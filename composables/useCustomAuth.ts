import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useCookie } from '#imports'

// Définition de l'interface représentant les données d'un utilisateur
interface UserData {
  id?: string
  email: string
  fullName: string
  userType: 'admin' | 'producer' | 'buyer' | 'transport' // Type d'utilisateur
  role: string // Rôle spécifique de l'utilisateur
  status: 'active' | 'inactive' // Statut actif ou inactif
  avatarUrl?: string
  phone?: string
  entityType?: string
}

// Interface représentant l'état d'authentification
interface AuthState {
  token: string | null // Jeton d'authentification (stocké dans un cookie)
  user: UserData | null // Informations de l'utilisateur connecté
  loading: boolean // Indicateur de chargement pour suivre les actions asynchrones
}

// Définition du store Pinia pour gérer l'authentification
export const useCustomAuth = defineStore('auth', () => {
  // Définition de l'état initial du store
  const state = ref<AuthState>({
    token: useCookie('auth_token').value ?? null, // Récupération du token stocké dans un cookie
    user: null,
    loading: false,
  })

  // Vérifie si l'utilisateur est authentifié (token et utilisateur doivent être présents)
  const isAuthenticated = computed(() => !!state.value.token && !!state.value.user)

  // Fonction de connexion
  async function login(email: string, password: string) {
    console.log('Tentative de connexion pour:', email)
    try {
      state.value.loading = true

      // Appel à l'API d'authentification avec les identifiants de l'utilisateur
      const response = await $fetch<{ token: string; user: UserData }>('/api/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      // Vérification de la réponse (le token est obligatoire)
      if (!response || !response.token) {
        console.error('Erreur: Token invalide ou absent')
        throw new Error('Token invalide')
      }

      // Mise à jour de l'état avec les informations de l'utilisateur et son token
      state.value.token = response.token
      state.value.user = response.user

      // Stockage du token dans un cookie pour persister l'authentification
      const tokenCookie = useCookie('auth_token')
      tokenCookie.value = response.token

      console.log('Connexion réussie:', response.user)
      return response
    } catch (error: any) {
      console.error('Échec de la connexion:', error.message)

      // En cas d'erreur, on réinitialise les valeurs du store
      state.value.token = null
      state.value.user = null

      // Suppression du cookie d'authentification
      const tokenCookie = useCookie('auth_token')
      tokenCookie.value = null

      throw error // Propagation de l'erreur pour la gestion dans l'interface utilisateur
    } finally {
      state.value.loading = false // Désactivation du chargement une fois la requête terminée
    }
  }

  // Fonction de déconnexion de l'utilisateur
  function logout() {
    console.log('Déconnexion de l\'utilisateur:', state.value.user?.email)

    // Suppression des informations d'authentification
    state.value.token = null
    state.value.user = null

    // Suppression du cookie d'authentification
    const tokenCookie = useCookie('auth_token')
    tokenCookie.value = null

    console.log('Déconnexion réussie')
  }

  // Retourne les valeurs et fonctions du store pour utilisation dans l'application
  return {
    state,
    isAuthenticated,
    login,
    logout
  }
})
