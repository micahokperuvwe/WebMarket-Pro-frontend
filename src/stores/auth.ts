import { computed, ref } from 'vue'
import { defineStore } from 'pinia'
import type { UserProfile } from '../types/marketplace'

const STORAGE_KEY = 'apexretail_auth_token'
const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

function parseJsonResponse(response: Response) {
  return response.text().then((text) => {
    if (!text) {
      return null
    }

    try {
      return JSON.parse(text)
    } catch (error) {
      return { error: 'Invalid JSON response from server' }
    }
  })
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem(STORAGE_KEY))
  const currentUser = ref<UserProfile | null>(null)
  const isLoggedIn = computed(() => Boolean(currentUser.value && token.value))
  const isAdmin = computed(() => currentUser.value?.role === 'admin')

  function setToken(value: string | null) {
    token.value = value
    if (value) {
      localStorage.setItem(STORAGE_KEY, value)
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  function clearAuth() {
    setToken(null)
    currentUser.value = null
  }

  async function loadProfile() {
    if (!token.value) {
      return null
    }

    const res = await fetch(`${API_BASE}/users/me`, {
      headers: { Authorization: `Bearer ${token.value}` },
    })

    if (!res.ok) {
      clearAuth()
      return null
    }

    const profile = await parseJsonResponse(res)
    currentUser.value = profile
    return profile
  }

  async function login(email: string, password: string) {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const payload = await parseJsonResponse(res)

    if (!res.ok) {
      throw new Error(payload?.error || payload?.message || 'Login failed')
    }

    const sessionToken = payload?.session?.access_token

    if (!sessionToken) {
      throw new Error('Authentication token was not returned')
    }

    setToken(sessionToken)
    currentUser.value = payload.user

    if (!currentUser.value) {
      await loadProfile()
    }

    return currentUser.value
  }

  async function register(fullName: string, email: string, password: string) {
    const res = await fetch(`${API_BASE}/users/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fullName, email, password }),
    })

    const payload = await parseJsonResponse(res)

    if (!res.ok) {
      throw new Error(payload?.error || payload?.message || 'Registration failed')
    }

    const sessionToken = payload?.session?.access_token

    if (!sessionToken) {
      throw new Error('Authentication token was not returned')
    }

    setToken(sessionToken)
    currentUser.value = payload.user

    return currentUser.value
  }

  async function requestPasswordReset(email: string, redirectTo: string) {
    const res = await fetch(`${API_BASE}/users/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, redirectTo }),
    })

    const payload = await parseJsonResponse(res)

    if (!res.ok) {
      throw new Error(payload?.error || payload?.message || 'Unable to send password reset email')
    }

    return payload
  }

  async function resetPassword(password: string, recoveryToken: string) {
    const res = await fetch(`${API_BASE}/users/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${recoveryToken}`,
      },
      body: JSON.stringify({ password }),
    })

    const payload = await parseJsonResponse(res)

    if (!res.ok) {
      throw new Error(payload?.error || payload?.message || 'Unable to update password')
    }

    clearAuth()
    return payload
  }

  function logout() {
    clearAuth()
  }

  function updateProfile(payload: Partial<UserProfile>) {
    if (!currentUser.value) {
      return
    }

    currentUser.value = { ...currentUser.value, ...payload }
  }

  return {
    token,
    currentUser,
    isLoggedIn,
    isAdmin,
    login,
    register,
    requestPasswordReset,
    resetPassword,
    logout,
    loadProfile,
    updateProfile,
  }
})
