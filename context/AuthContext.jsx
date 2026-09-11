'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { createClient } from '../lib/supabase/client'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const supabase = useMemo(() => createClient(), [])
  const [user, setUser] = useState(null)      // auth.users row
  const [profile, setProfile] = useState(null) // profiles row (has role)
  const [loading, setLoading] = useState(true)

  const loadProfile = async (userId) => {
    if (!userId) return null
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single()
    if (error) {
      console.error('Failed to load profile:', error.message)
      return null
    }
    return data
  }

  useEffect(() => {
    let active = true

    // Initial session check — reads the httpOnly cookie set by middleware.
    const bootstrap = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!active) return
      if (session?.user) {
        setUser(session.user)
        const p = await loadProfile(session.user.id)
        if (active) setProfile(p)
      }
      if (active) setLoading(false)
    }
    bootstrap()

    // Keep state in sync across tabs and after sign-in/out.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!active) return
        if (session?.user) {
          setUser(session.user)
          const p = await loadProfile(session.user.id)
          if (active) setProfile(p)
        } else {
          setUser(null)
          setProfile(null)
        }
      }
    )

    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [supabase])

  /**
   * Email + password signup. Role is passed through user metadata so the
   * Postgres trigger (handle_new_user) writes it into the profiles row.
   */
  const signUp = async ({ email, password, fullName, role = 'student' }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    })
    if (error) throw error
    return data
  }

  /** Email + password signin. Returns { user, profile } so callers can route by role. */
  const signIn = async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    const p = await loadProfile(data.user.id)
    setProfile(p)
    return { user: data.user, profile: p }
  }

  /** provider: 'google' | 'apple'. Redirects away from the page. */
  const signInWithOAuth = async (provider, nextPath = '/portal') => {
    const origin = typeof window !== 'undefined' ? window.location.origin : ''
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
      },
    })
    if (error) throw error
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
    setProfile(null)
  }

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signUp, signIn, signInWithOAuth, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider')
  return ctx
}