import axios, { AxiosHeaders, type AxiosError } from 'axios'

import { getAccessToken } from './access-token-storage'
import { httpClient } from './http-client'
import { refreshAccessToken } from './refresh-access-token'

type RetryableRequest = NonNullable<AxiosError['config']> & {
  _retry?: boolean
}

/** Cliente para endpoints que requieren un access token. */
export const protectedHttpClient = axios.create({
  baseURL: httpClient.defaults.baseURL,
  withCredentials: true,
  headers: { Accept: 'application/json' },
})

// Agrega el access token mas reciente a cada solicitud privada
protectedHttpClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.set('Authorization', `Bearer ${accessToken}`)
  }

  return config
})

// Renueva el token una vez y reintenta la solicitud que recibio 401
protectedHttpClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const request = error.config as RetryableRequest | undefined

    if (error.response?.status !== 401 || !request || request._retry) {
      return Promise.reject(error)
    }

    request._retry = true

    try {
      const accessToken = await refreshAccessToken()
      request.headers = AxiosHeaders.from(request.headers)
      request.headers.set('Authorization', `Bearer ${accessToken}`)

      return protectedHttpClient(request)
    } catch (refreshError) {
      return Promise.reject(refreshError)
    }
  },
)
