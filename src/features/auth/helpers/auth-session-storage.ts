import type { AuthenticatedUser } from '@/features/auth/types/auth.types'

const AUTH_USER_KEY = 'jyp_authenticated_user'

/** Lee el usuario guardado para mantener la sesion durante la pestaña actual. */
export function getStoredAuthenticatedUser() {
  if (typeof window === 'undefined') return null

  const storedUser = window.sessionStorage.getItem(AUTH_USER_KEY)
  if (!storedUser) return null

  try {
    return JSON.parse(storedUser) as AuthenticatedUser
  } catch {
    window.sessionStorage.removeItem(AUTH_USER_KEY)
    return null
  }
}

/** Guarda los datos no sensibles del usuario autenticado en sessionStorage. */
export function storeAuthenticatedUser(user: AuthenticatedUser) {
  window.sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(user))
}

/** Elimina los datos locales del usuario al cerrar o vencer la sesion. */
export function clearStoredAuthenticatedUser() {
  window.sessionStorage.removeItem(AUTH_USER_KEY)
}
