'use client'

import type { ReactNode } from 'react'

import { AuthRouteGuard } from '@/features/auth/components/auth-route-guard'
import { useAuthContext } from '@/features/auth/context/auth-context'
import { AppShell } from '@/features/navigation/components/app-shell'
import { rrhhSidebar } from '@/features/navigation/data/sidebar'

export default function RrhhLayout({ children }: { children: ReactNode }) {
  const { logout } = useAuthContext()

  return (
    <AuthRouteGuard allowedRoles={['RRHH']}>
      <AppShell
        homeUrl="/rrhh/dashboard"
        items={rrhhSidebar}
        onLogout={logout}
        profileUrl="/rrhh/perfil"
        roleLabel="Recursos Humanos"
      >
        {children}
      </AppShell>
    </AuthRouteGuard>
  )
}
