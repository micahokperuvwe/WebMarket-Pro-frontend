<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/format'

const route = useRoute()
const cartStore = useCartStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const isLoading = ref(true)
const error = ref('')
const order = ref<any | null>(null)
const downloadingId = ref<string | null>(null)
const pollAttempts = ref(0)

const reference = computed(() => {
  const raw = route.query.reference
  return typeof raw === 'string' ? raw : ''
})

const isPaid = computed(() => ['processing', 'processed', 'paid', 'delivered'].includes(order.value?.status))
const isPending = computed(() => order.value?.status === 'pending')

let pollTimer: ReturnType<typeof setTimeout> | null = null

async function fetchOrder() {
  if (!reference.value) {
    error.value = 'Missing payment reference.'
    isLoading.value = false
    return
  }

  try {
    const res = await fetch(`${API_BASE}/payments/order/${encodeURIComponent(reference.value)}`)

    const payload = await res.json()

    if (!res.ok) {
      throw new Error(payload?.error || 'Unable to load order confirmation')
    }

    order.value = payload

    if (['processing', 'processed', 'paid', 'delivered'].includes(payload?.status)) {
      cartStore.clearCart()
    }
  } catch (err: any) {
    error.value = err.message || 'Unable to load order confirmation'
  } finally {
    isLoading.value = false
  }
}

async function startPollingIfNeeded() {
  if (!isPending.value || pollAttempts.value >= 12) {
    return
  }

  pollTimer = setTimeout(async () => {
    pollAttempts.value += 1
    await fetchOrder()
    if (isPending.value) {
      await startPollingIfNeeded()
    }
  }, 5000)
}

async function downloadWebsite(itemId: string) {
  downloadingId.value = itemId
  try {
    const res = await fetch(
      `${API_BASE}/payments/order/${encodeURIComponent(reference.value)}/download/${encodeURIComponent(itemId)}`,
    )
    const data = await res.json()
    if (data.downloadUrl) {
      window.open(data.downloadUrl, '_blank')
    } else {
      alert(data.error || 'Download not available')
    }
  } catch (err: any) {
    alert(`Failed to get download link: ${err.message}`)
  } finally {
    downloadingId.value = null
  }
}

onMounted(async () => {
  await fetchOrder()
  await startPollingIfNeeded()
})

onBeforeUnmount(() => {
  if (pollTimer) {
    clearTimeout(pollTimer)
  }
})
</script>

<template>
  <AppShell>
    <section class="container-wide py-16">
      <div class="mx-auto max-w-4xl space-y-8">
        <header class="space-y-4 text-center">
          <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Order Delivery</p>
          <h1 class="font-display text-5xl font-black tracking-tight text-primary sm:text-6xl">
            Purchase <span class="text-gradient">Confirmation</span>
          </h1>
          <p class="mx-auto max-w-2xl text-sm font-medium leading-relaxed text-secondary">
            Your payment return page is now linked to your order. Once Paystack confirms the charge, your downloads appear here immediately without forcing a login first.
          </p>
        </header>

        <div v-if="isLoading" class="glass-panel rounded-[2.5rem] border border-primary/10 p-10 text-center">
          <p class="font-display text-2xl font-black text-primary">Loading your order...</p>
        </div>

        <div v-else-if="error" class="glass-panel rounded-[2.5rem] border border-red-400/20 bg-red-400/5 p-10 text-center">
          <p class="font-display text-2xl font-black text-red-400">{{ error }}</p>
        </div>

        <template v-else-if="order">
          <section class="glass-panel rounded-[2.5rem] border border-primary/10 p-8 sm:p-10">
            <div class="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div class="space-y-3">
                <p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">Order Reference</p>
                <p class="font-display text-2xl font-black text-primary">{{ order.order_number || order.id }}</p>
                <p class="text-sm font-medium text-secondary">Payment reference: {{ order.payment_reference }}</p>
              </div>
              <span
                :class="isPaid ? 'border-mint-400/20 bg-mint-400/10 text-mint-400' : 'border-gold-400/20 bg-gold-400/10 text-gold-400'"
                class="inline-flex items-center gap-2 rounded-2xl border px-5 py-3 text-xs font-black uppercase tracking-widest"
              >
                <span class="h-2 w-2 rounded-full bg-current"></span>
                {{ isPaid ? 'Payment Confirmed' : 'Awaiting Confirmation' }}
              </span>
            </div>

            <div class="mt-8 rounded-[2rem] border border-primary/5 bg-primary/5 p-6">
              <p v-if="isPaid" class="text-sm font-medium leading-relaxed text-secondary">
                Your purchase is confirmed. You can download your files below right now.
              </p>
              <p v-else class="text-sm font-medium leading-relaxed text-secondary">
                We are waiting for Paystack webhook confirmation. This page refreshes automatically for about one minute after payment return.
              </p>
            </div>

            <div class="mt-6 flex flex-wrap gap-4">
              <RouterLink
                to="/orders"
                class="rounded-2xl border border-primary/10 px-6 py-3 text-xs font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/5"
              >
                View All Orders
              </RouterLink>
              <RouterLink
                to="/home"
                class="rounded-2xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500"
              >
                Continue Shopping
              </RouterLink>
            </div>
          </section>

          <section class="glass-panel rounded-[2.5rem] border border-primary/10 p-8 sm:p-10">
            <div class="mb-8 flex items-center justify-between gap-4">
              <div>
                <p class="text-xs font-black uppercase tracking-[0.28em] text-secondary">Purchased Items</p>
                <p class="mt-2 font-display text-3xl font-black text-primary">
                  {{ formatCurrency(Number(order.total), 'NGN') }}
                </p>
              </div>
            </div>

            <div class="space-y-4">
              <article
                v-for="item in order.order_items"
                :key="item.id"
                class="flex flex-col gap-4 rounded-[2rem] border border-primary/5 p-6 md:flex-row md:items-center md:justify-between"
              >
                <div class="space-y-1">
                  <p class="font-display text-xl font-black text-primary">{{ item.title || 'Website Package' }}</p>
                  <p class="text-sm font-medium text-secondary">Digital asset delivery is unlocked after payment confirmation.</p>
                </div>

                <div class="flex items-center gap-4">
                  <p class="font-display text-xl font-black text-gold-500">{{ formatCurrency(Number(item.price), 'USD') }}</p>

                  <button
                    v-if="isPaid && item.website_id"
                    type="button"
                    :disabled="downloadingId === item.id"
                    class="rounded-2xl bg-primary px-6 py-3 text-xs font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 disabled:opacity-50"
                    @click="downloadWebsite(item.id)"
                  >
                    {{ downloadingId === item.id ? 'Preparing...' : 'Download Now' }}
                  </button>

                  <span
                    v-else
                    class="rounded-2xl border border-primary/10 bg-primary/5 px-6 py-3 text-xs font-black uppercase tracking-widest text-secondary"
                  >
                    {{ isPaid ? 'Delivery Pending' : 'Pending' }}
                  </span>
                </div>
              </article>
            </div>
          </section>
        </template>
      </div>
    </section>
  </AppShell>
</template>
