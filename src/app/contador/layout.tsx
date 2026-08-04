import { ReactNode } from 'react'
import { AppSidebar, AppHeader } from '@/shared/layouts'
import { AuthRouteGuard } from '@/features/auth/components/auth-route-guard'

export default function ContadorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthRouteGuard allowedRoles={['CONTADOR']}>
      <AppSidebar>
        <AppHeader />
        {children}
      </AppSidebar>
    </AuthRouteGuard>
  )
}
