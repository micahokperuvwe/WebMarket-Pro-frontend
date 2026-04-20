<script setup lang="ts">
import { computed } from 'vue'
import AppShell from '../components/AppShell.vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/format'

const authStore = useAuthStore()
const cartStore = useCartStore()

// Fixed exchange rates to NGN for automatic conversion at checkout
const EXCHANGE_RATES: Record<string, number> = {
  'NGN': 1,
  'USD': 1500,
  'EUR': 1600,
  'GBP': 1900,
  'CAD': 1100
}

const totalInNGN = computed(() => {
  return cartStore.detailedItems.reduce((total, item) => {
    if (!item) return total
    const rate = EXCHANGE_RATES[item.listing.currency] || 1
    return total + (item.subtotal * rate)
  }, 0)
})

function initializePayment() {
  console.log('Initializing Paystack payment for:', totalInNGN.value, 'NGN')
  // This will call the backend later
  alert(`Payment of ${formatCurrency(totalInNGN.value, 'NGN')} initialized via Paystack.`)
}
</script>

<template>
  <AppShell>
    <section class="grid gap-6 py-8 lg:grid-cols-[1fr_0.9fr] max-w-7xl mx-auto">
      <div class="glass-panel rounded-[32px] border border-white/5 bg-white/[0.02] p-8 lg:p-12">
        <p class="font-display text-[11px] font-black uppercase tracking-[0.25em] text-secondary">Checkout</p>
        <h1 class="mt-4 font-display text-5xl font-black tracking-tight text-primary line-height-1">
          Secure <span class="text-gradient">Acquisition</span>
        </h1>
        <p class="mt-6 text-lg font-medium text-secondary leading-relaxed">
          Your digital assets are ready for deployment. We are transitioning your cart to Paystack for secure Naira (NGN) processing.
        </p>

        <div class="mt-12 grid gap-6 sm:grid-cols-2">
          <div class="rounded-[2.5rem] bg-primary/5 p-8 border border-primary/5 transition-all hover:bg-primary/10">
            <p class="font-display text-[10px] font-black uppercase tracking-widest text-secondary">Authorized Buyer</p>
            <p class="mt-4 font-display text-xl font-bold text-primary">{{ authStore.currentUser?.name || 'Anonymous User' }}</p>
            <p class="text-sm font-medium text-secondary">{{ authStore.currentUser?.email }}</p>
          </div>
          <div class="rounded-[2.5rem] bg-primary/5 p-8 border border-primary/5 transition-all hover:bg-primary/10">
            <p class="font-display text-[10px] font-black uppercase tracking-widest text-secondary">Deployment Handle</p>
            <p class="mt-4 text-sm font-bold text-primary/60 leading-relaxed">{{ authStore.currentUser?.address || 'No address provided' }}</p>
          </div>
        </div>

        <div class="mt-12 rounded-[2.5rem] border border-dashed border-primary/10 bg-primary/5 p-8">
          <p class="font-display text-sm font-black uppercase tracking-widest text-primary/60 mb-6">Payment Protocool</p>
          <ul class="space-y-4">
            <li v-for="(step, i) in ['Order generation in Supabase', 'Paystack initialization (NGN Conversion)', 'Webhook verification', 'Instant source unlocking']" :key="i" class="flex items-center gap-4 text-sm font-medium text-secondary">
              <span class="flex h-6 w-6 items-center justify-center rounded-full bg-primary/5 text-[10px] font-black text-primary/40">{{ i + 1 }}</span>
              {{ step }}
            </li>
          </ul>
        </div>
      </div>

      <aside class="flex flex-col gap-6">
        <div class="glass-panel rounded-[32px] border border-primary/5 bg-primary/5 p-8 lg:p-12">
          <p class="font-display text-[11px] font-black uppercase tracking-[0.25em] text-secondary">Order Summary</p>
          
          <div class="mt-10 space-y-6">
            <div v-for="item in cartStore.detailedItems" :key="item?.listing.id" class="flex items-center justify-between border-b border-primary/5 pb-6">
              <div>
                <p class="font-display text-base font-bold text-primary">{{ item?.listing.title }}</p>
                <p class="text-[10px] font-black uppercase tracking-widest text-secondary">Category: {{ item?.listing.category }}</p>
              </div>
              <p class="font-display text-lg font-black text-primary">{{ formatCurrency(item?.subtotal ?? 0, item?.listing.currency) }}</p>
            </div>
          </div>

          <div class="mt-10 space-y-4">
            <div class="flex items-center justify-between">
              <p class="text-sm font-bold text-secondary">Conversion Logic</p>
              <p class="text-[10px] font-black uppercase tracking-widest text-gold-400">Automatic NGN</p>
            </div>
            <div class="flex items-center justify-between">
              <p class="font-display text-2xl font-black text-primary">Total Payable</p>
              <div class="text-right">
                <p class="font-display text-4xl font-black text-primary selection:bg-gold-500/30">
                  {{ formatCurrency(totalInNGN, 'NGN') }}
                </p>
                <p class="text-[10px] font-black uppercase tracking-widest text-secondary mt-1">Converted at market approx.</p>
              </div>
            </div>
          </div>

          <button 
            @click="initializePayment"
            class="group relative mt-12 w-full overflow-hidden rounded-[2rem] bg-primary py-6 font-display text-base font-black uppercase tracking-[0.2em] text-canvas transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-primary/5"
          >
            <span class="relative z-10 flex items-center justify-center gap-3">
              Initialize NGN Checkout
              <svg class="h-5 w-5 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
            <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform duration-500 group-hover:translate-x-0"></div>
          </button>
        </div>

        <div class="rounded-[2.5rem] bg-gold-400/5 border border-gold-400/10 p-8 text-center transition-all hover:bg-gold-400/10">
          <p class="text-xs font-black uppercase tracking-widest text-gold-400 mb-2">Notice</p>
          <p class="text-xs font-medium text-gold-400/60 leading-relaxed">
            International assets are billed in Naira at the prevailing marketplace rate of 1500 NGN/USD to ensure local payment compatibility.
          </p>
        </div>
      </aside>
    </section>
  </AppShell>
</template>
