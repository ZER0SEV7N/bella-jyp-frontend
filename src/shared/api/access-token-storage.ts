const ACCESS_TOKEN_KEY = 'jyp_access_token'
type AccessTokenListener = (token: string | null) => void

const listeners = new Set<AccessTokenListener>()

// Indica si el codigo se ejecuta en el navegador
function isBrowser() {
  return typeof window !== 'undefined'
}

// Guarda el JWT de acceso durante la sesion actual
export function setAccessToken(token: string) {
  if (isBrowser()) {
    window.sessionStorage.setItem(ACCESS_TOKEN_KEY, token)
  }

  listeners.forEach((listener) => listener(token))
}

// Devuelve el JWT actual o null durante SSR
export function getAccessToken() {
  return isBrowser() ? window.sessionStorage.getItem(ACCESS_TOKEN_KEY) : null
}

// Elimina el JWT cuando termina o vence la sesion
export function clearAccessToken() {
  if (isBrowser()) {
    window.sessionStorage.removeItem(ACCESS_TOKEN_KEY)
  }

  listeners.forEach((listener) => listener(null))
}

// Permite sincronizar el estado de React con cambios hechos por los interceptores
export function subscribeToAccessToken(listener: AccessTokenListener) {
  listeners.add(listener)

  return () => {
    listeners.delete(listener)
  }
}
