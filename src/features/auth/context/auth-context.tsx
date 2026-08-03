'use client'

import { createContext, useContext } from 'react'

import type { AuthContextValue } from '@/features/auth/types/auth-context.types'

export const AuthContext = createContext<AuthContextValue | null>(null)

// Expone el estado de sesion. Debe usarse dentro de AuthProvider.
export function useAuthContext() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }

  return context
}
