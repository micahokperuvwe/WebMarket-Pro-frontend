<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '../../stores/auth'
import SiteHeader from '../../components/SiteHeader.vue'
import SiteFooter from '../../components/SiteFooter.vue'

const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'
const isLoading = ref(false)
const message = ref({ type: '', text: '' })

const profile = ref({
  name: authStore.currentUser?.name || '',
  email: authStore.currentUser?.email || '',
  address: authStore.currentUser?.address || '',
})

async function handleUpdateProfile() {
  isLoading.value = true
  message.value = { type: '', text: '' }
  try {
    const res = await fetch(`${API_BASE}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authStore.token}`
      },
      body: JSON.stringify({
        name: profile.value.name,
        address: profile.value.address,
      })
    })
    if (!res.ok) {
      const err = await res.json()
      throw new Error(err.error || 'Failed to update profile')
    }
    authStore.updateProfile({ name: profile.value.name, address: profile.value.address })
    message.value = { type: 'success', text: 'Profile updated successfully!' }
  } catch (err: any) {
    message.value = { type: 'error', text: err.message || 'Failed to update profile' }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-primary text-primary">
  <SiteHeader />
  <main class="p-6 lg:p-10">
    <div class="mx-auto max-w-6xl">
      <header class="mb-10">
        <p class="mb-2 font-display text-xs font-black uppercase tracking-[0.3em] text-gold-500/70">Your Account</p>
        <h1 class="font-display text-4xl font-bold tracking-tight">Account <span class="text-gradient">Settings</span></h1>
        <p class="text-sm text-white/50">Manage your profile information and security preferences.</p>
      </header>

      <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <!-- Sidebar Info -->
        <aside class="space-y-6">
          <div class="visual-hover-card glass-panel group aspect-square rounded-[2rem] border p-1 shadow-2xl">
             <div class="h-full w-full overflow-hidden rounded-[1.8rem] bg-gradient-to-br from-gold-400/20 to-mint-400/20">
                <!-- Visual enhancement placeholder - will look premium with CSS gradients if image missing -->
                <div class="flex h-full w-full flex-col items-center justify-center p-8 text-center transition-transform duration-500 group-hover:scale-110">
                  <div class="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 text-white shadow-xl backdrop-blur-md">
                     <svg class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  </div>
                  <h3 class="font-display text-xl font-bold">{{ authStore.currentUser?.name }}</h3>
                  <p class="text-sm text-white/60 capitalize">{{ authStore.currentUser?.role }} Account</p>
                </div>
             </div>
          </div>
          
          <div class="glass-panel rounded-3xl border p-6">
            <h4 class="mb-4 text-xs font-bold uppercase tracking-widest text-gold-400">Quick Stats</h4>
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <span class="text-sm text-white/50">Purchases</span>
                <span class="font-bold">12</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-white/50">Wishlist</span>
                <span class="font-bold">4</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-sm text-white/50">Member Since</span>
                <span class="font-bold">Jan 2024</span>
              </div>
            </div>
          </div>
        </aside>

        <!-- Forms -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Profile Form -->
          <section class="glass-panel rounded-[2rem] border p-8 shadow-xl">
            <h3 class="mb-6 font-display text-2xl font-bold">Personal Information</h3>
            <form @submit.prevent="handleUpdateProfile" class="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-white/40">Full Name</label>
                <input 
                  v-model="profile.name"
                  type="text" 
                  class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all focus:border-gold-400/50 focus:bg-white/10"
                  placeholder="Your full name"
                />
              </div>
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-wider text-white/40">Email Address</label>
                <input 
                  v-model="profile.email"
                  type="email" 
                  disabled
                  class="w-full cursor-not-allowed rounded-2xl border border-white/5 bg-white/5 px-4 py-3 text-sm text-white/30 outline-none"
                  placeholder="Email cannot be changed"
                />
              </div>
              <div class="space-y-2 md:col-span-2">
                <label class="text-xs font-bold uppercase tracking-wider text-white/40">Delivery Address</label>
                <textarea 
                  v-model="profile.address"
                  rows="3"
                  class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all focus:border-gold-400/50 focus:bg-white/10"
                  placeholder="Your physical address for billing"
                ></textarea>
              </div>

              <div class="md:col-span-2 flex items-center justify-between pt-4">
                 <p v-if="message.text" :class="message.type === 'success' ? 'text-mint-400' : 'text-red-400'" class="text-sm font-medium">
                   {{ message.text }}
                 </p>
                 <div v-else></div>
                 <button 
                   type="submit" 
                   :disabled="isLoading"
                   class="rounded-full bg-white px-8 py-3 text-sm font-bold text-ink-950 transition-all hover:bg-white/90 active:scale-95 disabled:opacity-50"
                 >
                   {{ isLoading ? 'Saving...' : 'Save Changes' }}
                 </button>
              </div>
            </form>
          </section>

          <!-- Security Form -->
          <section class="glass-panel rounded-[2rem] border p-8 shadow-xl">
             <div class="mb-6 flex items-center justify-between">
               <h3 class="font-display text-2xl font-bold">Security</h3>
               <div class="flex h-8 w-8 items-center justify-center rounded-full bg-white/5">
                 <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
               </div>
             </div>
             <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div class="space-y-2 md:col-span-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-white/40">Current Password</label>
                  <input 
                    type="password" 
                    class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all focus:border-red-400/30"
                    placeholder="••••••••"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-white/40">New Password</label>
                  <input 
                    type="password" 
                    class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition-all focus:border-mint-400/30"
                    placeholder="Min. 8 characters"
                  />
                </div>
                <div class="space-y-2">
                  <label class="text-xs font-bold uppercase tracking-wider text-white/40">Confirm New Password</label>
                  <input 
                    type="password" 
                    class="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                    placeholder="••••••••"
                  />
                </div>
                <div class="md:col-span-2 flex justify-end pt-4">
                  <button type="button" class="rounded-full border border-white/10 px-8 py-3 text-sm font-bold transition-all hover:bg-white/5">Update Password</button>
                </div>
             </div>
          </section>
        </div>
      </div>
    </div>
  </main>
  <SiteFooter />
  </div>
</template>
