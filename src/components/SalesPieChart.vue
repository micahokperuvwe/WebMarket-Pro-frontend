<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  data: { name: string, value: number }[]
}>()

const colors = ['#55d6be', '#f2b24a', '#f9738c', '#9fb3ff', '#a480cf']

const slices = computed(() => {
  const total = props.data.reduce((sum, item) => sum + item.value, 0)
  if (total === 0) return []

  return props.data.map((item, index) => ({
    label: item.name,
    count: item.value,
    percentage: Math.round((item.value / total) * 100),
    color: colors[index % colors.length]
  }))
})

const gradient = computed(() => {
  if (slices.value.length === 0) return 'rgba(var(--text-primary), 0.05)'
  
  let currentPos = 0
  const stops = slices.value.map((slice) => {
    const start = currentPos
    const end = currentPos + slice.percentage
    currentPos = end
    return `${slice.color} ${start}% ${end}%`
  })
  
  return `conic-gradient(${stops.join(', ')})`
})
</script>

<template>
  <div class="space-y-8">
    <div class="flex items-center justify-center p-4">
      <div 
        class="h-48 w-48 rounded-full shadow-2xl transition-transform duration-500 hover:scale-105" 
        :style="{ background: gradient }"
      >
         <div v-if="slices.length === 0" class="flex h-full w-full items-center justify-center rounded-full bg-primary/5 border border-primary/5">
            <span class="text-xs font-black uppercase tracking-widest text-secondary/20">No Data</span>
         </div>
      </div>
    </div>
    
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div v-for="slice in slices" :key="slice.label" class="flex items-center gap-3 rounded-2xl bg-primary/5 p-4 transition-all hover:bg-primary/10">
        <span class="h-3 w-3 rounded-full shadow-sm" :style="{ backgroundColor: slice.color }"></span>
        <div class="flex-1 overflow-hidden">
          <p class="truncate text-xs font-black uppercase tracking-widest text-primary">{{ slice.label }}</p>
          <p class="text-[10px] font-bold text-secondary">{{ slice.count }} Assets ({{ slice.percentage }}%)</p>
        </div>
      </div>
    </div>
  </div>
</template>
