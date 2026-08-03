import axios, { type AxiosError, type InternalAxiosRequestConfig } from 'axios'

// Clave usada en sessionStorage para guardar el JWT solo durante esta sesion.
const ACCESS_TOKEN_KEY = 'jyp_access_token'
// Evento que escucha la app cuando la API rechaza un JWT por 401.
const UNAUTHORIZED_EVENT = 'jyp:unauthorized'

declare module 'axios' {
  export interface AxiosRequestConfig {
    // Omite el JWT para rutas publicas, como login.
    skipAuth?: boolean
    // Evita emitir el evento global de sesion expirada para esta peticion.
    skipUnauthorizedHandler?: boolean
  }
}

// Indica si el codigo se ejecuta en el navegador y puede usar sessionStorage.
function isBrowser() {
  return typeof window !== 'undefined'
}

// Guarda el JWT de acceso para las siguientes peticiones de esta sesion.
export function setAccessToken(token: string) {
  if (isBrowser()) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
  }
}

// Obtiene el JWT actual. En SSR devuelve null porque no existe sessionStorage.
export function getAccessToken() {
  return isBrowser() ? window.sessionStorage.getItem(ACCESS_TOKEN_KEY) : null
}

// Elimina el JWT al cerrar sesion o cuando deja de ser valido.
export function clearAccessToken() {
  if (isBrowser()) {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  }
}

// Agrega el header Authorization a cada peticion privada del cliente.
function addAuthorizationHeader(config: InternalAxiosRequestConfig) {
  const accessToken = getAccessToken()

  if (accessToken && !config.skipAuth) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
}

/**
 * Cliente HTTP compartido para todas las features
 *
 * Usa NEXT_PUBLIC_API_URL como URL base. Si no existe, usa el backend local.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
  },
})

// Antes de enviar la peticion, inserta el JWT almacenado si la ruta es privada.
apiClient.interceptors.request.use(addAuthorizationHeader)

// Si la API responde 401, elimina el JWT y notifica a la app para cerrar sesion.
apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const config = error.config

    if (error.response?.status === 401 && !config?.skipUnauthorizedHandler) {
      clearAccessToken()

      // Las features pueden escuchar este evento y redirigir al login.
      if (isBrowser()) {
        window.dispatchEvent(new Event(UNAUTHORIZED_EVENT))
      }
    }

    return Promise.reject(error)
  },
)

export { ACCESS_TOKEN_KEY, UNAUTHORIZED_EVENT }
