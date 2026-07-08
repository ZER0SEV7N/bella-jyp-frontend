import { ReactNode } from 'react'
import AppSidebar from '@/shared/layouts/sidebar/app-sidebar'

export default function ContadorLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <AppSidebar>{children}</AppSidebar>
}
