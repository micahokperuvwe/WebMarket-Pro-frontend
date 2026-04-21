<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const isSidebarOpen = ref(false)

const adminNavigation = [
  { label: 'Dashboard', to: '/admin', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { label: 'Websites', to: '/admin/websites', icon: 'M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9' },
  { label: 'Orders', to: '/admin/orders', icon: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' },
  { label: 'Notifications', to: '/admin/notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
]

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-screen bg-canvas text-primary selection:bg-gold-500/30">
    <!-- Sidebar -->
    <aside 
      class="fixed inset-y-0 left-0 z-50 w-72 transform border-r border-primary/10 font-body glass-panel transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:static lg:translate-x-0"
      :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'"
    >
      <div class="flex h-full flex-col p-8">
        <!-- Logo Section -->
        <RouterLink to="/" class="group mb-12 flex items-center gap-4">
          <div class="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-gradient-premium shadow-2xl shadow-gold-500/30 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
             <span class="relative z-10 text-xl font-black tracking-tighter text-canvas">W</span>
             <div class="absolute inset-0 bg-primary/20 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </div>
          <div>
            <p class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-gold-500/80">Control Center</p>
            <p class="font-display text-xl font-extrabold tracking-tight text-primary">Apex<span class="text-gradient">Retail</span></p>
          </div>
        </RouterLink>

        <!-- Navigation Menu -->
        <nav class="flex-1 space-y-2">
          <RouterLink
            v-for="item in adminNavigation"
            :key="item.to"
            :to="item.to"
            class="group relative flex items-center gap-4 rounded-2xl px-5 py-4 text-sm font-semibold transition-all duration-300"
            :class="route.path === item.to 
              ? 'bg-primary/10 text-primary shadow-[0_0_20px_rgba(var(--text-primary),0.05)]' 
              : 'text-secondary hover:bg-primary/5 hover:text-primary'"
          >
            <!-- Active Indicator Bar -->
            <div 
              v-if="route.path === item.to" 
              class="absolute left-0 h-8 w-1 rounded-r-full bg-gold-500 shadow-[0_0_15px_rgba(239,185,53,0.8)]"
            ></div>

            <svg 
              class="h-6 w-6 transition-all duration-300 group-hover:scale-110" 
              :class="route.path === item.to ? 'text-gold-400' : 'text-current'"
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"
            >
              <path stroke-linecap="round" stroke-linejoin="round" :d="item.icon" />
            </svg>
            <span class="tracking-wide">{{ item.label }}</span>
            
            <!-- Hover Arrow -->
            <svg 
              v-if="route.path !== item.to"
              class="ml-auto h-4 w-4 opacity-0 transition-all duration-300 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0" 
              fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </RouterLink>
        </nav>

        <!-- Sidebar Footer -->
        <div class="mt-auto space-y-4 border-t border-primary/5 pt-8">
          <button 
            @click="handleLogout"
            class="group flex w-full items-center gap-3 rounded-2xl px-5 py-4 text-sm font-bold text-red-400/60 transition-all duration-300 hover:bg-red-500/10 hover:text-red-400"
          >
            <svg class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            Sign Out
          </button>
        </div>
      </div>
    </aside>

    <!-- Overlay for mobile sidebar -->
    <div 
      v-if="isSidebarOpen" 
      @click="isSidebarOpen = false"
      class="fixed inset-0 z-40 bg-canvas/60 backdrop-blur-md lg:hidden"
    ></div>

    <!-- Main Content Area -->
    <div class="flex flex-1 flex-col overflow-hidden">
      <!-- Mobile Header -->
      <header class="flex h-20 items-center justify-between border-b border-primary/5 bg-canvas/80 px-8 backdrop-blur-xl lg:hidden">
        <button @click="isSidebarOpen = true" class="rounded-xl bg-primary/5 p-2 text-secondary hover:text-primary">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
        </button>
        <p class="font-display text-lg font-bold tracking-tight">Admin <span class="text-gradient">Panel</span></p>
        <div class="h-10 w-10 overflow-hidden rounded-xl border border-primary/10 p-0.5">
           <div class="h-full w-full rounded-[inherit] bg-gradient-premium"></div>
        </div>
      </header>

      <!-- Page Content -->
      <main class="relative flex-1 overflow-y-auto overflow-x-hidden p-8 lg:p-14">
        <!-- Background Ambient Glow -->
        <div class="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[120px]"></div>
        
        <div class="mx-auto max-w-7xl animate-fade-in">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Scoped styles kept to minimum as mostly using global tokens */
</style>
