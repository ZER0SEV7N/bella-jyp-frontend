'use client'

import { AppHeader, AppSidebar } from '@/shared/layouts'
import type { SidebarNavItem } from '@/shared/types/sidebar'

type AppShellProps = {
  children: React.ReactNode
  homeUrl: string
  items: SidebarNavItem[]
  onLogout: () => void
  profileUrl: string
  roleLabel: string
}

/** Compone la navegacion visual configurada por una ruta. */
export function AppShell({
  children,
  homeUrl,
  items,
  onLogout,
  profileUrl,
  roleLabel,
}: AppShellProps) {
  return (
    <AppSidebar homeUrl={homeUrl} items={items} onLogout={onLogout}>
      <AppHeader
        items={items}
        profileUrl={profileUrl}
        roleLabel={roleLabel}
      />
      {children}
    </AppSidebar>
  )
}
