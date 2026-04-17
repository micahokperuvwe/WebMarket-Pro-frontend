<script setup lang="ts">
import { computed } from 'vue'
import type { DailySalesPoint } from '../types/marketplace'

const props = defineProps<{
  points: DailySalesPoint[]
}>()

const maxValue = computed(() => Math.max(...props.points.map((point) => point.sales), 1))
</script>

<template>
  <div class="glass-panel rounded-[28px] border p-6 text-white">
    <div class="mb-6 flex items-center justify-between">
      <div>
        <p class="text-xs uppercase tracking-[0.28em] text-white/50">Daily sales</p>
        <h3 class="font-display text-2xl font-semibold">Revenue pulse</h3>
      </div>
      <p class="text-sm text-white/60">Last 7 days</p>
    </div>
    <div class="flex h-64 items-end gap-4">
      <div v-for="point in points" :key="point.label" class="flex flex-1 flex-col items-center gap-3">
        <div class="flex h-56 w-full items-end rounded-3xl bg-white/5 p-2">
          <div
            class="w-full rounded-2xl bg-gradient-to-t from-gold-400 to-mint-400 transition-all"
            :style="{ height: `${(point.sales / maxValue) * 100}%` }"
          ></div>
        </div>
        <div class="text-center">
          <p class="text-sm font-medium">{{ point.label }}</p>
          <p class="text-xs text-white/60">${{ point.sales }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
