import type { ProvisionarUsuarioDTO } from '@jyp/shared-contracts'

// Describe al usuario que devuelve la API despues de un login correcto.
export type AuthenticatedUser = {
  id: string | number
  nro_documento?: string
  rol: ProvisionarUsuarioDTO['rol']
}

// Describe la respuesta de la API al iniciar sesion.
export type LoginResponse = {
  accessToken: string
  usuario: AuthenticatedUser
}

// Describe el mensaje que devuelve la solicitud de recuperacion.
export type PasswordRecoveryResponse = {
  message: string
}

// Representa el formato comun con que Nest devuelve respuestas exitosas.
export type ApiSuccessResponse<T> = {
  statusCode: number
  data: T
  meta: {
    message: string
    path: string
    timestamp: string
  }
}
