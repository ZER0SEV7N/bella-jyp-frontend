import type { LoginDTO, SolicitudRecuperacionDTO } from '@jyp/shared-contracts'

import type {
  LoginResponse,
  PasswordRecoveryResponse,
} from '@/features/auth/types/auth.types'
import { apiClient, clearAccessToken, setAccessToken } from '@/shared/api'

// Inicia sesion, guarda el JWT recibido y devuelve los datos del usuario.
async function login(credentials: LoginDTO) {
  const { data } = await apiClient.post<LoginResponse>(
    '/auth/login',
    credentials,
    {
      // Login es publico y un 401 significa credenciales invalidas, no sesion expirada.
      skipAuth: true,
      skipUnauthorizedHandler: true,
    },
  )

  setAccessToken(data.accessToken)

  return data
}

// Envia la solicitud publica para recuperar la contraseña del usuario.
async function requestPasswordRecovery(credentials: SolicitudRecuperacionDTO) {
  const { data } = await apiClient.post<PasswordRecoveryResponse>(
    '/auth/recuperar-password',
    credentials,
    {
      // Esta ruta es publica y no debe disparar el manejo global de un 401.
      skipAuth: true,
      skipUnauthorizedHandler: true,
    },
  )

  return data
}

// Cierra la sesion local eliminando el JWT guardado en sessionStorage.
function logout() {
  clearAccessToken()
}

// Servicio que deben usar los componentes de auth para comunicar con la API.
export const authService = {
  login,
  logout,
  requestPasswordRecovery,
}
