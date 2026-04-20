<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const authStore = useAuthStore()
</script>

<template>
  <AppShell>
    <main class="min-h-[80vh] flex flex-col items-center justify-center p-6 text-center">
      <!-- Background Decorations -->
      <div class="absolute top-0 right-0 -z-10 h-[500px] w-[500px] rounded-full bg-gold-400/10 blur-[120px]"></div>
      <div class="absolute bottom-0 left-0 -z-10 h-[500px] w-[500px] rounded-full bg-mint-400/10 blur-[120px]"></div>

      <header class="max-w-3xl space-y-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1 text-xs font-bold uppercase tracking-widest text-gold-400">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-gold-400"></span>
          </span>
          Next-Gen Marketplace
        </div>
        
        <h1 class="font-display text-5xl font-bold tracking-tight sm:text-7xl text-primary">
          Welcome to <span class="text-gradient">ApexRetail</span>
        </h1>
        
        <p class="text-lg text-secondary leading-relaxed mx-auto max-w-2xl">
          The ultimate platform for buying and selling high-performance websites. 
          Whether you're looking for a ready-to-launch SaaS or a stunning e-commerce store, 
          we've curated the best digital assets just for you.
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <RouterLink 
            to="/home" 
            class="group relative w-full sm:w-auto overflow-hidden rounded-full bg-primary px-10 py-4 text-sm font-bold text-canvas transition-all hover:scale-105 active:scale-95 shadow-xl"
          >
            <span class="relative z-10 flex items-center justify-center gap-2">
              Browse Marketplace
              <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </span>
            <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform group-hover:translate-x-0"></div>
          </RouterLink>
          
          <RouterLink 
            v-if="!authStore.isLoggedIn"
            to="/register" 
            class="w-full sm:w-auto rounded-full border border-primary/10 glass-panel px-10 py-4 text-sm font-bold transition-all hover:bg-primary/5 active:scale-95 text-primary"
          >
            Join as Seller
          </RouterLink>

          <RouterLink 
            v-else-if="authStore.isAdmin"
            to="/admin" 
            class="w-full sm:w-auto rounded-full border border-primary/10 glass-panel px-10 py-4 text-sm font-bold transition-all hover:bg-primary/5 active:scale-95 text-primary"
          >
            Admin Dashboard
          </RouterLink>
        </div>
      </header>

      <!-- Visual Features Section -->
      <section class="mt-24 grid grid-cols-1 gap-6 sm:grid-cols-3 w-full max-w-5xl">
          <div class="glass-panel group rounded-[2.5rem] border border-primary/10 p-8 transition-all hover:border-gold-400/30">
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-gold-400 transition-all group-hover:bg-gold-400 group-hover:text-canvas">
               <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>
            </div>
            <h3 class="mb-2 font-display text-xl font-bold text-primary">Instant Access</h3>
            <p class="text-sm text-secondary leading-relaxed">Download source code or access your new website immediately after purchase.</p>
          </div>
                  <div class="glass-panel group rounded-[2.5rem] border border-primary/10 p-8 transition-all hover:border-mint-400/30">
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-mint-400 transition-all group-hover:bg-mint-400 group-hover:text-canvas">
               <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
            </div>
            <h3 class="mb-2 font-display text-xl font-bold text-primary">Verified Code</h3>
            <p class="text-sm text-secondary leading-relaxed">Every listing is manually reviewed for quality and security security standards.</p>
          </div>

          <div class="glass-panel group rounded-[2.5rem] border border-primary/10 p-8 transition-all hover:border-primary/30">
            <div class="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-primary transition-all group-hover:bg-primary group-hover:text-canvas">
               <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            </div>
            <h3 class="mb-2 font-display text-xl font-bold text-primary">Safe Payments</h3>
            <p class="text-sm text-secondary leading-relaxed">Secure transactions powered by Paystack with instant receipt generation.</p>
          </div>
      </section>
    </main>
  </AppShell>
</template>
