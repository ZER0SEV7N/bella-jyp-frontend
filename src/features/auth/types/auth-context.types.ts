import type { AuthenticatedUser } from '@/features/auth/types/auth.types'

export type AuthContextValue = {
  user: AuthenticatedUser | null
  isAuthenticated: boolean
  setAuthenticatedUser: (user: AuthenticatedUser) => void
  logout: () => void
}
