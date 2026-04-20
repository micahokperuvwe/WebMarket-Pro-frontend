<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useAuthStore } from '../../stores/auth'
import { formatCurrency } from '../../utils/format'
import AdminShell from '../../components/AdminShell.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const websites = ref<any[]>([])
const pagination = ref({ page: 1, totalPages: 1, total: 0 })
const isLoading = ref(true)
const searchQuery = ref('')

async function fetchWebsites() {
  isLoading.value = true
  try {
    const res = await fetch(`${API_BASE}/websites?page=${pagination.value.page}&q=${searchQuery.value}`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const payload = await res.json()
    websites.value = payload.data || []
    pagination.value = payload.pagination || { page: 1, totalPages: 1, total: 0 }
  } catch (err) {
    console.error('Failed to fetch websites:', err)
  } finally {
    isLoading.value = false
  }
}

async function deleteWebsite(id: string) {
  if (!confirm('Are you sure you want to delete this website? This action cannot be undone.')) return
  
  try {
    const res = await fetch(`${API_BASE}/websites/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (res.ok) {
      fetchWebsites()
    }
  } catch (err) {
    console.error('Delete failed:', err)
  }
}

watch(searchQuery, () => {
  pagination.value.page = 1
  fetchWebsites()
})

onMounted(fetchWebsites)
</script>

<template>
  <AdminShell>
    <div class="space-y-10">
      <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="space-y-1">
          <h1 class="font-display text-5xl font-black tracking-tight text-primary">
            Inventory <span class="text-gradient">& Listings</span>
          </h1>
          <p class="text-lg font-medium text-secondary">Manage your premium digital assets and deployments.</p>
        </div>
        
        <RouterLink 
          to="/admin/websites/new" 
          class="flex items-center gap-2 rounded-2xl bg-primary px-8 py-4 font-display text-sm font-black uppercase tracking-widest text-canvas transition-all hover:bg-gold-500 active:scale-95 shadow-xl shadow-primary/5"
        >
          <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4"/></svg>
          Post Asset
        </RouterLink>
      </header>

      <!-- Elite Filter Bar -->
      <section class="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div class="relative flex-1">
          <svg class="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-primary/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search by title, category, or slug..." 
            class="w-full rounded-2.5xl border border-primary/5 bg-primary/5 py-5 pl-14 pr-6 text-sm font-medium text-primary outline-none transition-all focus:border-gold-500/30 focus:bg-primary/10 focus:ring-4 focus:ring-gold-500/5 placeholder:text-primary/20"
          />
        </div>
        
        <div class="flex items-center gap-4">
          <select class="h-[60px] rounded-2.5xl border border-primary/5 bg-primary/5 px-6 text-sm font-black uppercase tracking-widest text-secondary outline-none transition-all focus:border-gold-500/30">
            <option value="" class="bg-surface">All Categories</option>
            <option value="ecommerce" class="bg-surface">Ecommerce</option>
            <option value="saas" class="bg-surface">SaaS</option>
            <option value="portfolio" class="bg-surface">Portfolio</option>
          </select>
          
          <div class="flex h-[60px] items-center gap-2 rounded-2.5xl bg-primary/5 px-6 text-xs font-black uppercase tracking-[0.2em] text-secondary/30">
             Total: <span class="text-primary">{{ pagination.total }}</span>
          </div>
        </div>
      </section>

      <!-- Table Section -->
      <div class="glass-panel overflow-hidden rounded-[2.5rem] border-primary/5 bg-primary/[0.02]">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-primary/5 bg-primary/[0.02] text-[11px] font-black uppercase tracking-[0.25em] text-secondary">
                <th class="px-8 py-6">Digital Asset</th>
                <th class="px-8 py-6">Category</th>
                <th class="px-8 py-6">Pricing</th>
                <th class="px-8 py-6">Engagement</th>
                <th class="px-8 py-6">Status</th>
                <th class="px-8 py-6 text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary/5">
            <tbody class="divide-y divide-primary/5">
              <tr v-if="isLoading" v-for="i in 5" :key="i" class="animate-pulse">
                 <td colspan="6" class="px-8 py-10"><div class="h-6 w-full rounded-xl bg-primary/5"></div></td>
              </tr>
              
              <tr v-else-if="websites.length === 0">
                 <td colspan="6" class="px-8 py-32 text-center">
                    <div class="inline-flex h-20 w-20 items-center justify-center rounded-3xl bg-primary/5 text-primary/20 mb-6">
                       <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
                    </div>
                    <p class="font-display text-2xl font-bold tracking-tight text-secondary">No listings found</p>
                    <p class="mt-2 text-secondary/30 font-medium">Try broadening your search or post a new asset.</p>
                 </td>
              </tr>

              <tr 
                v-else 
                v-for="site in websites" 
                :key="site.id"
                class="group transition-all duration-300 hover:bg-primary/5"
              >
                <td class="px-8 py-6">
                  <div class="flex items-center gap-5">
                    <div class="h-14 w-14 flex-shrink-0 overflow-hidden rounded-2xl bg-primary/5 shadow-inner">
                      <img v-if="site.image_url" :src="site.image_url" :alt="site.title" class="h-full w-full object-cover transition-transform group-hover:scale-110" />
                      <div v-else class="flex h-full w-full items-center justify-center bg-gradient-premium opacity-10"></div>
                    </div>
                    <div>
                      <p class="font-display text-lg font-extrabold text-primary group-hover:text-gold-400 transition-colors">{{ site.title }}</p>
                      <p class="font-display text-[10px] font-black uppercase tracking-widest text-mint-500/60 transition-opacity group-hover:opacity-100">/{{ site.slug }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-8 py-6">
                  <span class="inline-flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-secondary">
                     <span class="h-1.5 w-1.5 rounded-full bg-mint-500"></span>
                     {{ site.category }}
                  </span>
                </td>
                <td class="px-8 py-6">
                   <div class="space-y-0.5">
                      <p class="font-display text-[10px] font-black uppercase tracking-widest text-secondary/30">Market Value</p>
                      <p class="font-display text-xl font-black text-primary selection:bg-gold-500/30">
                        {{ formatCurrency(Number(site.price), site.currency) }}
                      </p>
                   </div>
                </td>
                <td class="px-8 py-6">
                   <div class="flex items-center gap-3">
                      <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-mint-400">
                         <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                      </div>
                      <div>
                         <p class="text-sm font-bold text-primary">{{ site.sales || 0 }}</p>
                         <p class="text-[10px] font-black uppercase tracking-widest text-secondary/30">Acquisitions</p>
                      </div>
                   </div>
                </td>
                <td class="px-8 py-6">
                  <div v-if="site.featured" class="inline-flex items-center gap-2 rounded-xl bg-gold-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gold-400 shadow-sm shadow-gold-500/10">
                    <svg class="h-3 w-3 animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    Featured
                  </div>
                  <div v-else class="inline-flex items-center gap-2 rounded-xl bg-primary/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-secondary/30">
                    Standard
                  </div>
                </td>
                <td class="px-8 py-6 text-right">
                  <div class="flex items-center justify-end gap-3 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                    <button class="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/5 text-secondary transition-all hover:bg-primary/10 hover:text-primary" title="Edit Listing">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                    </button>
                    <button @click="deleteWebsite(site.id)" class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400 transition-all hover:bg-red-500 hover:text-canvas" title="Remove Listing">
                      <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Luxury Pagination -->
        <footer class="flex flex-col items-center justify-between gap-6 border-t border-primary/5 bg-primary/[0.01] px-8 py-6 md:flex-row">
          <p class="font-display text-[10px] font-black uppercase tracking-[0.2em] text-secondary/30">Showing {{ websites.length }} of {{ pagination.total }} Premium Assets</p>
          <div class="flex items-center gap-4">
            <button 
              @click="pagination.page--" 
              :disabled="pagination.page === 1"
              class="group flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/5 bg-primary/5 transition-all hover:bg-primary/10 disabled:opacity-20"
            >
              <svg class="h-5 w-5 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
            </button>
            <div class="flex h-12 min-w-[100px] items-center justify-center rounded-2xl bg-primary/5 px-6 font-display text-sm font-black text-primary">
               {{ pagination.page }} <span class="mx-2 text-secondary/30">/</span> {{ pagination.totalPages }}
            </div>
            <button 
               @click="pagination.page++" 
               :disabled="pagination.page === pagination.totalPages"
               class="group flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/5 bg-primary/5 transition-all hover:bg-primary/10 disabled:opacity-20"
            >
              <svg class="h-5 w-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </footer>
      </div>
    </div>
  </AdminShell>
</template>
