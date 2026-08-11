import { afterEach, describe, expect, it, vi } from 'vitest'

import {
  clearAccessToken,
  setAccessToken,
  subscribeToAccessToken,
} from '../access-token-storage'

afterEach(() => {
  clearAccessToken()
})

describe('accessTokenStorage', () => {
  it('notifica cuando el token cambia o se elimina', () => {
    const listener = vi.fn()
    const unsubscribe = subscribeToAccessToken(listener)

    setAccessToken('access-token-nuevo')
    clearAccessToken()

    expect(listener).toHaveBeenNthCalledWith(1, 'access-token-nuevo')
    expect(listener).toHaveBeenNthCalledWith(2, null)

    unsubscribe()
    setAccessToken('token-no-observado')

    expect(listener).toHaveBeenCalledTimes(2)
  })
})
