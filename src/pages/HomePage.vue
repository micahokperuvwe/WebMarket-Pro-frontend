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
    <section class="space-y-8 py-6">
      <div class="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p class="text-xs uppercase tracking-[0.28em] text-white/50">Catalog</p>
          <h1 class="font-display text-4xl font-semibold">Browse websites</h1>
          <p class="mt-3 max-w-2xl text-white/70">Search by stack, price position, niche, and launch readiness.</p>
        </div>
        <div class="grid gap-3 sm:grid-cols-3">
          <input v-model="search" type="search" placeholder="Search websites" class="rounded-full border border-white/10 bg-transparent px-4 py-3 outline-none glass-panel" />
          <select v-model="category" class="rounded-full border border-white/10 bg-transparent px-4 py-3 outline-none glass-panel">
            <option v-for="item in categories" :key="item" :value="item">{{ item }}</option>
          </select>
          <select v-model="techStack" class="rounded-full border border-white/10 bg-transparent px-4 py-3 outline-none glass-panel">
            <option v-for="item in stacks" :key="item" :value="item">{{ item }}</option>
          </select>
        </div>
      </div>

      <div class="grid gap-6 lg:grid-cols-2">
        <ProductCard v-for="listing in paginatedListings" :key="listing.id" :listing="listing" />
      </div>

      <div class="flex items-center justify-between rounded-[28px] border border-white/10 px-5 py-4 glass-panel">
        <p class="text-sm text-white/70">Page {{ currentPage }} of {{ totalPages }}</p>
        <div class="flex gap-3">
          <button type="button" class="rounded-full border border-white/10 px-4 py-2 text-sm" :disabled="currentPage === 1" @click="currentPage -= 1">Prev</button>
          <button type="button" class="rounded-full border border-white/10 px-4 py-2 text-sm" :disabled="currentPage === totalPages" @click="currentPage += 1">Next</button>
        </div>
      </div>
    </section>
  </AppShell>
</template>
