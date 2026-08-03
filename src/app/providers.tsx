'use client'

import { AuthProvider } from '@/features/auth/providers/auth-provider'
import { QueryProvider } from '@/shared/providers/query-provider'

// Compone los providers globales que necesita la aplicacion.
export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  )
}
