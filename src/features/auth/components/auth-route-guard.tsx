'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

import { useAuthContext } from '@/features/auth/context/auth-context'
import type { AuthenticatedUser } from '@/features/auth/types/auth.types'

type AuthRouteGuardProps = {
  allowedRoles: AuthenticatedUser['rol'][]
  children: React.ReactNode
}

// Impide mostrar una ruta privada hasta confirmar la sesion y el rol permitido.
export function AuthRouteGuard({ allowedRoles, children }: AuthRouteGuardProps) {
  const { user, isAuthenticated, isInitialized } = useAuthContext()
  const router = useRouter()
  const hasAllowedRole = user ? allowedRoles.includes(user.rol) : false

  useEffect(() => {
    if (!isInitialized) {
      return
    }

    if (!isAuthenticated) {
      router.replace('/sign-in')
      return
    }

    if (!hasAllowedRole) {
      router.replace('/unauthorized')
    }
  }, [hasAllowedRole, isAuthenticated, isInitialized, router])

  if (!isInitialized || !isAuthenticated || !hasAllowedRole) {
    return null
  }

  return children
}
