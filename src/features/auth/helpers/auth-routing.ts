import type { AuthenticatedUser } from '@/features/auth/types/auth.types'

const rolePaths: Partial<Record<AuthenticatedUser['rol'], string>> = {
  CONTADOR: '/contador/dashboard',
  RRHH: '/rrhh/dashboard',
}

// Devuelve el dashboard disponible para el rol o una pantalla segura sin acceso.
export function getRoleDashboardPath(role: AuthenticatedUser['rol']) {
  return rolePaths[role] ?? '/unauthorized'
}
