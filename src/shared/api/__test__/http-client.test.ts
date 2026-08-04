import { type InternalAxiosRequestConfig } from 'axios'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { apiClient, setApiAccessToken } from '../http-client'

afterEach(() => {
  setApiAccessToken(null)
})

describe('apiClient', () => {
  it('envia el JWT configurado en una peticion privada', async () => {
    setApiAccessToken('jwt-de-prueba')
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

  it('omite el JWT configurado en una peticion publica', async () => {
    setApiAccessToken('jwt-de-prueba')
    const adapter = vi.fn().mockResolvedValue({
      config: {} as InternalAxiosRequestConfig,
      data: null,
      headers: {},
      status: 200,
      statusText: 'OK',
    })

    await apiClient.get('/recurso-publico', { adapter, isPublic: true })

    expect(adapter.mock.calls[0][0].headers.Authorization).toBeUndefined()
  })
})
