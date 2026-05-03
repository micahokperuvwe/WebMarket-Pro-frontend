import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

type OAuthConfig = {
  supabaseUrl: string
  supabaseAnonKey: string
}

let cachedClient: SupabaseClient | null = null
let configPromise: Promise<OAuthConfig> | null = null

async function loadOAuthConfig() {
  if (import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY) {
    return {
      supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
      supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY,
    }
  }

  if (!configPromise) {
    configPromise = fetch(`${API_BASE}/users/oauth/config`)
      .then(async (response) => {
        const payload = await response.json().catch(() => null)

        if (!response.ok) {
          throw new Error(payload?.error || 'Google login is not configured on the server')
        }

        if (!payload?.supabaseUrl || !payload?.supabaseAnonKey) {
          throw new Error('Google login configuration is incomplete on the server')
        }

        return {
          supabaseUrl: String(payload.supabaseUrl),
          supabaseAnonKey: String(payload.supabaseAnonKey),
        }
      })
      .catch((error) => {
        configPromise = null
        throw error
      })
  }

  return configPromise
}

export async function getSupabaseBrowserClient() {
  if (cachedClient) {
    return cachedClient
  }

  const config = await loadOAuthConfig()
  cachedClient = createClient(config.supabaseUrl, config.supabaseAnonKey)
  return cachedClient
}
