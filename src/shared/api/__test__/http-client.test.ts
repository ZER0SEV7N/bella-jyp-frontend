import { AxiosError, type InternalAxiosRequestConfig } from 'axios'
import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  UNAUTHORIZED_EVENT,
  apiClient,
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from '../http-client'

afterEach(() => {
  clearAccessToken()
  vi.restoreAllMocks()
})

describe('apiClient', () => {
  it('agrega el JWT a las peticiones privadas', async () => {
    setAccessToken('jwt-de-prueba')
    const adapter = vi.fn().mockResolvedValue({
      config: {} as InternalAxiosRequestConfig,
      data: null,
      headers: {},
      status: 200,
      statusText: 'OK',
    })

    await apiClient.get('/recurso-privado', { adapter })

    expect(adapter.mock.calls[0][0].headers.Authorization).toBe(
      'Bearer jwt-de-prueba',
    )
  })

  it('omite el JWT en una peticion publica', async () => {
    setAccessToken('jwt-de-prueba')
    const adapter = vi.fn().mockResolvedValue({
      config: {} as InternalAxiosRequestConfig,
      data: null,
      headers: {},
      status: 200,
      statusText: 'OK',
    })

    await apiClient.get('/recurso-publico', { adapter, skipAuth: true })

    expect(adapter.mock.calls[0][0].headers.Authorization).toBeUndefined()
  })

  it('limpia el JWT y notifica cuando una peticion privada recibe 401', async () => {
    const onUnauthorized = vi.fn()
    window.addEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
    setAccessToken('jwt-vencido')

    const adapter = (config: InternalAxiosRequestConfig) =>
      Promise.reject(
        new AxiosError(
          'Unauthorized',
          'ERR_BAD_REQUEST',
          config,
          undefined,
          {
            config,
            data: null,
            headers: {},
            status: 401,
            statusText: 'Unauthorized',
          },
        ),
      )

    await expect(apiClient.get('/recurso-privado', { adapter })).rejects.toThrow(
      'Unauthorized',
    )

    expect(getAccessToken()).toBeNull()
    expect(onUnauthorized).toHaveBeenCalledOnce()
    window.removeEventListener(UNAUTHORIZED_EVENT, onUnauthorized)
  })
})
