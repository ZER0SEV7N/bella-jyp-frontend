import { clearAccessToken, setAccessToken } from './access-token-storage'
import { httpClient } from './http-client'

type RefreshResponse = {
  data: {
    accessToken: string
  }
}

let refreshRequest: Promise<string> | null = null

/** Renueva el token compartiendo una sola solicitud entre llamadas concurrentes. */
export function refreshAccessToken() {
  if (!refreshRequest) {
    // El backend valida la cookie httpOnly porque JavaScript no puede leerla
    refreshRequest = httpClient
      .post<RefreshResponse>('/auth/refresh')
      .then(({ data }) => {
        const accessToken = data.data.accessToken
        setAccessToken(accessToken)
        return accessToken
      })
      .catch((error: unknown) => {
        clearAccessToken()
        throw error
      })
      .finally(() => {
        refreshRequest = null
      })
  }

  return refreshRequest
}
