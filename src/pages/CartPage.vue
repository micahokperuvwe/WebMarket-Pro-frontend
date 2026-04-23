<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/format'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

async function continueToCheckout() {
  if (!authStore.isLoggedIn) {
    await router.push({ name: 'login', query: { redirect: '/checkout' } })
    return
  }

  await router.push({ name: 'checkout' })
}
</script>

<template>
  <AppShell>
    <header class="section-padding bg-primary/[0.01] border-b border-primary/5">
      <div class="container-wide">
        <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Checkout Flow</p>
        <h1 class="mt-4 font-display text-5xl font-black tracking-tight text-primary sm:text-7xl">
          Your <span class="text-gradient">Cart</span>
        </h1>
      </div>
    </header>

    <div class="container-wide py-16">

      <div class="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div class="space-y-4">
          <article v-for="item in cartStore.detailedItems" :key="item?.listing.id" class="glass-panel rounded-[28px] border border-primary/10 p-5">
            <div v-if="item" class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p class="font-display text-2xl font-semibold text-primary">{{ item.listing.title }}</p>
                <p class="mt-2 text-sm text-secondary">{{ item.listing.description }}</p>
              </div>
              <div class="text-right">
                <p class="text-sm text-secondary">Qty {{ item.quantity }}</p>
                <p class="mt-2 font-display text-3xl font-semibold text-primary">{{ formatCurrency(item.subtotal) }}</p>
                <button type="button" class="mt-3 text-sm text-rose-400" @click="cartStore.removeFromCart(item.listing.id)">Remove</button>
              </div>
            </div>
          </article>
        </div>

        <aside class="glass-panel h-fit rounded-[28px] border border-primary/10 p-6">
          <p class="text-xs uppercase tracking-[0.28em] text-secondary">Summary</p>
          <p class="mt-4 font-display text-4xl font-semibold text-primary">{{ formatCurrency(cartStore.subtotal) }}</p>
          <p class="mt-3 text-sm text-secondary">Secure Paystack checkout, email receipt, and gated delivery after payment verification.</p>
          <button
            type="button"
            @click="continueToCheckout"
            class="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-black uppercase tracking-widest text-sm text-canvas"
          >
            Continue to checkout
          </button>
        </aside>
      </div>
    </div>
  </AppShell>
</template>
