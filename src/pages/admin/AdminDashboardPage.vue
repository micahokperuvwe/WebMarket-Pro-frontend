<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AdminShell from '../../components/AdminShell.vue'
import DashboardStatCard from '../../components/DashboardStatCard.vue'
import SalesBarChart from '../../components/SalesBarChart.vue'
import SalesPieChart from '../../components/SalesPieChart.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const dashboardStats = ref({
  totalUsers: 0,
  totalWebsites: 0,
  totalOrders: 0,
  totalRevenue: 0,
  profit: 0
})

const salesData = ref([])
const categoryDistribution = ref([])
const recentActivity = ref([
  { id: 1, type: 'order', label: 'New purchase: Ecommerce Pro', time: '2 mins ago', amount: '$59' },
  { id: 2, type: 'user', label: 'New user registered: John Doe', time: '15 mins ago', amount: null },
  { id: 3, type: 'website', label: 'Website updated: SaaS Starter', time: '1 hour ago', amount: null },
])

const isLoading = ref(true)

async function fetchStats() {
  isLoading.value = true
  try {
    const [summaryRes, dashboardRes, salesRes, categoryRes] = await Promise.all([
      fetch(`${API_BASE}/admin/analytics/summary`, { headers: { Authorization: `Bearer ${authStore.token}` } }),
      fetch(`${API_BASE}/admin/dashboard`, { headers: { Authorization: `Bearer ${authStore.token}` } }),
      fetch(`${API_BASE}/admin/analytics/trends`, { headers: { Authorization: `Bearer ${authStore.token}` } }),
      fetch(`${API_BASE}/admin/analytics/category-distribution`, { headers: { Authorization: `Bearer ${authStore.token}` } }),
    ])

    const summary = await summaryRes.json()
    const dashboard = await dashboardRes.json()
    const sales = await salesRes.json()
    const category = await categoryRes.json()

    dashboardStats.value = {
      ...dashboard,
      totalRevenue: summary.totalRevenue || 0,
      profit: summary.profit || 0
    }
    
    // Map trends to SalesBarChart expectation (label, sales)
    salesData.value = (sales || []).map((s: any) => ({
      label: new Date(s.date).toLocaleDateString('en-US', { weekday: 'short' }),
      sales: s.revenue // Using revenue for the bar chart
    }))

    categoryDistribution.value = category || []
  } catch (err) {
    console.error('Failed to fetch dashboard data:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<template>
  <AdminShell>
    <div class="space-y-12">
      <header class="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div class="space-y-1">
          <h1 class="font-display text-5xl font-black tracking-tight text-white">
            Marketplace <span class="text-gradient">& Analytics</span>
          </h1>
          <p class="text-lg font-medium text-white/40">Real-time overview of your digital empire.</p>
        </div>
        
        <div class="flex items-center gap-4">
           <button @click="fetchStats" class="group flex h-14 w-14 items-center justify-center rounded-2xl border border-white/5 bg-white/5 transition-all hover:bg-white/10 active:scale-95">
              <svg :class="{ 'animate-spin': isLoading }" class="h-6 w-6 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
           </button>
           <button class="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-display text-sm font-black uppercase tracking-widest text-black transition-all hover:bg-gold-500 active:scale-95 shadow-xl shadow-white/5">
             <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
             Export Reports
           </button>
        </div>
      </header>

      <!-- Elite Stat Cards -->
      <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardStatCard
          label="Gross Merchandise Value"
          :value="`$${Number(dashboardStats.totalRevenue).toLocaleString()}`"
          detail="+12.5% Performance"
        />
        <DashboardStatCard
          label="Total Volume"
          :value="dashboardStats.totalOrders.toString()"
          detail="Active Transactions"
        />
        <DashboardStatCard
          label="Operational Profit"
          :value="`$${Number(dashboardStats.profit).toLocaleString()}`"
          detail="25% Service Yield"
        />
        <DashboardStatCard
          label="Active Community"
          :value="dashboardStats.totalUsers.toString()"
          detail="Verified Accounts"
        />
      </div>

      <!-- Advanced Charts -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2 glass-panel rounded-[3rem] border-white/5 bg-white/[0.02] p-8 lg:p-10">
           <div class="mb-8 flex items-center justify-between">
              <h3 class="font-display text-2xl font-black text-white">Revenue <span class="text-white/20">Timeline</span></h3>
              <div class="flex h-10 items-center gap-1 rounded-xl bg-white/5 p-1">
                 <button class="rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-sm bg-white/10">30 Days</button>
                 <button class="rounded-lg px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">90 Days</button>
              </div>
           </div>
           <SalesBarChart :points="salesData" />
        </div>
        <div class="glass-panel rounded-[3rem] border-white/5 bg-white/[0.02] p-8 lg:p-10">
           <h3 class="mb-8 font-display text-2xl font-black text-white">Market <span class="text-white/20">Share</span></h3>
           <SalesPieChart :data="categoryDistribution" />
        </div>
      </div>

      <!-- Activity & Insights -->
      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Live Activity -->
        <section class="glass-panel group overflow-hidden rounded-[3rem] border-white/5 bg-white/[0.02] p-8 lg:col-span-2 lg:p-10">
          <div class="mb-10 flex items-center justify-between">
            <div class="space-y-1">
               <h3 class="font-display text-2xl font-black text-white">Live <span class="text-white/20">Stream</span></h3>
               <p class="text-sm font-bold text-white/20 italic">Automated system activity log...</p>
            </div>
            <button class="font-display text-xs font-black uppercase tracking-widest text-gold-400 hover:brightness-125 transition-all">Full History</button>
          </div>
          
          <div class="space-y-4">
            <div
              v-for="item in recentActivity"
              :key="item.id"
              class="group relative flex items-center justify-between rounded-[2rem] border border-white/5 bg-white/0 p-6 transition-all duration-300 hover:border-gold-500/20 hover:bg-white/[0.03]"
            >
              <div class="flex items-center gap-6">
                <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 transition-transform duration-500 group-hover:scale-110 group-hover:bg-gradient-premium">
                   <svg v-if="item.type === 'order'" class="h-6 w-6 text-white transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
                   <svg v-else-if="item.type === 'user'" class="h-6 w-6 text-white transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"/></svg>
                   <svg v-else class="h-6 w-6 text-white transition-colors group-hover:text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
                </div>
                <div>
                  <p class="font-display text-lg font-extrabold text-white">{{ item.label }}</p>
                  <time class="font-display text-[10px] font-black uppercase tracking-widest text-white/30">{{ item.time }}</time>
                </div>
              </div>
              <p v-if="item.amount" class="font-display text-xl font-black text-mint-500 selection:bg-mint-500/20">{{ item.amount }}</p>
            </div>
          </div>
        </section>

        <!-- Dynamic Operations -->
        <section class="glass-panel space-y-8 rounded-[3rem] border-white/5 bg-white/[0.02] p-8 lg:p-10">
          <h3 class="font-display text-2xl font-black text-white">Elite <span class="text-white/20">Operations</span></h3>
          <div class="grid grid-cols-1 gap-4">
            <RouterLink to="/admin/websites/new" class="group flex items-center justify-between rounded-[2rem] bg-gradient-premium p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-gold-500/20">
              <div class="flex items-center gap-4">
                 <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-black/10 text-black">
                   <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M12 4v16m8-8H4"/></svg>
                 </div>
                 <p class="font-display text-sm font-black uppercase tracking-widest text-black">Post Listing</p>
              </div>
              <svg class="h-5 w-5 text-black/50 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7"/></svg>
            </RouterLink>
            
            <RouterLink to="/admin/notifications" class="group flex items-center justify-between rounded-[2rem] bg-white/5 p-6 transition-all duration-300 hover:bg-white/10">
              <div class="flex items-center gap-4">
                 <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-500/10 text-mint-400">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"/></svg>
                 </div>
                 <p class="font-display text-sm font-black uppercase tracking-widest text-white">Inquiries</p>
              </div>
               <svg class="h-5 w-5 text-white/20 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7"/></svg>
            </RouterLink>

            <button class="group flex items-center justify-between rounded-[2rem] bg-white/5 p-6 transition-all duration-300 hover:bg-white/10">
              <div class="flex items-center gap-4">
                 <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-ink-200/10 text-ink-200">
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><circle cx="12" cy="12" r="3"/></svg>
                 </div>
                 <p class="font-display text-sm font-black uppercase tracking-widest text-white">Settings</p>
              </div>
               <svg class="h-5 w-5 text-white/20 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M9 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>
      </div>
    </div>
  </AdminShell>
</template>
