import { beforeEach, describe, expect, it, vi } from 'vitest'

import { authService } from '../auth.service'

const mocks = vi.hoisted(() => ({
  clearAccessToken: vi.fn(),
  post: vi.fn(),
  setAccessToken: vi.fn(),
}))

vi.mock('@/shared/api', () => ({
  apiClient: { post: mocks.post },
  clearAccessToken: mocks.clearAccessToken,
  setAccessToken: mocks.setAccessToken,
}))

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('inicia sesion y guarda el JWT recibido', async () => {
    const response = {
      accessToken: 'jwt-access-token',
      usuario: { id: 'user-1', rol: 'CONTADOR' },
    }
    mocks.post.mockResolvedValue({ data: response })

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
      {
        skipAuth: true,
        skipUnauthorizedHandler: true,
      },
    )
    expect(mocks.setAccessToken).toHaveBeenCalledWith('jwt-access-token')
  })

  it('envia la solicitud de recuperacion como ruta publica', async () => {
    mocks.post.mockResolvedValue({ data: { message: 'Solicitud enviada' } })

    await authService.requestPasswordRecovery({ nro_documento: '12345678' })

    expect(mocks.post).toHaveBeenCalledWith(
      '/auth/recuperar-password',
      { nro_documento: '12345678' },
      {
        skipAuth: true,
        skipUnauthorizedHandler: true,
      },
    )
  })

  it('elimina el JWT al cerrar sesion local', () => {
    authService.logout()

    expect(mocks.clearAccessToken).toHaveBeenCalledOnce()
  })
})
