'use client'

import { useMutation } from '@tanstack/react-query'

import { authService } from '@/features/auth/services/auth.service'

// Ejecuta la solicitud publica para recuperar la contraseña.
export function usePasswordRecoveryMutation() {
  return useMutation({ mutationFn: authService.requestPasswordRecovery })
}
