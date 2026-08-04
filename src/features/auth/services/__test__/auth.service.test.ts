import { beforeEach, describe, expect, it, vi } from 'vitest'

import { authService } from '../auth.service'

const mocks = vi.hoisted(() => ({
  post: vi.fn(),
}))

vi.mock('@/shared/api', () => ({
  apiClient: { post: mocks.post },
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inicia sesion y devuelve los datos recibidos', async () => {
    const response = {
      accessToken: 'jwt-access-token',
      usuario: { id: 'user-1', rol: 'CONTADOR' },
    }
    mocks.post.mockResolvedValue({
      data: {
        statusCode: 200,
        data: response,
        meta: {
          message: 'Operacion exitosa',
          path: '/api/auth/login',
          timestamp: '2026-08-03T00:00:00.000Z',
        },
      },
    })

    await expect(
      authService.login({
        tipo_documento: 'DNI',
        nro_documento: '12345678',
        password: 'password-seguro',
      }),
    ).resolves.toEqual(response)

    expect(mocks.post).toHaveBeenCalledWith(
      '/auth/login',
      expect.any(Object),
      { isPublic: true },
    )
  })

  it('envia la solicitud de recuperacion como ruta publica', async () => {
    mocks.post.mockResolvedValue({
      data: {
        statusCode: 200,
        data: { message: 'Solicitud enviada' },
        meta: {
          message: 'Operacion exitosa',
          path: '/api/auth/recuperar-password',
          timestamp: '2026-08-03T00:00:00.000Z',
        },
      },
    })

    await authService.requestPasswordRecovery({ nro_documento: '12345678' })

    expect(mocks.post).toHaveBeenCalledWith(
      '/auth/recuperar-password',
      { nro_documento: '12345678' },
      { isPublic: true },
    )
  })
})
