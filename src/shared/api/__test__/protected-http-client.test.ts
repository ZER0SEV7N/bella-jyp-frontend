import {
  AxiosError,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { clearAccessToken, setAccessToken } from '../access-token-storage'

const mocks = vi.hoisted(() => ({
  refresh: vi.fn(),
}))

vi.mock('@/shared/api/http-client', () => ({
  httpClient: {
    defaults: { baseURL: 'http://localhost:3000/api' },
    post: mocks.refresh,
  },
}))

import { protectedHttpClient } from '../protected-http-client'

function successfulResponse(
  config: InternalAxiosRequestConfig,
): AxiosResponse<null> {
  return {
    config,
    data: null,
    headers: {},
    status: 200,
    statusText: 'OK',
  }
}

describe('protectedHttpClient', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearAccessToken()
  })

  afterEach(() => {
    clearAccessToken()
  })

  it('coloca el access token en el header Bearer', async () => {
    setAccessToken('access-token-actual')
    const adapter = vi.fn((config: InternalAxiosRequestConfig) =>
      Promise.resolve(successfulResponse(config)),
    )

    await protectedHttpClient.get('/privado', { adapter })

    expect(adapter.mock.calls[0][0].headers.Authorization).toBe(
      'Bearer access-token-actual',
    )
  })

  it('refresca el token tras un 401 y reintenta la solicitud original', async () => {
    setAccessToken('access-token-vencido')
    mocks.refresh.mockResolvedValue({
      data: { data: { accessToken: 'access-token-nuevo' } },
    })

    const adapter = vi
      .fn<(config: InternalAxiosRequestConfig) => Promise<AxiosResponse<null>>>()
      .mockImplementationOnce((config) =>
        Promise.reject(
          new AxiosError(
            'Unauthorized',
            AxiosError.ERR_BAD_REQUEST,
            config,
            undefined,
            {
              ...successfulResponse(config),
              status: 401,
              statusText: 'Unauthorized',
            },
          ),
        ),
      )
      .mockImplementationOnce((config) =>
        Promise.resolve(successfulResponse(config)),
      )

    await protectedHttpClient.get('/privado', { adapter })

    expect(mocks.refresh).toHaveBeenCalledOnce()
    expect(mocks.refresh).toHaveBeenCalledWith('/auth/refresh')
    expect(adapter).toHaveBeenCalledTimes(2)
    expect(adapter.mock.calls[1][0].headers.Authorization).toBe(
      'Bearer access-token-nuevo',
    )
    expect(window.sessionStorage.getItem('jyp_access_token')).toBe(
      'access-token-nuevo',
    )
  })

  it('comparte una sola renovacion entre solicitudes concurrentes', async () => {
    setAccessToken('access-token-vencido')
    mocks.refresh.mockResolvedValue({
      data: { data: { accessToken: 'access-token-nuevo' } },
    })

    const adapter = vi.fn((config: InternalAxiosRequestConfig) => {
      if (!config._retry) {
        return Promise.reject(
          new AxiosError(
            'Unauthorized',
            AxiosError.ERR_BAD_REQUEST,
            config,
            undefined,
            {
              ...successfulResponse(config),
              status: 401,
              statusText: 'Unauthorized',
            },
          ),
        )
      }

      return Promise.resolve(successfulResponse(config))
    })

    await Promise.all([
      protectedHttpClient.get('/privado-a', { adapter }),
      protectedHttpClient.get('/privado-b', { adapter }),
    ])

    expect(mocks.refresh).toHaveBeenCalledOnce()
    expect(adapter).toHaveBeenCalledTimes(4)
  })

  it('no vuelve a intentar una solicitud que ya fue reintentada', async () => {
    const adapter = vi.fn((config: InternalAxiosRequestConfig) =>
      Promise.reject(
        new AxiosError(
          'Unauthorized',
          AxiosError.ERR_BAD_REQUEST,
          config,
          undefined,
          {
            ...successfulResponse(config),
            status: 401,
            statusText: 'Unauthorized',
          },
        ),
      ),
    )

    await expect(
      protectedHttpClient.get('/privado', { adapter, _retry: true }),
    ).rejects.toThrow('Unauthorized')

    expect(mocks.refresh).not.toHaveBeenCalled()
    expect(adapter).toHaveBeenCalledOnce()
  })
})

declare module 'axios' {
  interface AxiosRequestConfig {
    _retry?: boolean
  }
}
