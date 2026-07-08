'use client'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import BreadcrumbTitle from './breadcrumb-title'
import { Calendar } from 'lucide-react'
import { useCurrentPeriod } from '@/shared/hooks/use-current-period'

export default function AppHeader() {
  const pathname = usePathname()
  const period = useCurrentPeriod()
  return (
    <header className="w-full border-b border-border h-12 flex items-center px-2 justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger variant={'ghost'} />
        <BreadcrumbTitle pathname={pathname} />
      </div>
      <div className="flex gap-3">
        <div className="bg-accent py-1 px-4 rounded-4xl text-sm flex items-center gap-1">
          <Calendar size={14} />
          {period}
        </div>
      </div>
    </header>
  )
}
