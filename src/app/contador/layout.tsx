import { ReactNode } from 'react'
import { AppSidebar, AppHeader } from '@/shared/layouts'

export default function ContadorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AppSidebar>
      <AppHeader />
      {children}
    </AppSidebar>
  )
}
