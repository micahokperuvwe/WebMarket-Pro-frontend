<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AdminShell from '../../components/AdminShell.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const orders = ref<any[]>([])
const isLoading = ref(true)

async function fetchOrders() {
  isLoading.value = true
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    orders.value = data
  } catch (err) {
    console.error('Failed to fetch orders:', err)
  } finally {
    isLoading.value = false
  }
}

async function updateStatus(id: string, status: string) {
  try {
    const res = await fetch(`${API_BASE}/orders/${id}/status`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    if (res.ok) {
      fetchOrders()
    }
  } catch (err) {
    console.error('Update status failed:', err)
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'paid': return 'text-mint-400 bg-mint-400/10'
    case 'pending': return 'text-gold-400 bg-gold-400/10'
    case 'delivered': return 'text-ink-400 bg-ink-400/10'
    default: return 'text-secondary bg-primary/5'
  }
}

onMounted(fetchOrders)
</script>

<template>
  <AdminShell>
    <div class="space-y-8">
      <header>
        <h1 class="font-display text-4xl font-bold tracking-tight text-primary">Order <span class="text-gradient">Fulfillment</span></h1>
        <p class="text-sm text-secondary">Track and manage customer purchases and delivery status.</p>
      </header>

      <div class="glass-panel overflow-hidden rounded-[2rem] border border-primary/10 shadow-2xl">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-primary/10 bg-primary/5 text-xs font-bold uppercase tracking-widest text-secondary">
                <th class="px-6 py-5">Order #</th>
                <th class="px-6 py-5">Customer</th>
                <th class="px-6 py-5">Items</th>
                <th class="px-6 py-5">Total</th>
                <th class="px-6 py-5">Status</th>
                <th class="px-6 py-5">Date</th>
                <th class="px-6 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary/5">
               <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
                 <td colspan="7" class="px-6 py-8"><div class="h-4 w-full rounded bg-primary/5"></div></td>
               </tr>
               <tr v-else-if="orders.length === 0">
                 <td colspan="7" class="px-6 py-12 text-center text-secondary">No orders found.</td>
               </tr>
               <tr v-else v-for="order in orders" :key="order.id" class="transition-all hover:bg-primary/5">
                <td class="px-6 py-4">
                  <p class="text-sm font-bold text-primary">{{ order.order_number }}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-sm font-medium text-primary">{{ order.email }}</p>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-secondary">
                     {{ order.order_items?.[0]?.title || 'Unknown Item' }}
                     <span v-if="order.order_items?.length > 1" class="text-gold-400">
                       +{{ order.order_items.length - 1 }} more
                     </span>
                  </p>
                </td>
                <td class="px-6 py-4">
                  <p class="font-display font-bold text-mint-400 text-sm">${{ order.total }}</p>
                </td>
                <td class="px-6 py-4">
                  <span :class="getStatusColor(order.status)" class="rounded-full px-3 py-1 text-[10px] font-bold uppercase">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <p class="text-xs text-secondary">{{ new Date(order.created_at).toLocaleDateString() }}</p>
                </td>
                <td class="px-6 py-4 text-right">
                  <div class="flex items-center justify-end gap-2">
                    <select 
                      class="rounded-lg border border-primary/10 bg-primary/5 px-2 py-1 text-[10px] uppercase outline-none focus:border-gold-400/50 text-primary"
                      :value="order.status"
                      @change="updateStatus(order.id, ($event.target as HTMLSelectElement).value)"
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="delivered">Delivered</option>
                    </select>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </AdminShell>

</template>
