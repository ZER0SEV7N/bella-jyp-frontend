import {
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar'
import Link from 'next/link'
import { SidebarNavItem } from '@/shared/types/sidebar'
import { cn } from '@/shared/lib/utils'

type props = {
  item: Extract<SidebarNavItem, { type: 'link' }>
  pathname: string
}
export default function NavLink({ item, pathname }: props) {
  const isActive = pathname === item.url
  return (
    <SidebarMenuItem className="h-10">
      <SidebarMenuButton
        isActive={isActive}
        className={cn(
          'rounded-none h-10 pl-5 hover:text-white! hover:bg-[#09267B]!',
          'border-l-3 border-transparent',
          isActive && 'border-white! bg-[#09267B]!',
        )}
        render={
          <Link href={item.url}>
            {item.icon && (
              <item.icon className={cn('text-sm', isActive && 'text-white')} />
            )}
            <span
              className={cn('text-sm', isActive && 'text-white font-normal')}
            >
              {item.title}
            </span>
          </Link>
        }
      />
    </SidebarMenuItem>
  )
}
