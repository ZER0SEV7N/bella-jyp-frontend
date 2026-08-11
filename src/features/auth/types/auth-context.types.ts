import type {
  AuthenticatedUser,
  LoginResponse,
} from '@/features/auth/types/auth.types'

export type AuthContextValue = {
  user: AuthenticatedUser | null
  token: string | null
  isAuthenticated: boolean
  isInitialized: boolean
  setSession: (session: LoginResponse) => void
  logout: () => void
}
