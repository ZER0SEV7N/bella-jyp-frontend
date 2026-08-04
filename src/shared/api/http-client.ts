//src/shared/api/http-client.ts
// Cliente Axios compartido por todas las features

import axios, { type InternalAxiosRequestConfig } from 'axios'

declare module 'axios' {
  export interface AxiosRequestConfig {
    // Las rutas publicas no envian el header Authorization
    isPublic?: boolean
  }
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000/api',
  withCredentials: true,
  headers: { Accept: 'application/json' },
})

/** Configura el JWT que Axios enviara en las solicitudes privadas */
export function setApiAccessToken(token: string | null) {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    return
  }

  delete apiClient.defaults.headers.common.Authorization
}

// Elimina el header por defecto cuando una ruta se declara publica
function removeTokenFromPublicRequest(config: InternalAxiosRequestConfig) {
  if (config.isPublic) {
    delete config.headers.Authorization
  }

  return config
}

apiClient.interceptors.request.use(removeTokenFromPublicRequest)
