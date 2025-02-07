```vue
<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Historique des transactions</h3>
    </div>
    
    <div class="border-t border-gray-200">
      <div v-if="loading" class="p-4 text-center">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
      </div>

      <div v-else-if="transactions.length === 0" class="p-4 text-center text-gray-500">
        Aucune transaction à afficher
      </div>

      <div v-else class="flow-root">
        <ul role="list" class="divide-y divide-gray-200">
          <li v-for="transaction in transactions" :key="transaction.id" class="p-4">
            <div class="flex items-center space-x-4">
              <div class="flex-shrink-0">
                <span :class="[
                  'inline-flex items-center justify-center h-8 w-8 rounded-full',
                  getStatusColor(transaction.status)
                ]">
                  <span class="text-white text-lg">{{ getStatusIcon(transaction.status) }}</span>
                </span>
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ transaction.description }}
                </p>
                <p class="text-sm text-gray-500">
                  {{ formatDate(transaction.createdAt) }}
                </p>
              </div>
              <div class="flex-shrink-0 text-right">
                <p :class="[
                  'text-sm font-medium',
                  transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                ]">
                  {{ transaction.type === 'credit' ? '+' : '-' }}{{ transaction.amount }} FCFA
                </p>
                <p class="text-sm text-gray-500">
                  {{ transaction.status }}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Transaction {
  id: string
  amount: number
  type: 'credit' | 'debit'
  status: 'pending' | 'completed' | 'failed'
  description: string
  createdAt: string
}

const props = defineProps<{
  transactions: Transaction[]
  loading?: boolean
}>()

const getStatusColor = (status: string) => {
  const colors = {
    pending: 'bg-yellow-500',
    completed: 'bg-green-500',
    failed: 'bg-red-500'
  }
  return colors[status as keyof typeof colors] || 'bg-gray-500'
}

const getStatusIcon = (status: string) => {
  const icons = {
    pending: '⏳',
    completed: '✓',
    failed: '✕'
  }
  return icons[status as keyof typeof icons] || '?'
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>
```