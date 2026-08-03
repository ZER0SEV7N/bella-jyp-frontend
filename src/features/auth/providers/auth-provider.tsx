'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/features/auth/context/auth-context'
import {
  clearStoredAuthenticatedUser,
  getStoredAuthenticatedUser,
  storeAuthenticatedUser,
} from '@/features/auth/helpers/auth-session-storage'
import type { AuthenticatedUser } from '@/features/auth/types/auth.types'
import { UNAUTHORIZED_EVENT, clearAccessToken } from '@/shared/api'

const SIGN_IN_PATH = '/sign-in'

// Comparte el usuario autenticado y responde al vencimiento del JWT.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Inicializa la sesion desde sessionStorage cuando el provider se monta.
  const [user, setUser] = useState<AuthenticatedUser | null>(
    getStoredAuthenticatedUser,
  )
  const router = useRouter()

  const logout = useCallback(() => {
    clearAccessToken()
    clearStoredAuthenticatedUser()
    setUser(null)
    router.replace(SIGN_IN_PATH)
  }, [router])

  const setAuthenticatedUser = useCallback((nextUser: AuthenticatedUser) => {
    storeAuthenticatedUser(nextUser)
    setUser(nextUser)
  }, [])

  useEffect(() => {
    // El cliente HTTP emite este evento si el JWT recibe una respuesta 401.
    window.addEventListener(UNAUTHORIZED_EVENT, logout)

    return () => window.removeEventListener(UNAUTHORIZED_EVENT, logout)
  }, [logout])

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: user !== null,
      setAuthenticatedUser,
      logout,
    }),
    [logout, setAuthenticatedUser, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
