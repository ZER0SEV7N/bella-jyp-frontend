'use client'

import { useMutation } from '@tanstack/react-query'

import { useAuthContext } from '@/features/auth/context/auth-context'
import { authService } from '@/features/auth/services/auth.service'

// Ejecuta login y guarda el usuario en el contexto cuando la API responde bien.
export function useLoginMutation() {
  const { setAuthenticatedUser } = useAuthContext()

  return useMutation({
    mutationFn: authService.login,
    onSuccess: ({ usuario }) => setAuthenticatedUser(usuario),
  })
}
