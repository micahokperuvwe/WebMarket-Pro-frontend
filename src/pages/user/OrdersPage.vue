<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AppShell from '../../components/AppShell.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const orders = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')
const downloadingId = ref<string | null>(null)

async function fetchOrders() {
  if (!authStore.token) return
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/orders`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (!res.ok) throw new Error('Failed to fetch orders')
    const data = await res.json()
    orders.value = Array.isArray(data) ? data : []
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function downloadWebsite(websiteId: string) {
  downloadingId.value = websiteId
  try {
    const res = await fetch(`${API_BASE}/websites/download/${websiteId}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    if (data.downloadUrl) {
      window.open(data.downloadUrl, '_blank')
    } else {
      alert(data.error || 'Download not available')
    }
  } catch (err: any) {
    alert('Failed to get download link: ' + err.message)
  } finally {
    downloadingId.value = null
  }
}

const statusConfig: Record<string, { label: string, class: string }> = {
  pending:   { label: 'Pending',   class: 'text-gold-400 bg-gold-400/10 border-gold-400/20' },
  paid:      { label: 'Paid',      class: 'text-mint-400 bg-mint-400/10 border-mint-400/20' },
  delivered: { label: 'Delivered', class: 'text-blue-400 bg-blue-400/10 border-blue-400/20' },
}

onMounted(fetchOrders)
</script>

<template>
  <AppShell>
    <header class="section-padding bg-primary/[0.01] border-b border-primary/5">
      <div class="container-wide">
        <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Inventory Management</p>
        <h1 class="mt-4 font-display text-5xl font-black tracking-tight text-primary sm:text-7xl">
          Orders <span class="text-gradient">&amp; Downloads</span>
        </h1>
      </div>
    </header>

    <div class="container-wide py-16">

      <!-- Loading -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 3" :key="i" class="glass-panel animate-pulse rounded-[2.5rem] border border-primary/5 p-8">
          <div class="flex items-center gap-6">
            <div class="h-16 w-16 rounded-2xl bg-primary/5"></div>
            <div class="flex-1 space-y-3">
              <div class="h-5 w-1/3 rounded-xl bg-primary/5"></div>
              <div class="h-4 w-1/2 rounded-xl bg-primary/5"></div>
            </div>
            <div class="h-10 w-28 rounded-2xl bg-primary/5"></div>
          </div>
        </div>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
          </svg>
        </div>
        <p class="font-display text-2xl font-bold text-secondary">{{ error }}</p>
      </div>

      <!-- Empty -->
      <div v-else-if="orders.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/5 text-primary/20">
          <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-black tracking-tight text-secondary">No orders yet</p>
        <p class="mt-3 text-secondary/40">Your completed purchases will appear here.</p>
        <RouterLink to="/home" class="mt-10 rounded-full bg-primary px-10 py-4 font-display text-sm font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95">
          Start Shopping
        </RouterLink>
      </div>

      <!-- Orders List -->
      <div v-else class="space-y-6">
        <article
          v-for="order in orders"
          :key="order.id"
          class="group glass-panel overflow-hidden rounded-[2.5rem] border border-primary/5 transition-all duration-300 hover:border-primary/10"
        >
          <!-- Order Header -->
          <div class="flex flex-col gap-4 border-b border-primary/5 p-8 md:flex-row md:items-center md:justify-between">
            <div class="space-y-1">
              <p class="font-display text-[10px] font-black uppercase tracking-[0.3em] text-secondary/30">Order Reference</p>
              <p class="font-display text-lg font-black text-primary">{{ order.order_number || order.id?.slice(0, 8)?.toUpperCase() }}</p>
              <p class="text-xs font-bold text-secondary/50">{{ new Date(order.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}</p>
            </div>
            <div class="flex items-center gap-6">
              <div class="text-right">
                <p class="font-display text-[10px] font-black uppercase tracking-widest text-secondary/30">Total Value</p>
                <p class="font-display text-2xl font-black text-primary">${{ Number(order.total).toLocaleString() }}</p>
              </div>
              <span
                :class="statusConfig[order.status]?.class || 'text-secondary/50 bg-primary/5 border-primary/10'"
                class="inline-flex items-center gap-2 rounded-2xl border px-5 py-2.5 text-[10px] font-black uppercase tracking-widest"
              >
                <span class="h-1.5 w-1.5 rounded-full bg-current animate-pulse"></span>
                {{ statusConfig[order.status]?.label || order.status }}
              </span>
            </div>
          </div>

          <!-- Order Items -->
          <div class="divide-y divide-primary/5">
            <div
              v-for="item in order.order_items"
              :key="item.id"
              class="flex flex-col gap-4 p-8 transition-all hover:bg-primary/5 md:flex-row md:items-center md:justify-between"
            >
              <div class="flex items-center gap-5">
                <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/5 text-primary/20">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"/>
                  </svg>
                </div>
                <div>
                  <p class="font-display text-lg font-extrabold text-primary">{{ item.title || 'Website Package' }}</p>
                  <p class="text-xs font-bold text-secondary/50">Website · Digital Asset</p>
                </div>
              </div>

              <div class="flex items-center gap-4">
                <p class="font-display text-xl font-black text-mint-400">${{ Number(item.price).toLocaleString() }}</p>
                
                <button
                  v-if="order.status === 'paid' || order.status === 'delivered'"
                  @click="downloadWebsite(item.website_id)"
                  :disabled="downloadingId === item.website_id"
                  class="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 font-display text-xs font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95 disabled:opacity-50"
                >
                  <svg v-if="downloadingId !== item.website_id" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
                  </svg>
                  <svg v-else class="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                  </svg>
                  {{ downloadingId === item.website_id ? 'Getting link...' : 'Download' }}
                </button>

                <span v-else class="rounded-2xl border border-primary/5 bg-primary/5 px-6 py-3 font-display text-xs font-black uppercase tracking-widest text-secondary/30">
                  Awaiting Payment
                </span>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </AppShell>
</template>
