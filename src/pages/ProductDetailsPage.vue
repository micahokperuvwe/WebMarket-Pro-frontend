<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { useCartStore } from '../stores/cart'
import { useMarketplaceStore } from '../stores/marketplace'
import { formatCurrency, formatDate } from '../utils/format'

const route = useRoute()
const marketplaceStore = useMarketplaceStore()
const cartStore = useCartStore()

const listing = computed(() => marketplaceStore.getListingBySlug(String(route.params.slug)))
const reviews = computed(() => (listing.value ? marketplaceStore.getReviews(listing.value.id) : []))
</script>

<template>
  <AppShell v-if="listing">
    <section class="grid gap-8 py-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div class="space-y-4">
        <img :src="listing.image" :alt="listing.title" class="h-[420px] w-full rounded-[32px] object-cover" />
        <div class="grid gap-4 sm:grid-cols-3">
          <img
            v-for="galleryItem in listing.gallery"
            :key="galleryItem"
            :src="galleryItem"
            :alt="listing.title"
            class="h-28 w-full rounded-[24px] object-cover"
            loading="lazy"
          />
        </div>
      </div>

      <div class="space-y-6">
        <div class="glass-panel rounded-[32px] border p-6">
          <p class="text-xs uppercase tracking-[0.28em] text-white/50">{{ listing.category }}</p>
          <h1 class="mt-3 font-display text-4xl font-semibold">{{ listing.title }}</h1>
          <p class="mt-4 text-white/72">{{ listing.description }}</p>

          <div class="mt-6 flex flex-wrap gap-2">
            <span v-for="item in listing.tags" :key="item" class="rounded-full border border-white/10 px-3 py-1 text-xs text-white/60">
              #{{ item }}
            </span>
          </div>

          <div class="mt-8 grid gap-4 sm:grid-cols-2">
            <div class="rounded-[24px] bg-white/6 p-4">
              <p class="text-xs uppercase tracking-[0.28em] text-white/50">Price</p>
              <p class="mt-3 font-display text-4xl font-semibold">{{ formatCurrency(listing.price, listing.currency) }}</p>
            </div>
            <div class="rounded-[24px] bg-white/6 p-4">
              <p class="text-xs uppercase tracking-[0.28em] text-white/50">Access</p>
              <p class="mt-3 font-display text-3xl font-semibold">{{ listing.accessModel }}</p>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              class="rounded-full bg-white px-6 py-3 font-medium text-ink-950"
              @click="cartStore.addToCart(listing.id)"
            >
              Add to cart
            </button>
            <a :href="listing.demoUrl" target="_blank" rel="noreferrer" class="rounded-full border border-white/10 px-6 py-3 text-white/80">
              Live demo
            </a>
          </div>
        </div>

        <div class="glass-panel rounded-[32px] border p-6">
          <p class="text-xs uppercase tracking-[0.28em] text-white/50">Tech stack</p>
          <div class="mt-4 flex flex-wrap gap-2">
            <span v-for="item in listing.techStack" :key="item" class="rounded-full bg-white/6 px-4 py-2 text-sm">
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="space-y-5 py-4">
      <div>
        <p class="text-xs uppercase tracking-[0.28em] text-white/50">Reviews and ratings</p>
        <h2 class="font-display text-3xl font-semibold">Buyer feedback</h2>
      </div>
      <div class="grid gap-4">
        <article v-for="review in reviews" :key="review.id" class="glass-panel rounded-[28px] border p-5">
          <div class="flex items-center justify-between gap-4">
            <h3 class="font-medium">{{ review.userName }}</h3>
            <p class="text-sm text-white/60">{{ formatDate(review.createdAt) }}</p>
          </div>
          <p class="mt-2 text-sm text-gold-400">{{ '★'.repeat(review.rating) }}</p>
          <p class="mt-3 text-white/72">{{ review.comment }}</p>
        </article>
      </div>
    </section>
  </AppShell>
</template>
