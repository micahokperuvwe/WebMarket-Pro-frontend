<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { useCartStore } from '../../stores/cart'
import SiteHeader from '../../components/SiteHeader.vue'
import SiteFooter from '../../components/SiteFooter.vue'
import { formatCurrency } from '../../utils/format'

const authStore = useAuthStore()
const cartStore = useCartStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const likedWebsites = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')

async function fetchLikes() {
  if (!authStore.token) return
  isLoading.value = true
  error.value = ''
  try {
    // 1. Get liked website IDs
    const likesRes = await fetch(`${API_BASE}/likes`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (!likesRes.ok) throw new Error('Failed to fetch likes')
    const likes = await likesRes.json()

    if (!likes.length) {
      likedWebsites.value = []
      return
    }

    // 2. Fetch details for each website
    const websitePromises = likes.map((like: any) =>
      fetch(`${API_BASE}/websites/${like.website_id}`, {
        headers: { Authorization: `Bearer ${authStore.token}` }
      }).then(r => r.ok ? r.json() : null)
    )
    const websites = await Promise.all(websitePromises)
    likedWebsites.value = websites.filter(Boolean).map((w: any, i: number) => ({
      ...w,
      likeId: likes[i]?.id,
    }))
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function unlike(websiteId: string) {
  try {
    await fetch(`${API_BASE}/likes/website/${websiteId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    likedWebsites.value = likedWebsites.value.filter(w => w.id !== websiteId)
  } catch (err) {
    console.error('Failed to unlike:', err)
  }
}

function addToCart(website: any) {
  cartStore.addToCart(website.id)
}

onMounted(fetchLikes)
</script>

<template>
  <div class="min-h-screen bg-primary text-primary">
    <SiteHeader />

    <main class="mx-auto max-w-7xl px-6 py-16">
      <!-- Header -->
      <header class="mb-14 space-y-2">
        <p class="font-display text-xs font-black uppercase tracking-[0.3em] text-gold-500/70">Your Collection</p>
        <h1 class="font-display text-5xl font-black tracking-tight text-primary">
          Saved <span class="text-gradient">Wishlist</span>
        </h1>
        <p class="text-lg font-medium text-secondary">Digital assets you've bookmarked for later.</p>
      </header>

      <!-- Loading state -->
      <div v-if="isLoading" class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 3" :key="i" class="glass-panel animate-pulse rounded-[2.5rem] border border-primary/5 p-6">
          <div class="mb-6 h-48 rounded-2xl bg-primary/5"></div>
          <div class="h-6 w-3/4 rounded-xl bg-primary/5 mb-3"></div>
          <div class="h-4 w-1/2 rounded-xl bg-primary/5"></div>
        </div>
      </div>

      <!-- Error state -->
      <div v-else-if="error" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400">
          <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126z"/>
          </svg>
        </div>
        <p class="font-display text-2xl font-bold text-secondary">{{ error }}</p>
      </div>

      <!-- Empty state -->
      <div v-else-if="likedWebsites.length === 0" class="flex flex-col items-center justify-center py-32 text-center">
        <div class="mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/5 text-primary/20">
          <svg class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
          </svg>
        </div>
        <p class="font-display text-3xl font-black tracking-tight text-secondary">No saved items yet</p>
        <p class="mt-3 text-secondary/40">Browse our catalog and save the websites you love.</p>
        <RouterLink to="/home" class="mt-10 rounded-full bg-primary px-10 py-4 font-display text-sm font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95">
          Browse Catalog
        </RouterLink>
      </div>

      <!-- Liked Websites Grid -->
      <div v-else class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <article
          v-for="site in likedWebsites"
          :key="site.id"
          class="group glass-panel relative overflow-hidden rounded-[2.5rem] border border-primary/5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/10 hover:shadow-2xl hover:shadow-gold-500/5"
        >
          <!-- Image -->
          <div class="relative h-52 overflow-hidden">
            <img
              v-if="site.image_url"
              :src="site.image_url"
              :alt="site.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div v-else class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-500/10 to-mint-500/10"></div>

            <!-- Unlike button -->
            <button
              @click="unlike(site.id)"
              class="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-2xl bg-canvas/40 text-red-400 backdrop-blur-sm transition-all hover:bg-red-500 hover:text-canvas active:scale-95"
              title="Remove from wishlist"
            >
              <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>
              </svg>
            </button>

            <!-- Featured Badge -->
            <div v-if="site.featured" class="absolute left-4 top-4 flex items-center gap-1.5 rounded-xl bg-gold-500/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-canvas backdrop-blur-sm">
              <svg class="h-3 w-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              Featured
            </div>
          </div>

          <!-- Content -->
          <div class="p-6 space-y-4">
            <div>
              <p class="text-[10px] font-black uppercase tracking-widest text-mint-500/70">{{ site.category }}</p>
              <h2 class="mt-1 font-display text-xl font-extrabold tracking-tight text-primary group-hover:text-gold-400 transition-colors">{{ site.title }}</h2>
              <p class="mt-1.5 text-sm text-secondary line-clamp-2">{{ site.description }}</p>
            </div>

            <!-- Tech Stack -->
            <div v-if="site.tech_stack?.length" class="flex flex-wrap gap-2">
              <span
                v-for="tech in site.tech_stack.slice(0, 3)"
                :key="tech"
                class="rounded-lg bg-primary/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-secondary"
              >{{ tech }}</span>
            </div>

            <!-- Price + CTA -->
            <div class="flex items-center justify-between pt-2 border-t border-primary/5">
              <div>
                <p class="text-[10px] font-black uppercase tracking-widest text-secondary/30">Price</p>
                <p class="font-display text-2xl font-black text-primary">{{ formatCurrency(Number(site.price), site.currency) }}</p>
              </div>
              <button
                @click="addToCart(site)"
                class="flex items-center gap-2 rounded-2xl bg-primary px-5 py-3 font-display text-xs font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95"
              >
                <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
                Cart
              </button>
            </div>
          </div>
        </article>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>
