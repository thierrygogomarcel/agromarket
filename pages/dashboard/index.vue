<template>
  <div>
    <!-- Dynamic dashboard component based on user role -->
    <AdminDashboard v-if="userRole === 'admin'" />
    <SellerDashboard v-else-if="userType === 'producer'" />
    <BuyerDashboard v-else />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAuth } from '~/composables/useCustomAuth'
import AdminDashboard from '../admin/dashboard.vue'
import SellerDashboard from './SellerDashboard.vue'
import BuyerDashboard from './BuyerDashboard.vue'
import { navigateTo } from 'nuxt/app'

const auth = useAuth()

const userRole = computed(() => auth.state?.user?.role)
const userType = computed(() => auth.state?.user?.userType)

// Redirect if not authenticated
if (!auth.isAuthenticated) {
  navigateTo('/connexion')
}
</script>