<script setup lang="ts">
import { ref } from 'vue'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'
const isLoading = ref(false)
const message = ref({ type: '', text: '' })

const form = ref({
  senderName: '',
  senderEmail: '',
  message: ''
})

async function handleSubmit() {
  isLoading.value = true
  message.value = { type: '', text: '' }
  try {
    const res = await fetch(`${API_BASE}/notifications/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value)
    })
    
    if (res.ok) {
      message.value = { type: 'success', text: 'Message sent! We will get back to you soon.' }
      form.value = { senderName: '', senderEmail: '', message: '' }
    } else {
      const errorData = await res.json()
      // Handle Zod format if it exists
      const errorText = errorData.error?.message?._errors?.[0] || errorData.error || 'Failed to send message'
      throw new Error(errorText)
    }
  } catch (err: any) {
    message.value = { type: 'error', text: err.message }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <main class="min-h-screen p-6 lg:p-10">
    <div class="mx-auto max-w-6xl">
      <div class="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
        <!-- Info Side -->
        <section class="space-y-8">
          <header>
            <h1 class="font-display text-5xl font-bold tracking-tight">Get in <span class="text-gradient">Touch</span></h1>
            <p class="mt-4 text-lg text-white/50 leading-relaxed">Have questions about a project? Need a custom build? We're here to help you scale your digital presence.</p>
          </header>

          <div class="space-y-6">
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-gold-400">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-white/40">Email Us</p>
                <p class="font-medium">support@webmarketpro.com</p>
              </div>
            </div>
            <div class="flex items-center gap-4">
              <div class="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-mint-400">
                <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-bold uppercase tracking-widest text-white/40">Location</p>
                <p class="font-medium">Digital Nomad Hub, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div class="visual-hover-card aspect-video h-48 w-full overflow-hidden rounded-[2rem] border border-white/10 glass-panel lg:h-64">
             <!-- Placeholder for map or premium visual -->
             <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-400/10 to-mint-400/10">
                <svg class="h-12 w-12 text-white/20 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
             </div>
          </div>
        </section>

        <!-- Form Side -->
        <section class="glass-panel rounded-[3rem] border p-8 shadow-2xl lg:p-12">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-white/40">Name</label>
              <input 
                v-model="form.senderName"
                type="text" 
                required
                class="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition-all focus:border-gold-400/50"
                placeholder="How should we call you?"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-white/40">Email</label>
              <input 
                v-model="form.senderEmail"
                type="email" 
                required
                class="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition-all focus:border-gold-400/50"
                placeholder="your@email.com"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-white/40">Message</label>
              <textarea 
                v-model="form.message"
                required
                rows="5"
                class="w-full rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-sm outline-none transition-all focus:border-gold-400/50"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div class="pt-2">
               <p v-if="message.text" :class="message.type === 'success' ? 'text-mint-400' : 'text-red-400'" class="mb-4 text-sm font-bold">
                 {{ message.text }}
               </p>
               <button 
                type="submit" 
                :disabled="isLoading"
                class="group relative w-full overflow-hidden rounded-full bg-white px-8 py-4 text-sm font-bold text-ink-950 transition-all active:scale-95 disabled:opacity-50"
               >
                 <span class="relative z-10">{{ isLoading ? 'Sending...' : 'Send Message' }}</span>
                 <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform group-hover:translate-x-0"></div>
               </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </main>
</template>
