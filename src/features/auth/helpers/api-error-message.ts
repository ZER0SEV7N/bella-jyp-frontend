import axios from 'axios'

type ApiErrorBody = {
  detail?: string
  message?: string
}

// Traduce el formato de error de la API a un texto seguro para la interfaz.
export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ApiErrorBody>(error)) {
    return fallback
  }

  const { detail, message } = error.response?.data ?? {}

  return detail ?? message ?? fallback
}
