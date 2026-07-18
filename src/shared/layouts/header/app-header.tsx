'use client'
import { usePathname } from 'next/navigation'
import { SidebarTrigger } from '@/shared/components/ui/sidebar'
import BreadcrumbTitle from './breadcrumb-title'
import { Calendar } from 'lucide-react'
import { useCurrentPeriod } from '@/shared/hooks/use-current-period'
import { Separator } from '@/shared/components/ui/separator'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/shared/components/ui/avatar'
import Link from 'next/link'

export default function AppHeader() {
  const pathname = usePathname()
  const period = useCurrentPeriod()
  return (
    <header className="w-full border-b border-border h-14 flex items-center px-2 justify-between">
      <div className="flex gap-4 items-center">
        <SidebarTrigger variant={'ghost'} />
        <BreadcrumbTitle pathname={pathname} />
      </div>
      <div className="flex gap-3 items-center">
        <div className="bg-accent px-4 rounded-4xl text-sm flex items-center gap-1 h-10">
          <Calendar size={14} />
          {period}
        </div>
        <Separator orientation="vertical" className={'h-10 self-center!'} />
        <Link
          href={'/contador/perfil'}
          className="flex gap-2 items-center hover:bg-accent p-1 px-2 m-0 rounded-md"
        >
          <div className="flex flex-col text-end">
            <span className="text-sm">Rodrigo Castillo</span>
            <span className="text-xs text-muted-foreground">Contador</span>
          </div>
          <Avatar size="lg">
            <AvatarImage src={'https://github.com/shadcn.png'}></AvatarImage>
            <AvatarFallback>RC</AvatarFallback>
          </Avatar>
        </Link>
      </div>
    </header>
  )
}
