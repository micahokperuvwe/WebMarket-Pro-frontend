<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import { useCartStore } from '../stores/cart'
import { formatCurrency } from '../utils/format'

const cartStore = useCartStore()
</script>

<template>
  <AppShell>
    <section class="space-y-6 py-8">
      <div>
        <p class="text-xs uppercase tracking-[0.28em] text-secondary">Cart</p>
        <h1 class="font-display text-4xl font-semibold text-primary">Ready for checkout</h1>
      </div>

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
          <RouterLink to="/checkout" class="mt-6 inline-flex rounded-full bg-primary px-6 py-3 font-black uppercase tracking-widest text-sm text-canvas">
            Continue to checkout
          </RouterLink>
        </aside>
      </div>
    </section>
  </AppShell>
</template>
