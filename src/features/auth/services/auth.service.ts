//src/features/auth/services/auth.service.ts
// Solicitudes HTTP propias de autenticacion

import type { LoginDTO, SolicitudRecuperacionDTO } from '@jyp/shared-contracts'

import type {
  ApiSuccessResponse,
  LoginResponse,
  PasswordRecoveryResponse,
} from '@/features/auth/types/auth.types'
import { apiClient } from '@/shared/api'

// Estas rutas no requieren un access token
const publicRequestConfig = { isPublic: true }

/** Inicia sesion y devuelve el token junto al usuario */
async function login(credentials: LoginDTO) {
  const { data: response } = await apiClient.post<ApiSuccessResponse<LoginResponse>>(
    '/auth/login',
    credentials,
    publicRequestConfig,
  )

  return response.data
}

/** Solicita las instrucciones para recuperar la contraseña */
async function requestPasswordRecovery(credentials: SolicitudRecuperacionDTO) {
  const { data: response } = await apiClient.post<
    ApiSuccessResponse<PasswordRecoveryResponse>
  >('/auth/recuperar-password', credentials, publicRequestConfig)

  return response.data
}

/** Renueva el access token usando la cookie httpOnly del backend */
async function refreshAccessToken() {
  const { data: response } = await apiClient.post<
    ApiSuccessResponse<Pick<LoginResponse, 'accessToken'>>
  >('/auth/refresh', undefined, publicRequestConfig)

  return response.data.accessToken
}

export const authService = {
  login,
  requestPasswordRecovery,
  refreshAccessToken,
}
