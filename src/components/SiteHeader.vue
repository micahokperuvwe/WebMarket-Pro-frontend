<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAppStore } from '../stores/app'
import { useAuthStore } from '../stores/auth'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const authStore = useAuthStore()
const cartStore = useCartStore()

const navigation = computed(() => [
  { label: 'Explore', to: '/home' },
  { label: 'Wishlist', to: '/likes' },
  { label: 'Orders', to: '/orders' },
  { label: 'Contact', to: '/contact' },
  ...(authStore.isAdmin ? [{ label: 'Admin', to: '/admin' }] : []),
])

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="sticky top-0 z-50 px-6 py-6 transition-all duration-300">
    <div class="mx-auto flex max-w-7xl items-center justify-between rounded-[2.5rem] border border-white/5 bg-white/[0.03] px-10 py-4 shadow-2xl backdrop-blur-2xl transition-all duration-500 hover:bg-white/[0.05] hover:shadow-gold-500/5">
      <!-- Logo Section -->
      <RouterLink to="/" class="group flex items-center gap-4 transition-transform duration-300 hover:scale-105 active:scale-95">
        <div class="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-premium shadow-xl shadow-gold-500/20">
           <span class="relative z-10 font-display text-xl font-black tracking-tighter text-black">W</span>
           <div class="absolute inset-0 bg-white/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
        </div>
        <div class="hidden sm:block">
          <p class="font-display text-[11px] font-black uppercase tracking-[0.25em] text-gold-500/80">Marketplace</p>
          <p class="font-display text-xl font-extrabold tracking-tight text-white">WebMarket <span class="text-gradient">Pro</span></p>
        </div>
      </RouterLink>

      <!-- Central Navigation -->
      <nav class="hidden items-center gap-2 md:flex">
        <RouterLink
          v-for="item in navigation"
          :key="item.to"
          :to="item.to"
          class="group relative px-5 py-2.5 text-sm font-bold tracking-wide transition-all duration-300"
          :class="route.path === item.to ? 'text-white' : 'text-white/40 hover:text-white/80'"
        >
          {{ item.label }}
          <!-- Underline Indicator -->
          <div 
            class="absolute bottom-0 left-5 right-5 h-0.5 scale-x-0 rounded-full bg-gradient-to-r from-gold-400 to-mint-400 transition-transform duration-300 group-hover:scale-x-100"
            :class="{ 'scale-x-100 brightness-110 shadow-[0_0_8px_rgba(239,185,53,0.5)]': route.path === item.to }"
          ></div>
        </RouterLink>
      </nav>

      <!-- Action Buttons -->
      <div class="flex items-center gap-4">
        <!-- Theme Switcher -->
        <button
          @click="appStore.toggleTheme"
          class="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-white/10 active:scale-90"
          title="Switch Mood"
        >
          <div class="transition-transform duration-500 group-hover:rotate-12">
            <svg v-if="appStore.isDark" xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gold-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
            <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-ink-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          </div>
        </button>

        <!-- Dynamic Cart -->
        <RouterLink 
          to="/cart" 
          class="group relative flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-white/10 active:scale-90"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 transition-transform duration-300 group-hover:-rotate-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <span 
            v-if="cartStore.items.length" 
            class="absolute -right-2 -top-2 flex h-6 w-6 scale-110 items-center justify-center rounded-full bg-gold-500 font-display text-[11px] font-black text-black shadow-lg shadow-gold-500/30 ring-4 ring-primary transition-transform group-hover:scale-125"
          >
            {{ cartStore.items.length }}
          </span>
        </RouterLink>

        <!-- User/Auth -->
        <div v-if="authStore.currentUser" class="flex items-center gap-2">
          <RouterLink
            to="/settings"
            class="flex items-center gap-3 rounded-2.5xl bg-white px-5 py-3 text-sm font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 transition-all duration-300 hover:bg-gold-500 active:scale-95"
          >
            <div class="h-6 w-6 overflow-hidden rounded-lg bg-gradient-to-br from-black/20 to-transparent p-0.5">
               <div class="h-full w-full rounded-md bg-gradient-premium"></div>
            </div>
            <span class="hidden sm:inline">{{ authStore.currentUser.name?.split(' ')[0] || 'Member' }}</span>
          </RouterLink>

          <!-- Logout Button -->
          <button 
            @click="handleLogout"
            class="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400 active:scale-90"
            title="Sign Out"
          >
            <svg class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
          </button>
        </div>
        
        <RouterLink 
          v-else 
          to="/auth" 
          class="rounded-full bg-white px-7 py-3 font-display text-sm font-black uppercase tracking-widest text-black shadow-xl shadow-white/5 transition-all duration-300 hover:bg-gold-500 active:scale-95"
        >
          Join Now
        </RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
/* Keeping it lean, mostly using design tokens */
</style>

<style scoped>
@reference "../style.css";

.router-link-active:not(.no-active-indicator) {
  @apply text-white;
}
</style>
