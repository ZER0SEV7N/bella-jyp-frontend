import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AuthTestProviders } from '../../__tests__/render-with-auth-providers'
import { useAuthContext } from '../../context/auth-context'
import { useLoginMutation } from '../use-login-mutation'

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
  replace: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: mocks.replace }),
}))

vi.mock('@/features/auth/services/auth.service', () => ({
  authService: { login: mocks.login },
}))

afterEach(() => {
  window.sessionStorage.clear()
  vi.clearAllMocks()
})

describe('useLoginMutation', () => {
  it('guarda el usuario en el contexto cuando el login responde correctamente', async () => {
    const usuario = { id: 'usuario-1', rol: 'CONTADOR' as const }
    mocks.login.mockResolvedValue({ accessToken: 'jwt', usuario })

    const { result } = renderHook(
      () => ({
        auth: useAuthContext(),
        loginMutation: useLoginMutation(),
      }),
      { wrapper: AuthTestProviders },
    )

    await act(async () => {
      await result.current.loginMutation.mutateAsync({
        tipo_documento: 'DNI',
        nro_documento: '12345678',
        password: 'password-seguro',
      })
    })

    expect(result.current.auth.user).toEqual(usuario)
    expect(result.current.auth.isAuthenticated).toBe(true)
  })
})
