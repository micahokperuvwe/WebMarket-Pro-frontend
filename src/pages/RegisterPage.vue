<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const authStore = useAuthStore()
const router = useRouter()

const fullName = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

async function onSubmit() {
  errorMessage.value = ''

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  isLoading.value = true

  try {
    await authStore.register(fullName.value, email.value, password.value)
    // Redirect to welcome page for new users
    await router.push({ name: 'welcome' })
  } catch (error: any) {
    errorMessage.value = error.message || 'Registration failed'
    console.error('Registration error:', error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AppShell>
    <main class="min-h-[80vh] flex items-center justify-center p-6">
      <div class="w-full max-w-md space-y-8 text-primary">
        <header class="text-center space-y-2">
           <h1 class="font-display text-4xl font-bold tracking-tight text-primary">Create <span class="text-gradient">Account</span></h1>
           <p class="text-sm text-secondary">Join the marketplace and start exploring digital assets.</p>
        </header>

        <section class="glass-panel overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl">
          <form @submit.prevent="onSubmit" class="p-8 lg:p-10 space-y-6">
            <div class="space-y-4">
              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-secondary">Full Name</label>
                <input
                  v-model="fullName"
                  type="text"
                  required
                  class="w-full rounded-2xl border border-primary/10 bg-primary/5 py-4 px-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                  placeholder="John Doe"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
                <input
                  v-model="email"
                  type="email"
                  required
                  class="w-full rounded-2xl border border-primary/10 bg-primary/5 py-4 px-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                  placeholder="name@example.com"
                />
              </div>

              <div class="space-y-2">
                <label class="text-xs font-bold uppercase tracking-widest text-secondary">Password</label>
                <input
                  v-model="password"
                  type="password"
                  required
                  minlength="8"
                  class="w-full rounded-2xl border border-primary/10 bg-primary/5 py-4 px-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                  placeholder="Min. 8 characters"
                />
              </div>
            </div>

            <div v-if="errorMessage" class="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-xs font-medium text-red-400 animate-in fade-in slide-in-from-top-2">
              <p>{{ errorMessage }}</p>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="group relative w-full overflow-hidden rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-canvas shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              <span class="relative z-10">{{ isLoading ? 'Creating Account...' : 'Get Started' }}</span>
              <div class="absolute inset-0 -translate-x-full bg-gradient-premium transition-transform group-hover:translate-x-0"></div>
            </button>
          </form>

          <footer class="border-t border-primary/5 bg-primary/5 p-6 text-center">
            <p class="text-sm text-secondary">
              Already have an account?
              <router-link to="/login" class="font-bold text-primary hover:text-gold-400 transition-colors">Sign in</router-link>
            </p>
          </footer>
        </section>
      </div>
    </main>
  </AppShell>
</template>
