<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import AppShell from '../components/AppShell.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
const router = useRouter()

const password = ref('')
const confirmPassword = ref('')
const recoveryToken = ref('')
const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const canSubmit = computed(() => Boolean(recoveryToken.value))

function readRecoveryToken() {
  const hash = window.location.hash.startsWith('#') ? window.location.hash.slice(1) : window.location.hash
  const params = new URLSearchParams(hash)
  return params.get('access_token') ?? ''
}

onMounted(() => {
  recoveryToken.value = readRecoveryToken()

  if (!recoveryToken.value) {
    errorMessage.value = 'This password reset link is invalid or has expired. Please request a new one.'
  }
})

async function onSubmit() {
  errorMessage.value = ''
  successMessage.value = ''

  if (!recoveryToken.value) {
    errorMessage.value = 'This password reset link is invalid or has expired.'
    return
  }

  if (password.value.length < 8) {
    errorMessage.value = 'Password must be at least 8 characters long.'
    return
  }

  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Passwords do not match.'
    return
  }

  isLoading.value = true

  try {
    await authStore.resetPassword(password.value, recoveryToken.value)
    successMessage.value = 'Password updated successfully. You can now sign in with your new password.'
    window.history.replaceState({}, document.title, window.location.pathname)
    setTimeout(() => {
      router.push({ name: 'login' })
    }, 1200)
  } catch (error: any) {
    errorMessage.value = error.message || 'Unable to update password'
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
          <h1 class="font-display text-4xl font-bold tracking-tight text-primary">Choose New Password</h1>
          <p class="text-sm text-secondary">Set a new password for your account and then sign back in.</p>
        </header>

        <section class="glass-panel overflow-hidden rounded-[2.5rem] border border-primary/10 shadow-2xl">
          <form class="space-y-6 p-8 lg:p-10" @submit.prevent="onSubmit">
            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-secondary">New Password</label>
              <input
                v-model="password"
                type="password"
                required
                minlength="8"
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                placeholder="Minimum 8 characters"
              />
            </div>

            <div class="space-y-2">
              <label class="text-xs font-bold uppercase tracking-widest text-secondary">Confirm Password</label>
              <input
                v-model="confirmPassword"
                type="password"
                required
                minlength="8"
                class="w-full rounded-2xl border border-primary/10 bg-primary/5 px-4 py-4 text-sm text-primary outline-none transition-all focus:border-gold-400/50 focus:bg-primary/10"
                placeholder="Repeat your new password"
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
              :disabled="isLoading || !canSubmit"
              class="w-full rounded-full bg-primary px-8 py-4 text-sm font-black uppercase tracking-widest text-canvas shadow-xl transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50"
            >
              {{ isLoading ? 'Updating...' : 'Update Password' }}
            </button>
          </form>
        </section>
      </div>
    </main>
  </AppShell>
</template>
