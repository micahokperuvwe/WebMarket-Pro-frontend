import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', () => {
  const STORAGE_KEY = 'apexretail_theme'
  const savedTheme = localStorage.getItem(STORAGE_KEY) as 'dark' | 'light' | null
  
  const theme = ref<'dark' | 'light'>(savedTheme || 'dark')

  watch(
    theme,
    (value) => {
      document.body.classList.toggle('light-mode', value === 'light')
      localStorage.setItem(STORAGE_KEY, value)
    },
    { immediate: true },
  )

  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }

  return {
    theme,
    isDark,
    toggleTheme,
  }
})
