<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const authStore = useAuthStore()
const route = useRoute()
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
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''

    if (redirect) {
      await router.push(redirect)
    } else if (authStore.isAdmin) {
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

async function onGoogleSignIn() {
  errorMessage.value = ''
  isLoading.value = true

  try {
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''
    await authStore.loginWithGoogle(redirect)
  } catch (error: any) {
    errorMessage.value = error.message || 'Google sign in failed'
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
            <button
              type="button"
              :disabled="isLoading"
              @click="onGoogleSignIn"
              class="flex w-full items-center justify-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-8 py-4 text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-primary/10 disabled:opacity-50"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7A9.3 9.3 0 0 0 2.7 12c0 5.1 4.2 9.3 9.3 9.3 5.4 0 8.9-3.8 8.9-9.1 0-.6-.1-1.1-.1-1.5H12Z"/>
                <path fill="#34A853" d="M2.7 7.5l3.2 2.3c.9-1.8 2.8-3 5.1-3 1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7c-3.6 0-6.7 2-8.3 4.8Z"/>
                <path fill="#4A90E2" d="M12 21.3c2.4 0 4.5-.8 6-2.2l-2.8-2.3c-.8.6-1.8 1-3.2 1-3.7 0-5.1-2.6-5.4-3.8l-3.2 2.5c1.6 3 4.8 4.8 8.6 4.8Z"/>
                <path fill="#FBBC05" d="M6.6 14c-.2-.6-.3-1.2-.3-2s.1-1.4.3-2L3.4 7.5A9.2 9.2 0 0 0 2.7 12c0 1.5.4 2.9 1 4.3L6.6 14Z"/>
              </svg>
              Continue with Google
            </button>

            <div class="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.24em] text-secondary/40">
              <div class="h-px flex-1 bg-primary/10"></div>
              <span>or</span>
              <div class="h-px flex-1 bg-primary/10"></div>
            </div>

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
                  <router-link to="/forgot-password" class="text-[10px] font-bold uppercase tracking-widest text-gold-400 hover:underline">Forgot?</router-link>
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
