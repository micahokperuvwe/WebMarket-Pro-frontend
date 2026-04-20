<script setup lang="ts">
import SiteHeader from './SiteHeader.vue'
import SiteFooter from './SiteFooter.vue'
import CartSidebar from './CartSidebar.vue'
</script>

<template>
  <div class="relative min-h-screen overflow-hidden">
    <div class="grain-overlay absolute inset-0"></div>
    <div class="relative z-10">
      <SiteHeader />
      <main class="mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <slot />
      </main>
      <SiteFooter />
    </div>
    <CartSidebar />
  </div>
</template>
