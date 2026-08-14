import axios from 'axios'

type ProblemDetails = {
  detail?: string | string[]
  message?: string | string[]
  title?: string
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (!axios.isAxiosError<ProblemDetails>(error)) {
    return error instanceof Error ? error.message : fallback
  }

  const problem = error.response?.data
  const detail = problem?.detail ?? problem?.message

  if (Array.isArray(detail)) return detail.join('. ')
  if (detail) return detail

  return problem?.title ?? fallback
}
