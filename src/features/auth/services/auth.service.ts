//src/features/auth/services/auth.service.ts
// Solicitudes HTTP propias de autenticacion

import type { LoginDTO, SolicitudRecuperacionDTO } from '@jyp/shared-contracts'

import type {
  ApiSuccessResponse,
  LoginResponse,
  PasswordRecoveryResponse,
} from '@/features/auth/types/auth.types'
import { httpClient } from '@/shared/api'

/** Inicia sesion y devuelve el token junto al usuario */
async function login(credentials: LoginDTO) {
  const { data: response } = await httpClient.post<
    ApiSuccessResponse<LoginResponse>
  >('/auth/login', credentials)

  return response.data
}

/** Solicita las instrucciones para recuperar la contraseña */
async function requestPasswordRecovery(credentials: SolicitudRecuperacionDTO) {
  const { data: response } = await httpClient.post<
    ApiSuccessResponse<PasswordRecoveryResponse>
  >('/auth/recuperar-password', credentials)

  return response.data
}

export const authService = {
  login,
  requestPasswordRecovery,
}
