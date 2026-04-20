<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import AdminShell from '../../components/AdminShell.vue'

const router = useRouter()
const authStore = useAuthStore()
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

const form = ref({
  title: '',
  slug: '',
  description: '',
  category: 'Ecommerce',
  price: 0,
  currency: 'USD',
  techStack: [] as string[],
  tags: [] as string[],
  demoUrl: '',
  accessModel: 'download' as 'download' | 'access-link',
  sourceFilePath: '',
  imageUrl: '',
  galleryUrls: [] as string[],
  videoUrl: '',
  featured: false
})

const currentTech = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

// Auto-generate slug from title
watch(() => form.value.title, (newTitle) => {
  if (newTitle) {
    form.value.slug = newTitle
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }
})

function addTech() {
  const val = currentTech.value.trim()
  if (val && !form.value.techStack.includes(val)) {
    form.value.techStack.push(val)
    currentTech.value = ''
  }
}

function removeTech(tech: string) {
  form.value.techStack = form.value.techStack.filter(t => t !== tech)
}


const fileStates = ref({
  mainImage: null as File | null,
  gallery: [] as File[],
  video: null as File | null,
  sourceFile: null as File | null
})

async function handleFileUploads() {
  const formData = new FormData()
  if (fileStates.value.mainImage) formData.append('mainImage', fileStates.value.mainImage)
  if (fileStates.value.video) formData.append('video', fileStates.value.video)
  if (fileStates.value.sourceFile) formData.append('sourceFile', fileStates.value.sourceFile)
  fileStates.value.gallery.forEach(file => formData.append('gallery', file))

  // Check if any files are actually selected
  let hasFiles = false
  for (const value of formData.values()) {
    if (value) hasFiles = true
  }

  if (!hasFiles) {
     return { imageUrl: '', galleryUrls: [], videoUrl: '', sourceFilePath: '' }
  }

  try {
    const res = await fetch(`${API_BASE}/websites/upload`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${authStore.token}` },
      body: formData
    })
    if (!res.ok) throw new Error('File upload failed. Ensure Cloudinary is configured on the backend.')
    return await res.json()
  } catch (err) {
    console.error(err)
    throw err
  }
}

async function onSubmit() {
  isLoading.value = true
  errorMessage.value = ''
  
  try {
    // 1. Upload files first
    const uploadResults = await handleFileUploads()
    
    // 2. Merge uploaded URLs into the form
    const finalPayload = {
      ...form.value,
      imageUrl: uploadResults.imageUrl || form.value.imageUrl,
      galleryUrls: uploadResults.galleryUrls || form.value.galleryUrls,
      videoUrl: uploadResults.videoUrl || form.value.videoUrl,
      sourceFilePath: uploadResults.sourceFilePath || form.value.sourceFilePath
    }

    // 3. Submit the main form
    const res = await fetch(`${API_BASE}/websites`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${authStore.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(finalPayload)
    })

    if (!res.ok) {
      const errorData = await res.json()
      throw new Error(errorData.error?.message || errorData.error || 'Submission failed')
    }

    router.push('/admin/websites')
  } catch (err: any) {
    errorMessage.value = err.message
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AdminShell>
    <div class="mx-auto max-w-5xl space-y-12 pb-20">
      <header class="flex flex-col gap-2">
        <h1 class="font-display text-5xl font-black tracking-tight text-primary">
          Post <span class="text-gradient">Digital Asset</span>
        </h1>
        <p class="text-lg font-medium text-secondary">Configure your new website for the global marketplace inventory.</p>
      </header>

      <form @submit.prevent="onSubmit" class="space-y-10">
        <!-- Section 1: Core Configuration -->
        <section class="glass-panel group overflow-hidden rounded-[3rem] border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.03] lg:p-12">
          <div class="flex items-center gap-4 mb-10">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-500/10 text-gold-500 shadow-lg shadow-gold-500/5">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <div>
              <h2 class="font-display text-2xl font-black text-primary">Identity & Core</h2>
              <p class="text-sm font-bold text-secondary">Define how the world sees your asset.</p>
            </div>
          </div>

          <div class="grid gap-8 sm:grid-cols-2">
            <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Asset Title</label>
              <input v-model="form.title" type="text" required class="form-input" placeholder="e.g., Ultra SaaS Dashboard" />
            </div>
            <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Slug (URL Permanent Link)</label>
              <div class="relative">
                 <span class="absolute left-5 top-1/2 -translate-y-1/2 text-secondary font-bold">/</span>
                 <input v-model="form.slug" type="text" required class="form-input pl-10" placeholder="ultra-saas-dashboard" />
              </div>
            </div>
          </div>

          <div class="grid gap-8 sm:grid-cols-4 mt-8">
             <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Domain / Category</label>
              <select v-model="form.category" class="form-input appearance-none bg-surface shadow-inner">
                <option>Ecommerce</option>
                <option>SaaS</option>
                <option>Portfolio</option>
                <option>Blog</option>
                <option>Custom</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Currency</label>
              <select v-model="form.currency" class="form-input appearance-none bg-surface shadow-inner">
                <option value="USD">USD ($)</option>
                <option value="NGN">NGN (₦)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="CAD">CAD (CA$)</option>
              </select>
            </div>
            <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Investment</label>
              <input v-model.number="form.price" type="number" step="0.01" required class="form-input" />
            </div>
             <div class="space-y-3">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Delivery Logic</label>
              <select v-model="form.accessModel" class="form-input appearance-none bg-surface shadow-inner">
                <option value="download">Instant Secure Download</option>
                <option value="access-link">External Access Handle</option>
              </select>
            </div>
          </div>

          <div class="space-y-3 mt-8">
            <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Premium Description (Markdown Support)</label>
            <textarea v-model="form.description" rows="5" required class="form-input resize-none" placeholder="Elaborate on the stack, features, and value proposition..."></textarea>
          </div>
        </section>

        <!-- Section 2: Technical Specs -->
        <section class="glass-panel group overflow-hidden rounded-[3rem] border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.03] lg:p-12">
           <div class="flex items-center gap-4 mb-10">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint-500/10 text-mint-500 shadow-lg shadow-mint-500/5">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>
            </div>
            <div>
              <h2 class="font-display text-2xl font-black text-primary">Engineering & Access</h2>
              <p class="text-sm font-bold text-secondary">The technical backbone of your digital asset.</p>
            </div>
          </div>

          <div class="space-y-8">
             <div class="space-y-4">
               <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Tech Stack Architecture</label>
               <div class="flex gap-3">
                 <input v-model="currentTech" @keydown.enter.prevent="addTech" type="text" class="form-input flex-1" placeholder="Add tech component (e.g. Next.js, Prisma, Stripe)..." />
                 <button type="button" @click="addTech" class="rounded-2xl bg-primary/5 px-6 font-display text-lg font-black text-primary transition-all hover:bg-primary hover:text-canvas">+</button>
               </div>
              <div class="flex flex-wrap gap-2 pt-2">
                <span v-for="t in form.techStack" :key="t" class="inline-flex items-center gap-2 rounded-xl border border-mint-500/20 bg-mint-500/10 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-mint-400">
                   {{ t }}
                   <button type="button" @click="removeTech(t)" class="text-secondary/50 hover:text-primary transition-colors">
                     <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4"><path d="M6 18L18 6M6 6l12 12"/></svg>
                  </button>
                </span>
              </div>
            </div>

            <div class="grid gap-8 sm:grid-cols-2">
                <div class="space-y-3">
                   <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Demo / Preview (URL or World Name)</label>
                  <input v-model="form.demoUrl" type="text" required class="form-input" placeholder="e.g., https://demo.mysite.com or My World Name" />
               </div>
                <div class="space-y-3">
                   <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Secure Source Artifact (.ZIP)</label>
                  <div class="relative cursor-pointer">
                     <input type="file" @change="(e: any) => fileStates.sourceFile = e.target.files[0]" class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept=".zip,.rar,.tar.gz" />
                      <div class="flex items-center gap-4 rounded-2xl border border-dashed border-primary/20 bg-primary/5 px-6 py-4 transition-all hover:bg-primary/10">
                         <svg class="h-6 w-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"/></svg>
                         <span class="text-sm font-bold text-secondary">{{ fileStates.sourceFile ? fileStates.sourceFile.name : 'Choose secure ZIP bundle...' }}</span>
                      </div>
                  </div>
               </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Visual Identity -->
        <section class="glass-panel group overflow-hidden rounded-[3rem] border-white/5 bg-white/[0.02] p-8 transition-all hover:bg-white/[0.03] lg:p-12">
           <div class="flex items-center gap-4 mb-10">
            <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-white/5">
               <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <div>
              <h2 class="font-display text-2xl font-black text-primary">Visual Showcase</h2>
              <p class="text-sm font-bold text-secondary">The cinematic representation of your product.</p>
            </div>
          </div>

          <div class="grid gap-10 sm:grid-cols-2">
            <div class="space-y-4">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Primary Cinema Banner</label>
              <div class="group relative aspect-video cursor-pointer overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/10 bg-primary/5 transition-all hover:border-gold-500/30 hover:bg-primary/10">
                 <input type="file" @change="(e: any) => fileStates.mainImage = e.target.files[0]" required class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" />
                  <div v-if="!fileStates.mainImage" class="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                    <div class="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary/30"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg></div>
                    <p class="text-xs font-black uppercase tracking-widest text-secondary/30 px-8">Upload main display image</p>
                  </div>
                 <div v-else class="h-full w-full">
                    <div class="flex h-full w-full items-center justify-center bg-gold-400/10 text-gold-400 font-bold text-sm">{{ fileStates.mainImage.name }}</div>
                 </div>
              </div>
            </div>
            
            <div class="space-y-4">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Gallery Vault (Multiple)</label>
               <div class="group relative aspect-video cursor-pointer overflow-hidden rounded-[2rem] border-2 border-dashed border-primary/10 bg-primary/5 transition-all hover:border-mint-500/30 hover:bg-primary/10">
                 <input type="file" @change="(e: any) => fileStates.gallery = Array.from(e.target.files)" multiple class="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0" accept="image/*" />
                  <div v-if="fileStates.gallery.length === 0" class="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                    <div class="h-12 w-12 rounded-full bg-primary/5 flex items-center justify-center text-secondary/30"><svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4"/></svg></div>
                    <p class="text-xs font-black uppercase tracking-widest text-secondary/30 px-8">Upload feature screenshots</p>
                  </div>
                 <div v-else class="h-full w-full">
                    <div class="flex h-full w-full items-center justify-center bg-mint-400/10 text-mint-400 font-bold text-sm">{{ fileStates.gallery.length }} Files Selected</div>
                 </div>
              </div>
            </div>
            
            <div class="space-y-4 sm:col-span-2">
              <label class="font-display text-[11px] font-black uppercase tracking-[0.2em] text-secondary">Commercial Reel (Video Optional)</label>
              <input type="file" @change="(e: any) => fileStates.video = e.target.files[0]" class="form-input px-5" accept="video/*" />
            </div>
          </div>

          <div class="mt-10 flex items-center gap-4 rounded-3xl bg-primary/5 p-6 border border-primary/5">
            <input type="checkbox" v-model="form.featured" id="featured" class="h-6 w-6 rounded-lg border-primary/10 bg-primary/10 text-gold-500 focus:ring-gold-400" />
            <div class="flex-1">
               <label for="featured" class="font-display text-base font-black text-primary">Feature in Elite Selection</label>
               <p class="text-xs font-bold text-secondary">Promote this asset to the homepage "Featured Inventory" section.</p>
            </div>
          </div>
        </section>

        <!-- Final Authorization -->
        <div v-if="errorMessage" class="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 text-sm font-bold text-red-400 selection:bg-red-500/30">
          <div class="flex items-center gap-3">
             <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
             {{ errorMessage }}
          </div>
        </div>

        <button 
          type="submit" 
          :disabled="isLoading"
          class="group relative flex w-full items-center justify-center gap-4 overflow-hidden rounded-[2.5rem] bg-primary px-10 py-8 font-display text-lg font-black uppercase tracking-[0.25em] text-canvas transition-all hover:bg-gold-500 hover:scale-[1.01] active:scale-95 disabled:opacity-50"
        >
          <span class="relative z-10">{{ isLoading ? 'Synchronizing with Cloud...' : 'Deploy to Marketplace' }}</span>
          <svg class="relative z-10 h-6 w-6 transition-transform group-hover:translate-x-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform duration-500 group-hover:translate-x-0"></div>
        </button>
      </form>
    </div>
  </AdminShell>
</template>

<style scoped>
@reference "../../style.css";

.form-input {
  @apply w-full rounded-2xl border border-primary/5 bg-primary/5 px-6 py-5 text-sm font-bold text-primary outline-none transition-all placeholder:text-secondary focus:border-gold-500/30 focus:shadow-[0_0_20px_rgba(239,185,53,0.05)];
}
</style>
