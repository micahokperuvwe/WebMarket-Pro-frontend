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
  <AppShell>
    <header class="section-padding bg-primary/[0.01] border-b border-primary/5">
      <div class="container-wide">
        <p class="font-display text-xs font-black uppercase tracking-[0.4em] text-gold-500">Concierge Support</p>
        <h1 class="mt-4 font-display text-5xl font-black tracking-tight text-primary sm:text-7xl">
          Get in <span class="text-gradient">Touch</span>
        </h1>
      </div>
    </header>

    <div class="container-wide section-padding">
      <div class="grid grid-cols-1 gap-20 lg:grid-cols-2">
        <!-- Info Side -->
        <section class="space-y-12">
          <div class="space-y-6">
            <h2 class="font-display text-3xl font-black text-primary">Strategic Assistance</h2>
            <p class="text-lg font-medium text-secondary leading-relaxed">Have questions about a project? Need a custom build? We're here to help you scale your digital presence with elite infrastructure.</p>
          </div>

          <div class="space-y-8">
            <div class="flex items-center gap-6">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-gold-400">
                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
              </div>
              <div>
                <p class="text-xs font-black uppercase tracking-widest text-secondary opacity-60">Professional Inquiries</p>
                <p class="font-display text-xl font-bold text-primary">support@apexretail.com</p>
              </div>
            </div>
            <div class="flex items-center gap-6">
              <div class="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/5 text-mint-400">
                <svg class="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
              </div>
              <div>
                <p class="text-xs font-black uppercase tracking-widest text-secondary opacity-60">Regional Headquarters</p>
                <p class="font-display text-xl font-bold text-primary">Digital Nomad Hub, Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <div class="surface-premium aspect-video w-full overflow-hidden rounded-[3rem] shadow-2xl">
             <div class="flex h-full w-full items-center justify-center bg-gradient-to-br from-gold-500/5 to-mint-500/5">
                <svg class="h-16 w-16 text-primary/10 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/></svg>
             </div>
          </div>
        </section>

        <!-- Form Side -->
        <section class="surface-premium rounded-[3.5rem] p-8 lg:p-14 shadow-2xl">
          <form @submit.prevent="handleSubmit" class="space-y-8">
            <div class="space-y-3">
              <label class="font-display text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Full Identity</label>
              <input 
                v-model="form.senderName"
                type="text" 
                required
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4.5 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30 placeholder:text-secondary/20"
                placeholder="How should we address you?"
              />
            </div>
            <div class="space-y-3">
              <label class="font-display text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Electronic Mail</label>
              <input 
                v-model="form.senderEmail"
                type="email" 
                required
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4.5 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30 placeholder:text-secondary/20"
                placeholder="your@professional-email.com"
              />
            </div>
            <div class="space-y-3">
              <label class="font-display text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Project Dossier</label>
              <textarea 
                v-model="form.message"
                required
                rows="5"
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-6 py-4.5 text-sm font-bold text-primary outline-none transition-all focus:border-gold-500/30 placeholder:text-secondary/20"
                placeholder="Briefly describe your requirements..."
              ></textarea>
            </div>

            <div class="pt-4">
               <p v-if="message.text" :class="message.type === 'success' ? 'text-mint-400' : 'text-red-400'" class="mb-6 text-sm font-black p-4 rounded-xl bg-primary/5 border border-primary/5">
                 {{ message.text }}
               </p>
               <button 
                type="submit" 
                :disabled="isLoading"
                class="group relative w-full overflow-hidden rounded-[2rem] bg-primary py-5 text-sm font-black uppercase tracking-widest text-canvas transition-all active:scale-95 disabled:opacity-50"
               >
                 <span class="relative z-10">{{ isLoading ? 'Processing...' : 'Dispatch Protocol' }}</span>
                 <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform duration-500 group-hover:translate-x-0"></div>
               </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  </AppShell>
</template>
