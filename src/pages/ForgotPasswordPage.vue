<script setup lang="ts">
import { computed, ref } from 'vue'
import AppShell from '../components/AppShell.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()

const email = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const resetRedirectUrl = computed(() => `${window.location.origin}/reset-password`)

async function onSubmit() {
  errorMessage.value = ''
  successMessage.value = ''
  isLoading.value = true

  try {
    const payload = await authStore.requestPasswordReset(email.value, resetRedirectUrl.value)
    successMessage.value = payload?.message || 'Check your email for a password reset link.'
  } catch (error: any) {
    errorMessage.value = error.message || 'Unable to send password reset email'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AppShell>
    <main class="flex min-h-[80vh] items-center justify-center p-6">
      <div class="w-full max-w-md space-y-8">
        <header class="space-y-2 text-center">
          <h1 class="font-display text-4xl font-bold tracking-tight text-primary">Reset Password</h1>
          <p class="text-sm text-secondary">Enter the email address you use for your account and we will send you a reset link.</p>
        </header>

        <section class="glass-panel overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl">
          <form class="space-y-6 p-8 lg:p-10" @submit.prevent="onSubmit">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-secondary">Email Address</label>
              <input
                v-model="email"
                type="email"
                required
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                placeholder="name@example.com"
              />
            </div>

            <div v-if="errorMessage" class="rounded-2xl border border-red-400/20 bg-red-400/5 p-4 text-xs font-medium text-red-400">
              {{ errorMessage }}
            </div>

            <div v-if="successMessage" class="rounded-2xl border border-mint-400/20 bg-mint-400/5 p-4 text-xs font-medium text-mint-600">
              {{ successMessage }}
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-canvas shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {{ isLoading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </form>

          <footer class="border-t border-primary/5 bg-primary/5 p-6 text-center">
            <router-link to="/login" class="text-sm font-bold text-primary transition-colors hover:text-gold-400">
              Back to sign in
            </router-link>
          </footer>
        </section>
      </div>
    </main>
  </AppShell>
</template>
