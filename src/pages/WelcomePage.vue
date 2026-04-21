<script setup lang="ts">
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const authStore = useAuthStore()
</script>

<template>
  <AppShell>
    <!-- Page Header -->
    <header class="section-padding bg-primary/[0.01] border-b border-primary/5 text-center">
      <div class="container-wide space-y-6">
        <div class="inline-flex items-center gap-2 rounded-full border border-gold-400/20 bg-gold-400/5 px-4 py-1 text-[10px] font-black uppercase tracking-widest text-gold-400">
           The Apex Ecosystem
        </div>
        <h1 class="font-display text-5xl font-black tracking-tight sm:text-7xl text-primary">
          How to <span class="text-gradient">Acquire</span> Assets
        </h1>
        <p class="text-lg font-medium text-secondary leading-relaxed mx-auto max-w-2xl">
          We've distilled digital commerce into a three-step elite protocol. Secure, transparent, and built for professional scale.
        </p>
      </div>
    </header>

    <!-- Process Steps -->
    <section class="section-padding">
      <div class="container-wide">
        <div class="grid gap-12 lg:grid-cols-3">
          <div v-for="(step, i) in [
            { t: 'Curated Discovery', d: 'Browse our hand-picked selection of high-performance SaaS, Ecommerce, and Portfolio assets.', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
            { t: 'Secure Protocol', d: 'Initialize payment via Paystack. Your funds are protected as we coordinate the asset verification.', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { t: 'Instant Transition', d: 'Receive source code and domain keys immediately after automated verification. Ready to launch.', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
          ]" :key="i" class="surface-premium relative rounded-[3rem] p-10 pt-16">
            <div class="absolute -top-6 left-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-premium shadow-xl shadow-gold-500/20">
               <svg class="h-8 w-8 text-canvas" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path :d="step.icon"/></svg>
            </div>
            <div class="space-y-4">
              <span class="font-display text-xs font-black text-gold-500/50 uppercase tracking-[0.2em]">Step 0{{ i + 1 }}</span>
              <h3 class="font-display text-2xl font-black text-primary">{{ step.t }}</h3>
              <p class="text-sm font-medium leading-relaxed text-secondary opacity-80">{{ step.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Trust Architecture Banner -->
    <section class="section-padding bg-surface/30">
      <div class="container-wide">
        <div class="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div class="space-y-8">
            <header class="space-y-4">
              <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-mint-500">Security Layers</p>
              <h2 class="font-display text-4xl font-black tracking-tight text-primary">A Transparent <span class="text-gradient">Infrastructure.</span></h2>
            </header>
            <div class="space-y-6">
              <div v-for="point in ['Manual Codebase Audits', 'Verified Revenue Metrics', 'Zero-Downtime Handover']" :key="point" class="flex items-center gap-4 text-sm font-bold text-secondary">
                 <div class="flex h-6 w-6 items-center justify-center rounded-full bg-mint-500/10 text-mint-400"><svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M5 13l4 4L19 7"/></svg></div>
                 {{ point }}
              </div>
            </div>
          </div>
          <div class="surface-premium rounded-[3.5rem] border-gold-500/10 p-12 text-center">
             <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-gold-500/5 text-gold-500">
                <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
             </div>
             <p class="font-display text-2xl font-black text-primary">Locked Protocol</p>
             <p class="mt-4 text-sm font-medium text-secondary leading-relaxed">Payments are processed through 256-bit encrypted channels directly via Paystack gateway.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Final Onboarding CTA -->
    <section class="section-padding text-center">
      <div class="container-wide space-y-12">
        <div class="space-y-4">
          <h2 class="font-display text-5xl font-black text-primary">Join the Elite Marketplace</h2>
          <p class="text-lg font-medium text-secondary">Ready to discover your next high-performance asset?</p>
        </div>
        <div class="flex flex-wrap justify-center gap-4">
          <RouterLink to="/home" class="rounded-2xl bg-primary px-10 py-4 text-sm font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95 shadow-xl shadow-primary/10">Browse Items</RouterLink>
          <RouterLink v-if="!authStore.isLoggedIn" to="/auth" class="rounded-2xl border border-primary/10 px-10 py-4 text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/5 active:scale-95">Create Account</RouterLink>
        </div>
      </div>
    </section>
  </AppShell>
</template>
