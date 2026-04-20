<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import ProductCard from '../components/ProductCard.vue'
import { useMarketplaceStore } from '../stores/marketplace'

const marketplaceStore = useMarketplaceStore()
</script>

<template>
  <AppShell>
    <!-- Hero Section -->
    <section class="relative grid min-h-[80vh] gap-12 py-20 lg:grid-cols-2 lg:items-center">
      <!-- Background Ambient Glow -->
      <div class="pointer-events-none absolute -right-[20%] -top-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-gold-500/10 blur-[150px]"></div>
      
      <div class="space-y-10 animate-fade-in">
        <div class="inline-flex items-center gap-3 rounded-full border border-primary/5 bg-primary/5 px-5 py-2.5 backdrop-blur-xl">
          <span class="flex h-2 w-2 rounded-full bg-gold-500"></span>
          <span class="font-display text-xs font-black uppercase tracking-[0.25em] text-white/50">
            Next-Gen Digital Commerce
          </span>
        </div>
        
        <h1 class="font-display text-6xl font-black leading-[1.05] tracking-tight text-primary sm:text-7xl lg:text-8xl">
          The <span class="text-gradient">Elite Standard</span> for Site Trading.
        </h1>
        
        <p class="max-w-xl text-xl font-medium leading-relaxed text-secondary">
          Launch a high-performance marketplace for premium websites. Integrated with Paystack, Cloudinary, and Supabase for a seamless, secure, and professional experience.
        </p>
        
        <div class="flex flex-wrap items-center gap-6">
          <RouterLink to="/home" class="group relative overflow-hidden rounded-2.5xl bg-primary px-10 py-5 font-display text-lg font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 hover:scale-105 active:scale-95">
            <span class="relative z-10">Start Exploring</span>
            <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-canvas/30 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
          </RouterLink>
          
          <RouterLink to="/admin" class="group flex items-center gap-3 font-display text-sm font-black uppercase tracking-widest text-secondary transition-colors hover:text-gold-400">
             <span>Admin Demo</span>
             <svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
          </RouterLink>
        </div>

        <!-- Tech Stack Badges -->
        <div class="flex flex-wrap items-center gap-8 pt-8 opacity-40 grayscale transition-all hover:opacity-100 hover:grayscale-0">
           <img src="https://raw.githubusercontent.com/supabase/supabase/master/packages/common/assets/images/supabase-logo.svg" alt="Supabase" class="h-6">
           <img src="https://cloudinary-res.cloudinary.com/image/upload/v1589182370/cloudinary_logo_text_dark.svg" alt="Cloudinary" class="h-6">
           <span class="font-display text-xl font-black text-primary">Paystack</span>
        </div>
      </div>

      <!-- Feature Card Showcase -->
      <div class="relative group animate-fade-in" style="animation-delay: 0.2s">
        <div class="absolute -inset-1 rounded-[3rem] bg-gradient-premium opacity-20 blur-2xl transition duration-1000 group-hover:opacity-40 group-hover:duration-200"></div>
        <div class="relative glass-panel overflow-hidden rounded-[3rem] border-primary/5 bg-primary/5 p-10 lg:p-14">
           <div class="grid grid-cols-2 gap-6 md:gap-10">
                  <p class="font-display text-6xl font-black text-primary">99%</p>
                  <p class="text-sm font-bold text-secondary leading-snug">Elite delivery automation system for all assets.</p>
               </div>
               <div class="space-y-4 rounded-[2rem] border border-primary/5 p-8 transition-all hover:bg-primary/5">
                  <p class="font-display text-xs font-black uppercase tracking-[0.2em] text-mint-500/60">Fast Access</p>
                  <p class="font-display text-6xl font-black text-primary">~3s</p>
                  <p class="text-sm font-bold text-secondary leading-snug">Instant secure handoff after payment verification.</p>
               </div>
           </div>
           
           <div class="mt-8 space-y-4 rounded-[2rem] border border-primary/5 p-8 transition-all hover:bg-primary/5 lg:mt-10">
              <p class="font-display text-xs font-black uppercase tracking-[0.2em] text-secondary text-center">Infrastructure Highlights</p>
              <div class="grid grid-cols-2 gap-4">
                 <div class="flex items-center gap-3 rounded-xl bg-primary/5 p-4 text-xs font-bold text-secondary">
                    <svg class="h-5 w-5 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Role-Based Access
                 </div>
                 <div class="flex items-center gap-3 rounded-xl bg-primary/5 p-4 text-xs font-bold text-secondary">
                    <svg class="h-5 w-5 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Real-time Analytics
                 </div>
                 <div class="flex items-center gap-3 rounded-xl bg-primary/5 p-4 text-xs font-bold text-secondary">
                    <svg class="h-5 w-5 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Secure Paystack Webhooks
                 </div>
                 <div class="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-xs font-bold text-white/60">
                    <svg class="h-5 w-5 text-mint-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg> Scalable Image API
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>

    <!-- Featured Listings -->
    <section class="space-y-12 py-32 border-t border-primary/5">
      <div class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="space-y-3">
          <p class="font-display text-xs font-black uppercase tracking-[0.3em] text-gold-500">Premium Selection</p>
          <h2 class="font-display text-5xl font-black tracking-tight text-primary">State-of-the-Art <span class="text-gradient">Listings</span></h2>
          <p class="text-lg font-medium text-secondary">Hand-curated digital assets built with modern technology.</p>
        </div>
        
        <RouterLink to="/home" class="group inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95">
          Explore All
          <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
        </RouterLink>
      </div>

      <div class="grid gap-8 lg:grid-cols-2">
        <ProductCard
          v-for="listing in marketplaceStore.featuredListings"
          :key="listing.id"
          :listing="listing"
        />
      </div>
    </section>
  </AppShell>
</template>
