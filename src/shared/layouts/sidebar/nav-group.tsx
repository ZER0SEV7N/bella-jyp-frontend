'use client'

import { SidebarNavItem } from '@/shared/types/sidebar'
import {
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarMenuButton,
} from '@/shared/components/ui/sidebar'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/shared/components/ui/collapsible'
import { cn } from '@/shared/lib/utils'
import Link from 'next/link'

type props = {
  item: Extract<SidebarNavItem, { type: 'group' }>
  pathname: string
  open: boolean
  onOpenChange: (open: boolean) => void
}
export default function NavGroup({
  item,
  pathname,
  open,
  onOpenChange,
}: props) {
  const isGroupActive = item.items.some((subItem) => pathname === subItem.url)

  return (
    <Collapsible
      open={open}
      onOpenChange={onOpenChange}
      className="group/collapsible"
      render={
        <SidebarMenuItem>
          <CollapsibleTrigger
            render={
              <SidebarMenuButton
                tooltip={item.title}
                className={cn(
                  'h-10 cursor-pointer rounded-none pl-5 transition-all duration-200 text-white',
                  'hover:bg-[#09267B]! hover:text-white!',
                  'border-l-3 border-transparent',
                  isGroupActive
                    ? open
                      ? 'bg-[#143593] border-white'
                      : 'bg-[#09267B] border-white'
                    : open
                      ? 'bg-[#09267B] border-white'
                      : 'bg-transparent',
                )}
              >
                <item.icon />
                <span>{item.title}</span>
              </SidebarMenuButton>
            }
          />
          <CollapsibleContent
            className={cn(
              'overflow-hidden bg-[#143593] data-open:animate-collapsible-down data-closed:animate-collapsible-up',
            )}
          >
            <SidebarMenuSub className="m-0 gap-0 border-0 p-0">
              {item.items.map((subItem) => {
                const isSubItemActive = pathname === subItem.url

                return (
                  <SidebarMenuSubItem key={subItem.title}>
                    <SidebarMenuSubButton
                      isActive={isSubItemActive}
                      render={<Link href={subItem.url}>{subItem.title}</Link>}
                      className={cn(
                        'w-full rounded-none pl-12 text-white! hover:bg-[#09267B] hover:text-white',
                        'border-l-3 border-white transition-all duration-200',
                        'active:bg-[#09267B]!',
                        isSubItemActive && 'bg-[#09267B]!',
                      )}
                    />
                  </SidebarMenuSubItem>
                )
              })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      }
    />
  )
}
