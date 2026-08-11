'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'
import {
  Sidebar,
  SidebarProvider,
  SidebarInset,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/shared/components/ui/sidebar'
import NavLink from './nav-link'
import NavGroup from './nav-group'
import { useSidebarGroupState } from '@/shared/hooks/use-sidebar-group'
import type { SidebarNavItem } from '@/shared/types/sidebar'

export default function AppSidebar({
  children,
  homeUrl,
  items,
  onLogout,
}: {
  children: React.ReactNode
  homeUrl: string
  items: SidebarNavItem[]
  onLogout: () => void
}) {
  const pathname = usePathname() // Variable que obtiene la ruta
  const { openGroup, setOpenGroup } = useSidebarGroupState(items, pathname)

  return (
    <>
      <SidebarProvider>
        <Sidebar className="**:data-[slot=sidebar-inner]:bg-primary **:data-[slot=sidebar-inner]:text-white!">
          <SidebarHeader className="border-b border-blue-800">
            <Link
              href={homeUrl}
              className="flex flex-row justify-center items-center gap-3 w-full my-5"
            >
              <Image src={'/jyp.svg'} alt="logo-jyp" width={95} height={65} />
              <div className="flex flex-col">
                <span className="text-lg uppercase text-white font-bold">
                  BellaSoft
                </span>
                <span className="text-xs text-slate-200 font-medium">
                  Sistema de Planillas
                </span>
              </div>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup className="p-0 m-0">
              <SidebarGroupContent>
                <SidebarMenu>
                  {items.map((item) =>
                    item.type === 'link' ? (
                      <NavLink
                        key={item.title}
                        item={item}
                        pathname={pathname}
                      />
                    ) : (
                      <NavGroup
                        key={item.title}
                        item={item}
                        pathname={pathname}
                        open={openGroup === item.title}
                        onOpenChange={(open) => {
                          setOpenGroup(open ? item.title : null)
                        }}
                      />
                    ),
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter className="px-0 m-0 ">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  className="rounded-none pl-5 h-10 hover:bg-secondary-blue active:bg-secondary-blue border-l-3 border-transparent"
                  render={
                    <button type="button" onClick={onLogout}>
                      <LogOut color="white" />
                      <span className="text-white">Cerrar Sesión</span>
                    </button>
                  }
                />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>
        {children && <SidebarInset>{children}</SidebarInset>}
      </SidebarProvider>
    </>
  )
}
