<script setup lang="ts">
import { onMounted } from 'vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()

// Restore session from localStorage token on page load/refresh
onMounted(() => {
  authStore.loadProfile()
})
</script>

<template>
  <RouterView />
</template>
