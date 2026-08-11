//src/features/auth/providers/auth-provider.tsx
// Estado global y ciclo de vida de la sesion

'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { AuthContext } from '@/features/auth/context/auth-context'
import {
  clearStoredAuthenticatedUser,
  getStoredAuthenticatedUser,
  storeAuthenticatedUser,
} from '@/features/auth/helpers/auth-session-storage'
import type {
  AuthenticatedUser,
  LoginResponse,
} from '@/features/auth/types/auth.types'
import {
  clearAccessToken,
  setAccessToken,
  subscribeToAccessToken,
} from '@/shared/api/access-token-storage'
import { refreshAccessToken } from '@/shared/api/refresh-access-token'

const SIGN_IN_PATH = '/sign-in'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const router = useRouter()

  /** Guarda el token y lo prepara para las solicitudes privadas */
  function saveToken(nextToken: string) {
    setAccessToken(nextToken)
    setToken(nextToken)
  }

  /** Elimina todos los datos locales de la sesion */
  function clearSession() {
    clearAccessToken()
    clearStoredAuthenticatedUser()
    setToken(null)
    setUser(null)
  }

  /** Inicia la sesion despues de un login correcto */
  function setSession({ accessToken, usuario }: LoginResponse) {
    saveToken(accessToken)
    storeAuthenticatedUser(usuario)
    setUser(usuario)
  }

  /** Cierra sesion y retorna al formulario de acceso */
  function logout() {
    clearSession()
    router.replace(SIGN_IN_PATH)
  }

  useEffect(() => {
    let isActive = true

    const unsubscribe = subscribeToAccessToken((nextToken) => {
      setToken(nextToken)

      if (!nextToken) {
        clearStoredAuthenticatedUser()
        setUser(null)
      }
    })

    async function initAuth() {
      const storedUser = getStoredAuthenticatedUser()

      if (!storedUser) {
        clearSession()

        if (isActive) {
          setIsInitialized(true)
        }

        return
      }

      // Verifica la cookie de refresh antes de restaurar la sesion
      try {
        await refreshAccessToken()

        if (isActive) {
          setUser(storedUser)
        }
      } catch {
        if (isActive) {
          clearSession()
        }
      } finally {
        if (isActive) {
          setIsInitialized(true)
        }
      }
    }

    void initAuth()

    return () => {
      isActive = false
      unsubscribe()
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: token !== null,
        isInitialized,
        setSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
