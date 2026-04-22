<script setup lang="ts">
import AppShell from '../components/AppShell.vue'
import ProductCard from '../components/ProductCard.vue'
import { useMarketplaceStore } from '../stores/marketplace'

const marketplaceStore = useMarketplaceStore()
</script>

<template>
  <AppShell>
    <!-- 1. Elite Hero Section -->
    <section class="relative flex min-h-[90vh] items-center overflow-hidden pt-20">
      <!-- Background Ambient Glows -->
      <div class="pointer-events-none absolute -right-[10%] -top-[10%] -z-10 h-[600px] w-[600px] rounded-full bg-gold-500/10 blur-[150px]"></div>
      <div class="pointer-events-none absolute -left-[10%] bottom-[10%] -z-10 h-[400px] w-[400px] rounded-full bg-mint-500/5 blur-[120px]"></div>
      
      <div class="container-wide grid gap-16 lg:grid-cols-2 lg:items-center">
        <div class="space-y-10 animate-fade-in">
          <div class="inline-flex items-center gap-3 rounded-full border border-primary/5 bg-primary/5 px-6 py-2.5 backdrop-blur-xl">
            <span class="flex h-2 w-2 rounded-full bg-gold-500 animate-pulse"></span>
            <span class="font-display text-[10px] font-black uppercase tracking-[0.3em] text-gold-500/80">
              The Digital Asset Authority
            </span>
          </div>
          
          <h1 class="font-display text-6xl font-black leading-[1.1] tracking-tight text-primary sm:text-7xl lg:text-8xl">
            Acquire <span class="text-gradient">Elite</span> Web Projects.
          </h1>
          
          <p class="max-w-xl text-xl font-medium leading-relaxed text-secondary italic">
            "The industry standard for high-performance marketplace infrastructure. Integrated with Paystack & Supabase for professional scale."
          </p>
          
          <div class="flex flex-wrap items-center gap-6">
            <RouterLink to="/home" class="group relative overflow-hidden rounded-2.5xl bg-primary px-12 py-5 font-display text-lg font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 hover:scale-105 active:scale-95 shadow-2xl shadow-primary/20">
              <span class="relative z-10">Explore Catalog</span>
              <div class="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-canvas/30 to-transparent transition-transform duration-500 group-hover:translate-x-full"></div>
            </RouterLink>
            
            <RouterLink to="/admin" class="group flex items-center gap-4 font-display text-sm font-black uppercase tracking-widest text-secondary transition-colors hover:text-gold-400">
               <span class="border-b-2 border-transparent transition-all group-hover:border-gold-500/50">Admin Interface</span>
               <div class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/5 transition-transform group-hover:translate-x-2">
                 <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
               </div>
            </RouterLink>
          </div>
        </div>

        <!-- Hero Visual Element -->
        <div class="relative group hidden lg:block animate-fade-in" style="animation-delay: 0.3s">
          <div class="absolute -inset-4 rounded-[4rem] bg-gradient-premium opacity-10 blur-3xl transition duration-1000 group-hover:opacity-20"></div>
          <div class="relative surface-premium overflow-hidden rounded-[3.5rem] p-1 shadow-2xl">
             <div class="rounded-[3.3rem] overflow-hidden bg-canvas">
                <div class="p-12 space-y-8">
                   <div class="flex items-center justify-between">
                      <div class="h-3 w-24 rounded-full bg-primary/10"></div>
                      <div class="flex gap-2">
                         <div class="h-2 w-2 rounded-full bg-red-500/40"></div>
                         <div class="h-2 w-2 rounded-full bg-gold-500/40"></div>
                         <div class="h-2 w-2 rounded-full bg-mint-500/40"></div>
                      </div>
                   </div>
                   <div class="space-y-4">
                      <div class="h-8 w-full rounded-2xl bg-gradient-to-r from-primary/5 to-transparent"></div>
                      <div class="h-32 w-full rounded-3xl bg-primary/5 border border-primary/5"></div>
                      <div class="grid grid-cols-3 gap-4">
                         <div class="h-20 rounded-2xl bg-gold-500/5 animate-pulse"></div>
                         <div class="h-20 rounded-2xl bg-mint-500/5"></div>
                         <div class="h-20 rounded-2xl bg-primary/5"></div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Trust Bar -->
    <section class="border-y border-primary/5 bg-primary/[0.01] py-12">
      <div class="container-wide">
        <div class="flex flex-wrap items-center justify-center gap-12 opacity-40 transition-opacity hover:opacity-100 md:justify-between lg:gap-24">
           <span class="font-display text-2xl font-black tracking-tight text-primary">SUPABASE</span>
           <span class="font-display text-2xl font-black tracking-tight text-primary">PAYSTACK</span>
           <span class="font-display text-2xl font-black tracking-tight text-primary">CLOUDINARY</span>
           <span class="font-display text-2xl font-extrabold tracking-tight text-secondary">VITE <span class="text-primary">+ VUE</span></span>
           <span class="font-display text-xl font-black uppercase tracking-widest text-primary">POSTGRESQL</span>
        </div>
      </div>
    </section>

    <!-- 3. Categorical Grid -->
    <section class="section-padding bg-surface/30">
      <div class="container-wide">
        <header class="mb-20 text-center space-y-4">
          <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Asset Classes</p>
          <h2 class="font-display text-5xl font-black tracking-tight text-primary">Specialized <span class="text-gradient">Categories</span></h2>
        </header>

        <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="(cat, i) in ['SaaS Solutions', 'Ecommerce', 'Premium Portfolios', 'API Services']" :key="cat" 
               class="surface-premium group rounded-[2.5rem] p-10 transition-all hover:-translate-y-2 hover:border-gold-500/30">
            <div class="mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/5 text-gold-500 transition-colors group-hover:bg-gold-500 group-hover:text-canvas">
               <svg v-if="i === 0" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
               <svg v-else-if="i === 1" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
               <svg v-else-if="i === 2" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>
               <svg v-else class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <h3 class="mb-3 font-display text-xl font-bold text-primary">{{ cat }}</h3>
            <p class="text-sm font-medium leading-relaxed text-secondary">Verified, high-performance digital assets optimized for immediate deployment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Featured Listings -->
    <section class="section-padding">
      <div class="container-wide">
        <header class="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div class="space-y-4">
            <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Curated Flow</p>
            <h2 class="font-display text-5xl font-black tracking-tight text-primary">State-of-the-Art <span class="text-gradient">Openings</span></h2>
          </div>
          <RouterLink to="/home" class="group flex items-center gap-3 rounded-full border border-primary/10 px-8 py-3.5 text-xs font-black uppercase tracking-widest text-primary transition-all hover:bg-gold-500 hover:text-canvas">
            View Marketplace
            <svg class="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </RouterLink>
        </header>

        <div class="grid gap-10 lg:grid-cols-2">
          <ProductCard
            v-for="listing in marketplaceStore.featuredListings"
            :key="listing.id"
            :listing="listing"
          />
        </div>
      </div>
    </section>

    <!-- 5. Why Apex Standard (Advantage Section) -->
    <section class="section-padding bg-primary/[0.01]">
      <div class="container-wide">
        <div class="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div class="space-y-12">
            <header class="space-y-4">
              <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Reliability</p>
              <h2 class="font-display text-5xl font-black tracking-tight text-primary">The Apex <span class="text-gradient">Protocol</span></h2>
              <p class="text-lg font-medium leading-relaxed text-secondary max-w-lg">
                We've engineered a trading environment that prioritizes speed, security, and elite asset original quality.
              </p>
            </header>

            <div class="space-y-8">
              <div v-for="(feat, i) in ['Automated Payment Verification', 'Instant Source-Code Handover', 'Admin Monitored Ecosystem']" :key="i" class="flex gap-6">
                <div class="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-mint-500/10 text-mint-400">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg>
                </div>
                <div>
                  <h4 class="mb-1 font-display text-lg font-bold text-primary">{{ feat }}</h4>
                  <p class="text-sm text-secondary opacity-70">Secured via Supabase edge-functions and Paystack webhooks.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative grid grid-cols-2 gap-6">
            <div class="space-y-6 pt-12">
              <div class="surface-premium rounded-[2.5rem] p-8 text-center">
                 <p class="font-display text-4xl font-black text-primary">100%</p>
                 <p class="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">Success Rate</p>
              </div>
              <div class="surface-premium rounded-[2.5rem] p-8 text-center">
                 <p class="font-display text-4xl font-black text-primary">2.4s</p>
                 <p class="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">Avg Handover</p>
              </div>
            </div>
            <div class="space-y-6">
              <div class="surface-premium rounded-[2.5rem] p-8 text-center bg-gradient-premium border-none shadow-gold-500/20">
                 <p class="font-display text-4xl font-black text-canvas">24/7</p>
                 <p class="text-[10px] font-black uppercase tracking-widest text-canvas/60 mt-2">Elite Support</p>
              </div>
              <div class="surface-premium rounded-[2.5rem] p-8 text-center">
                 <p class="font-display text-4xl font-black text-primary">Elite</p>
                 <p class="text-[10px] font-black uppercase tracking-widest text-secondary mt-2">Market Tech</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Final Call to Action -->
    <section class="section-padding overflow-hidden">
      <div class="container-wide">
        <div class="relative surface-premium rounded-[4rem] p-12 py-20 text-center lg:p-24 overflow-hidden">
           <!-- Visual Pulse -->
           <div class="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gold-500/5 blur-3xl"></div>
           <div class="absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-mint-500/5 blur-3xl"></div>

           <div class="relative z-10 mx-auto max-w-3xl space-y-10">
              <h2 class="font-display text-5xl font-black leading-tight tracking-tight text-primary lg:text-7xl">
                Ready to Join the <span class="text-gradient">Elite?</span>
              </h2>
              <p class="text-lg font-medium leading-relaxed text-secondary">
                Connect with the industry standard. Acquire premium assets or launch your storefront in minutes.
              </p>
              <div class="flex flex-wrap justify-center gap-6">
                 <RouterLink to="/auth" class="rounded-2.5xl bg-primary px-12 py-5 font-display text-base font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 hover:scale-105 shadow-2xl shadow-primary/20">
                    Get Started Now
                 </RouterLink>
                 <RouterLink to="/contact" class="flex items-center gap-3 rounded-2.5xl border border-primary/10 px-10 py-5 text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/5">
                    Contact Sales
                 </RouterLink>
              </div>
           </div>
        </div>
      </div>
    </section>
  </AppShell>
</template>
