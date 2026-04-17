<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import AdminShell from '../../components/AdminShell.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const notifications = ref([])
const isLoading = ref(true)

async function fetchNotifications() {
  isLoading.value = true
  try {
    const res = await fetch(`${API_BASE}/notifications`, {
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    const data = await res.json()
    notifications.value = Array.isArray(data) ? data : []
  } catch (err) {
    console.error('Failed to fetch notifications:', err)
  } finally {
    isLoading.value = false
  }
}

async function markAsRead(id: string) {
  try {
    const res = await fetch(`${API_BASE}/notifications/${id}/read`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${authStore.token}` }
    })
    if (res.ok) {
      const idx = notifications.value.findIndex(n => n.id === id)
      if (idx !== -1) notifications.value[idx].read = true
    }
  } catch (err) {
    console.error('Failed to mark as read:', err)
  }
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(fetchNotifications)
</script>

<template>
  <AdminShell>
    <div class="space-y-10">
      <header class="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div class="space-y-1">
          <h1 class="font-display text-5xl font-black tracking-tight text-white">
            Inbox <span class="text-gradient">& Notifications</span>
          </h1>
          <p class="text-lg font-medium text-white/40">Manage your inquiries and system messages.</p>
        </div>
        
        <div class="flex items-center gap-4">
           <div class="flex h-12 items-center gap-2 rounded-2xl bg-white/5 px-4 text-sm font-bold text-white/60">
             <div class="h-2 w-2 rounded-full bg-gold-500 animate-pulse"></div>
             {{ notifications.filter(n => !n.read).length }} Unread
           </div>
        </div>
      </header>

      <div class="glass-panel overflow-hidden rounded-[2.5rem] border-white/5 bg-white/[0.02]">
        <div v-if="isLoading" class="flex flex-col items-center justify-center p-32 text-center">
          <div class="h-10 w-10 animate-spin rounded-full border-2 border-gold-500/20 border-t-gold-500"></div>
          <p class="mt-6 font-display text-xl font-bold tracking-tight text-white/40">Fetching messages...</p>
        </div>
        
        <div v-else-if="notifications.length === 0" class="flex flex-col items-center justify-center p-32 text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-3xl bg-white/5 text-white/20">
             <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/></svg>
          </div>
          <p class="mt-8 font-display text-2xl font-bold tracking-tight text-white/40">Your inbox is empty</p>
          <p class="mt-2 text-white/20">When users contact you, their messages will appear here.</p>
        </div>

        <div v-else class="divide-y divide-white/5">
          <article 
            v-for="item in notifications" 
            :key="item.id"
            class="group relative flex flex-col gap-6 p-8 transition-all duration-300 hover:bg-white/[0.03] md:flex-row md:items-start lg:p-10"
            :class="{ 'opacity-50 blur-[0.5px] grayscale-[0.5]': item.read }"
          >
            <!-- Unread Dot -->
            <div v-if="!item.read" class="absolute left-3 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-gold-400 shadow-[0_0_10px_var(--accent-gold)]"></div>

            <div 
              class="flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-[1.25rem] transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20"
              :class="item.read ? 'bg-white/5 text-white/20' : 'bg-gradient-premium text-black shadow-xl shadow-gold-500/10'"
            >
              <svg class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 0 -2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
            </div>

            <div class="flex-1 space-y-4">
              <div class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                <div>
                  <h4 class="font-display text-2xl font-extrabold tracking-tight text-white">{{ item.sender_name }}</h4>
                  <p class="text-sm font-bold text-mint-500/80">{{ item.sender_email }}</p>
                </div>
                <div class="flex items-center gap-3">
                   <time class="font-display text-xs font-black uppercase tracking-widest text-white/30">{{ formatDate(item.created_at) }}</time>
                </div>
              </div>

              <div class="relative rounded-3xl bg-white/5 p-6 md:p-8">
                 <p class="relative z-10 text-lg leading-relaxed text-white/70">{{ item.message }}</p>
                 <!-- Decorative quote mark -->
                 <svg class="absolute -right-2 bottom-2 h-16 w-16 text-white/[0.02]" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.017 14.8954 18.1216 14 17.017 14H15.017C13.9124 14 13.017 13.1046 13.017 12V10C13.017 8.89543 13.9124 8 15.017 8H19.017C20.1216 8 21.017 8.89543 21.017 10V18C21.017 19.6569 19.6739 21 18.017 21H14.017ZM3.01704 21L3.01704 18C3.01704 16.8954 3.91242 16 5.01704 16H8.01704C8.01704 14.8954 7.12161 14 6.01704 14H4.01704C2.91247 14 2.01704 13.1046 2.01704 12V10C2.01704 8.89543 2.91247 8 4.01704 8H8.01704C9.12161 8 10.017 8.89543 10.017 10V18C10.017 19.6569 8.6739 21 7.01704 21H3.01704Z"/></svg>
              </div>

              <div class="flex flex-wrap items-center gap-4 pt-2">
                 <button 
                   v-if="!item.read" 
                   @click="markAsRead(item.id)"
                   class="flex items-center gap-2 rounded-xl bg-gold-500/10 px-6 py-3 text-sm font-black uppercase tracking-widest text-gold-400 transition-all hover:bg-gold-500 hover:text-black"
                 >
                   <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg>
                   Mark Resolved
                 </button>
                 <a 
                   :href="`mailto:${item.sender_email}`" 
                   class="flex items-center gap-2 rounded-xl bg-white/5 px-6 py-3 text-sm font-black uppercase tracking-widest text-mint-400 transition-all hover:bg-white/10 hover:text-mint-300"
                 >
                   <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"/></svg>
                   Reply Securely
                 </a>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </AdminShell>
</template>
