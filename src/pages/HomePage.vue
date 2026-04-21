<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../components/AppShell.vue'
import ProductCard from '../components/ProductCard.vue'
import { useMarketplaceStore } from '../stores/marketplace'

const marketplaceStore = useMarketplaceStore()
const search = ref('')
const category = ref('all')
const techStack = ref('all')
const currentPage = ref(1)
const pageSize = 2

const categories = computed(() => ['all', ...new Set(marketplaceStore.listings.map((listing) => listing.category))])
const stacks = computed(() => ['all', ...new Set(marketplaceStore.listings.flatMap((listing) => listing.techStack))])

const filteredListings = computed(() =>
  marketplaceStore.listings.filter((listing) => {
    const matchesSearch = `${listing.title} ${listing.description}`.toLowerCase().includes(search.value.toLowerCase())
    const matchesCategory = category.value === 'all' || listing.category === category.value
    const matchesStack = techStack.value === 'all' || listing.techStack.includes(techStack.value)
    return matchesSearch && matchesCategory && matchesStack
  }),
)

const totalPages = computed(() => Math.max(1, Math.ceil(filteredListings.value.length / pageSize)))

const paginatedListings = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return filteredListings.value.slice(start, start + pageSize)
})
</script>

<template>
  <AppShell>
    <header class="section-padding bg-primary/[0.01] border-b border-primary/5">
      <div class="container-wide">
        <div class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div class="space-y-4">
            <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Live Inventory</p>
            <h1 class="font-display text-5xl font-black tracking-tight text-primary sm:text-7xl">
              Browse <span class="text-gradient">Catalog</span>
            </h1>
            <p class="max-w-xl text-lg font-medium text-secondary italic leading-relaxed">
              "Discover elite digital assets optimized for immediate deployment. Gated secure handoff guaranteed."
            </p>
          </div>
          <div class="grid w-full gap-4 sm:grid-cols-3 lg:w-auto">
            <input v-model="search" type="search" placeholder="Search assets..." class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30 placeholder:text-secondary/20" />
            <div class="relative">
              <select v-model="category" class="w-full appearance-none rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30">
                <option v-for="item in categories" :key="item" :value="item" class="bg-canvas">{{ item }}</option>
              </select>
            </div>
            <div class="relative">
              <select v-model="techStack" class="w-full appearance-none rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30">
                <option v-for="item in stacks" :key="item" :value="item" class="bg-canvas">{{ item }}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </header>

    <div class="container-wide py-20">
      <div v-if="paginatedListings.length > 0" class="grid gap-10 lg:grid-cols-2">
        <ProductCard v-for="listing in paginatedListings" :key="listing.id" :listing="listing" />
      </div>
      <div v-else class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5 text-primary/20">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
        </div>
        <p class="font-display text-2xl font-black text-secondary">No assets match your search</p>
        <button @click="search = ''; category = 'all'; techStack = 'all'" class="mt-6 text-sm font-bold text-gold-500 hover:underline">Clear all filters</button>
      </div>

      <div class="mt-16 flex items-center justify-between rounded-[3rem] border border-primary/5 bg-primary/[0.01] px-10 py-6">
        <p class="text-xs font-black uppercase tracking-widest text-secondary/40">Page {{ currentPage }} of {{ totalPages }}</p>
        <div class="flex gap-4">
          <button type="button" class="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/5 bg-canvas transition-all hover:border-gold-500/30 hover:text-gold-500 disabled:opacity-20" :disabled="currentPage === 1" @click="currentPage -= 1">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M15 19l-7-7 7-7"/></svg>
          </button>
          <button type="button" class="group flex h-12 w-12 items-center justify-center rounded-full border border-primary/5 bg-canvas transition-all hover:border-gold-500/30 hover:text-gold-500 disabled:opacity-20" :disabled="currentPage === totalPages" @click="currentPage += 1">
            <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7"/></svg>
          </button>
        </div>
      </div>
    </div>
  </AppShell>
</template>
