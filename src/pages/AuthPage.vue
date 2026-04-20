<script setup lang="ts">
import { useRouter } from 'vue-router'
import AppShell from '../components/AppShell.vue'

const router = useRouter()

function goToLogin() {
  router.push({ name: 'login' })
}

function goToRegister() {
  router.push({ name: 'register' })
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
