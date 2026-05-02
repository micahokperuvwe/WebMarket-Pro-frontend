<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const errorMessage = ref('')
const isLoading = ref(false)

function goToLogin() {
  router.push({ name: 'login', query: route.query })
}

function goToRegister() {
  router.push({ name: 'register', query: route.query })
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
    <section class="mx-auto max-w-4xl py-12">
      <div class="glass-panel rounded-[32px] border p-6">
        <p class="text-xs uppercase tracking-[0.28em] text-secondary">Authentication</p>
        <h1 class="mt-3 font-display text-4xl font-semibold text-primary">Sign in or create a new account</h1>
        <p class="mt-4 text-secondary">
          Use one login box for both regular users and admins. Choose Login if you already have an account, or Register to create one.
        </p>
        <button
          type="button"
          :disabled="isLoading"
          class="mt-8 flex w-full items-center justify-center gap-3 rounded-full border border-primary/10 bg-primary/5 px-6 py-4 text-sm font-black uppercase tracking-widest text-primary transition-colors hover:bg-primary/10 disabled:opacity-50"
          @click="onGoogleSignIn"
        >
          <svg class="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
            <path fill="#EA4335" d="M12 10.2v3.9h5.4c-.2 1.3-1.6 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.7-6 5.9-6c1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7A9.3 9.3 0 0 0 2.7 12c0 5.1 4.2 9.3 9.3 9.3 5.4 0 8.9-3.8 8.9-9.1 0-.6-.1-1.1-.1-1.5H12Z"/>
            <path fill="#34A853" d="M2.7 7.5l3.2 2.3c.9-1.8 2.8-3 5.1-3 1.8 0 3 .8 3.7 1.5l2.5-2.4C16.6 3.6 14.5 2.7 12 2.7c-3.6 0-6.7 2-8.3 4.8Z"/>
            <path fill="#4A90E2" d="M12 21.3c2.4 0 4.5-.8 6-2.2l-2.8-2.3c-.8.6-1.8 1-3.2 1-3.7 0-5.1-2.6-5.4-3.8l-3.2 2.5c1.6 3 4.8 4.8 8.6 4.8Z"/>
            <path fill="#FBBC05" d="M6.6 14c-.2-.6-.3-1.2-.3-2s.1-1.4.3-2L3.4 7.5A9.2 9.2 0 0 0 2.7 12c0 1.5.4 2.9 1 4.3L6.6 14Z"/>
          </svg>
          Continue with Google
        </button>
        <p v-if="errorMessage" class="mt-4 rounded-2xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm font-medium text-red-400">
          {{ errorMessage }}
        </p>
        <div class="mt-8 flex flex-col gap-4 sm:flex-row">
          <button type="button" class="rounded-full bg-primary px-6 py-3 text-canvas font-black uppercase tracking-widest text-sm" @click="goToLogin">
            Login
          </button>
          <button type="button" class="rounded-full border border-primary/10 px-6 py-3 text-primary font-black uppercase tracking-widest text-sm hover:bg-primary/5 transition-colors" @click="goToRegister">
            Register
          </button>
        </div>
      </div>
    </section>
  </AppShell>
</template>
