<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AdminShell from '../../components/AdminShell.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const users = ref<any[]>([])
const isLoading = ref(true)
const error = ref('')
const search = ref('')
const tabbingStatus = ref('all') // all, active, suspended

async function fetchUsers() {
  isLoading.value = true
  error.value = ''
  try {
    const res = await fetch(`${API_BASE}/users`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (!res.ok) throw new Error('Failed to fetch user database')
    users.value = await res.json()
  } catch (err: any) {
    error.value = err.message
  } finally {
    isLoading.value = false
  }
}

async function toggleUserStatus(userId: string, currentStatus: boolean) {
  try {
    const res = await fetch(`${API_BASE}/users/${userId}/status`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authStore.token}` 
      },
      body: JSON.stringify({ suspended: !currentStatus })
    })
    
    if (res.ok) {
      // Update local state
      const userIndex = users.value.findIndex(u => u.id === userId)
      if (userIndex !== -1) {
        users.value[userIndex].suspended = !currentStatus
      }
    }
  } catch (err) {
    console.error('Failed to update user status:', err)
  }
}

const filteredUsers = computed(() => {
  return users.value.filter(user => {
    const matchesSearch = 
      user.email?.toLowerCase().includes(search.value.toLowerCase()) || 
      user.full_name?.toLowerCase().includes(search.value.toLowerCase())
    
    const matchesTab = 
      tabbingStatus.value === 'all' || 
      (tabbingStatus.value === 'active' && !user.suspended) || 
      (tabbingStatus.value === 'suspended' && user.suspended)
      
    return matchesSearch && matchesTab
  })
})

onMounted(fetchUsers)
</script>

<template>
  <AdminShell>
    <div class="space-y-12">
      <!-- High-Performance Header -->
      <header class="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div class="space-y-4">
          <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Identity Ecosystem</p>
          <h1 class="font-display text-5xl font-black tracking-tight text-primary sm:text-7xl">
            User <span class="text-gradient">Governance</span>
          </h1>
          <p class="max-w-xl text-lg font-medium text-secondary italic leading-relaxed">
            "Oversee atmospheric community growth. Audit registration logs and manage security protocols."
          </p>
        </div>

        <div class="flex flex-col gap-4 sm:flex-row">
           <div class="relative min-w-[300px]">
              <input 
                v-model="search"
                type="search" 
                placeholder="Search dossiers..." 
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4.5 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30 placeholder:text-secondary/20"
              />
              <div class="absolute right-6 top-1/2 -translate-y-1/2 text-secondary/30">
                <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              </div>
           </div>
        </div>
      </header>

      <!-- Elite Tabs -->
      <div class="flex h-12 items-center gap-2 rounded-2.5xl bg-primary/5 p-1.5 w-fit">
        <button 
          v-for="tab in ['all', 'active', 'suspended']" 
          :key="tab"
          @click="tabbingStatus = tab"
          class="rounded-2xl px-8 py-2 text-[10px] font-black uppercase tracking-widest transition-all"
          :class="tabbingStatus === tab ? 'bg-primary text-canvas shadow-lg' : 'text-secondary hover:text-primary'"
        >
          {{ tab }}
        </button>
      </div>

      <!-- Loading State -->
      <div v-if="isLoading" class="space-y-6">
        <div v-for="i in 5" :key="i" class="h-24 w-full rounded-[2rem] bg-primary/5 animate-pulse"></div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="surface-premium rounded-[3rem] p-16 text-center shadow-2xl">
        <div class="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-400">
           <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/></svg>
        </div>
        <p class="font-display text-2xl font-bold text-secondary">{{ error }}</p>
        <button @click="fetchUsers" class="mt-8 rounded-full border border-primary/10 px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-primary/5">Retry Protocol</button>
      </div>

      <!-- User Directory Table -->
      <div v-else class="glass-panel overflow-hidden rounded-[3rem] border border-primary/5 bg-primary/5">
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead>
              <tr class="border-b border-primary/5 text-[10px] font-black uppercase tracking-[0.2em] text-secondary/40">
                <th class="px-10 py-8">Identity</th>
                <th class="px-10 py-8">Security Role</th>
                <th class="px-10 py-8">Status</th>
                <th class="px-10 py-8">Registration Date</th>
                <th class="px-10 py-8 text-right">Operations</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-primary/5">
              <tr 
                v-for="user in filteredUsers" 
                :key="user.id" 
                class="group transition-colors hover:bg-primary/5"
              >
                <td class="px-10 py-8">
                  <div class="flex items-center gap-5">
                    <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 group-hover:bg-gradient-premium group-hover:text-canvas transition-all">
                       <span class="font-display text-sm font-black">{{ (user.full_name || 'U').charAt(0) }}</span>
                    </div>
                    <div>
                      <p class="font-display text-lg font-extrabold text-primary">{{ user.full_name || 'Anonymous' }}</p>
                      <p class="text-xs font-bold text-secondary opacity-60">{{ user.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-10 py-8">
                  <span 
                    class="rounded-xl px-4 py-1.5 text-[9px] font-black uppercase tracking-widest border"
                    :class="user.role === 'admin' ? 'bg-gold-500/10 text-gold-500 border-gold-500/20' : 'bg-primary/5 text-secondary border-primary/10'"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-10 py-8">
                    <div class="flex items-center gap-2.5">
                       <span 
                        class="h-2 w-2 rounded-full"
                        :class="user.suspended ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.5)]' : 'bg-mint-400 shadow-[0_0_8px_rgba(52,211,153,0.5)]'"
                       ></span>
                       <span class="text-xs font-bold" :class="user.suspended ? 'text-red-400' : 'text-mint-400'">
                         {{ user.suspended ? 'Suspended' : 'Operational' }}
                       </span>
                    </div>
                </td>
                <td class="px-10 py-8">
                  <p class="text-xs font-bold text-secondary opacity-60">
                    {{ new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) }}
                  </p>
                </td>
                <td class="px-10 py-8 text-right">
                  <button 
                    @click="toggleUserStatus(user.id, user.suspended)"
                    class="rounded-2xl border border-primary/5 bg-primary/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-primary/10 active:scale-95"
                    :class="user.suspended ? 'text-mint-400 hover:border-mint-400/20' : 'text-red-400 hover:border-red-400/20'"
                  >
                    {{ user.suspended ? 'Reinstate' : 'Suspend' }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredUsers.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
          <div class="mb-4 text-secondary/10">
            <svg class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/></svg>
          </div>
          <p class="font-display text-xl font-bold text-secondary">No matching records found in the identity ecosystem.</p>
        </div>
      </div>
    </div>
  </AdminShell>
</template>
