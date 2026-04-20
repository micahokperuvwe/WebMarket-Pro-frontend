<script setup lang="ts">
defineProps<{
  label: string
  value: string
  detail: string
}>()
</script>

<template>
  <article class="glass-panel group relative overflow-hidden rounded-[2.5rem] border border-primary/5 bg-primary/5 p-8 transition-all duration-500 hover:bg-primary/10 hover:shadow-2xl hover:shadow-gold-500/5">
    <!-- Background Glow -->
    <div class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gold-500/5 blur-2xl transition-all duration-500 group-hover:bg-gold-500/10"></div>
    
    <div class="relative z-10 space-y-4">
      <p class="font-display text-[11px] font-black uppercase tracking-[0.25em] text-secondary/50">{{ label }}</p>
      <p class="font-display text-5xl font-black tracking-tight text-primary selection:bg-gold-500/30">
        {{ value }}
      </p>
      <div class="flex items-center gap-2">
         <span class="inline-flex h-1.5 w-1.5 rounded-full bg-mint-500 animate-pulse"></span>
         <p class="text-sm font-bold text-secondary">{{ detail }}</p>
      </div>
    </div>
  </article>
</template>
