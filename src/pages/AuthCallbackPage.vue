<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppShell from '../components/AppShell.vue'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const errorMessage = ref('')

onMounted(async () => {
  try {
    const code = typeof route.query.code === 'string' ? route.query.code : null
    await authStore.finalizeOAuthLogin(code)

    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : ''

    if (redirect) {
      await router.replace(redirect)
    } else if (authStore.isAdmin) {
      await router.replace({ name: 'admin-dashboard' })
    } else {
      await router.replace({ name: 'home' })
    }
  } catch (error: any) {
    errorMessage.value = error?.message || 'Google sign in failed'
  }
})
</script>

<template>
  <AppShell>
    <main class="flex min-h-[70vh] items-center justify-center p-6">
      <section class="glass-panel w-full max-w-lg rounded-[2.5rem] border border-primary/10 p-8 text-center shadow-2xl">
        <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary">
          <svg v-if="!errorMessage" class="h-7 w-7 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <svg v-else class="h-7 w-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 class="mt-6 font-display text-3xl font-black text-primary">
          {{ errorMessage ? 'Google Sign In Failed' : 'Finishing Google Sign In' }}
        </h1>
        <p class="mt-3 text-sm font-medium text-secondary">
          {{ errorMessage || 'Please wait while we connect your Google account to ApexRetail.' }}
        </p>

        <RouterLink
          v-if="errorMessage"
          to="/login"
          class="mt-8 inline-flex rounded-full bg-primary px-6 py-3 text-sm font-black uppercase tracking-widest text-canvas transition-all hover:opacity-90"
        >
          Back to login
        </RouterLink>
      </section>
    </main>
  </AppShell>
</template>
