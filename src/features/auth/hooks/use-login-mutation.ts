'use client'

import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@/features/auth/context/auth-context'
import { authService } from '@/features/auth/services/auth.service'

// Ejecuta login e inicia la sesion cuando la API responde bien
export function useLoginMutation() {
  const { setSession } = useAuthContext()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: setSession,
  })
}
