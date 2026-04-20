<script setup lang="ts">
import type { WebsiteListing } from '../types/marketplace'
import { formatCurrency } from '../utils/format'
import { useCartStore } from '../stores/cart'
import { useMarketplaceStore } from '../stores/marketplace'

defineProps<{
  listing: WebsiteListing
}>()

const cartStore = useCartStore()
const marketplaceStore = useMarketplaceStore()
</script>

<template>
  <article class="group relative flex flex-col overflow-hidden rounded-[2.5rem] border border-primary/5 bg-surface transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-gold-500/10">
    <!-- Image Section -->
    <div class="relative h-64 overflow-hidden">
      <img 
        :src="listing.image" 
        :alt="listing.title" 
        class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1" 
        loading="lazy" 
      />
      <!-- Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-60"></div>
      
      <!-- Category Badge -->
      <div class="absolute left-6 top-6">
        <span class="rounded-xl border border-primary/10 bg-canvas/40 px-4 py-2 font-display text-[10px] font-black uppercase tracking-[0.2em] text-primary backdrop-blur-md">
          {{ listing.category }}
        </span>
      </div>

      <!-- Like Button -->
      <button
        type="button"
        @click="marketplaceStore.toggleLike(listing.id)"
        class="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-primary/10 bg-canvas/40 text-primary transition-all hover:bg-gold-500 hover:text-canvas backdrop-blur-md active:scale-90"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-5 w-5" 
          :class="{ 'fill-current': marketplaceStore.likes.includes(listing.id) }"
          viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </button>
    </div>

    <!-- Content Section -->
    <div class="flex flex-1 flex-col p-8 lg:p-10">
      <div class="mb-6 space-y-3">
        <h3 class="font-display text-3xl font-black tracking-tight text-primary group-hover:text-gold-400 transition-colors">{{ listing.title }}</h3>
        <p class="line-clamp-2 text-base font-medium leading-relaxed text-secondary">{{ listing.description }}</p>
      </div>

      <!-- Tech Stack -->
      <div class="mb-8 flex flex-wrap gap-2">
        <span
          v-for="item in listing.techStack"
          :key="item"
          class="rounded-lg bg-canvas px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-secondary border border-primary/5"
        >
          {{ item }}
        </span>
      </div>

      <!-- Footer Info -->
      <div class="mt-auto flex items-end justify-between border-t border-primary/5 pt-8">
        <div class="space-y-1">
          <p class="font-display text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Investment</p>
          <p class="font-display text-3xl font-black text-primary selection:bg-gold-500/30">{{ formatCurrency(listing.price, listing.currency) }}</p>
        </div>
        
        <RouterLink 
          :to="`/products/${listing.slug}`" 
          class="flex h-14 items-center gap-3 rounded-2xl border border-primary/5 bg-canvas px-8 font-display text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-canvas"
        >
          Details
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </RouterLink>
      </div>

      <!-- Buy Button -->
      <button
        type="button"
        @click="cartStore.addToCart(listing.id)"
        class="mt-6 w-full rounded-2xl bg-gradient-premium py-4 font-display text-sm font-black uppercase tracking-[0.2em] text-canvas shadow-xl shadow-gold-500/10 transition-all hover:scale-[1.02] active:scale-95"
      >
        Acquire Now
      </button>
    </div>
  </article>
</template>
