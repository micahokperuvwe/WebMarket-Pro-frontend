<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const authStore = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function onSubmit() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    await authStore.login(email.value, password.value)
    // Redirect to home or admin dashboard based on role
    if (authStore.isAdmin) {
      await router.push({ name: 'admin-dashboard' })
    } else {
      await router.push({ name: 'home' })
    }
  } catch (error: any) {
    errorMessage.value = error.message || 'Login failed'
    console.error('Login error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AppShell>
    <main class="min-h-[80vh] flex items-center justify-center p-6">
      <div class="w-full max-w-md space-y-8">
        <header class="text-center space-y-2">
           <h1 class="font-display text-4xl font-bold tracking-tight text-primary">Access <span class="text-gradient">Pro</span></h1>
           <p class="text-sm text-secondary">Manage your digital assets and marketplace profile.</p>
        </header>

        <section class="glass-panel overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl">
          <form @submit.prevent="onSubmit" class="p-8 lg:p-10 space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 transition-colors group-focus-within:text-gold-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  </div>
                  <input
                    v-model="email"
                    type="email"
                    required
                    class="w-full rounded-2xl border border-primary/10 bg-primary/5 py-4 pl-12 pr-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between">
                  <label class="text-xs font-bold uppercase tracking-widest text-secondary">Password</label>
                  <a href="#" class="text-[10px] font-bold uppercase tracking-widest text-gold-400 hover:underline">Forgot?</a>
                </div>
                <div class="relative group">
                  <div class="absolute left-4 top-1/2 -translate-y-1/2 text-secondary/30 transition-colors group-focus-within:text-gold-400">
                    <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                  </div>
                  <input
                    v-model="password"
                    type="password"
                    required
                    class="w-full rounded-2xl border border-primary/10 bg-primary/5 py-4 pl-12 pr-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <div v-if="errorMessage" class="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-xs font-medium text-red-400 animate-in fade-in slide-in-from-top-2">
              <div class="flex items-center gap-2">
                <svg class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p>{{ errorMessage }}</p>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-canvas shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <span class="relative z-10">{{ isLoading ? 'Processing...' : 'Sign in' }}</span>
              <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform group-hover:translate-x-0"></div>
            </button>
          </form>

          <footer class="border-t border-primary/5 bg-primary/5 p-6 text-center">
            <p class="text-sm text-secondary">
              Don't have an account yet?
              <router-link to="/register" class="font-bold text-primary hover:text-gold-400 transition-colors">Register here</router-link>
            </p>
          </footer>
        </section>
      </div>
    </main>
  </AppShell>
</template>
