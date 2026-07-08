'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
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
import { contadorSidebar } from '@/shared/data/sidebar'
import NavLink from './nav-link'
import NavGroup from './nav-group'

export default function AppSidebar({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname() // Variable que obtiene la ruta

  // Funcion para buscar el titulo del grupo padre al que pertence la ruta actual
  const activeGroupTitle = contadorSidebar.find(
    (item) =>
      item.type === 'group' &&
      item.items.some((subItem) => subItem.url === pathname),
  )?.title

  // Estado para el grupo actual desplegado
  const [openGroup, setOpenGroup] = useState<string | null>(
    activeGroupTitle ?? null,
  )

  // Estado que guarda el titulo de la ruta anterior
  const [prevActiveTitle, setPrevActiveTitle] = useState<
    string | null | undefined
  >(activeGroupTitle)

  // Si el usuario cambio abre automaticamente el nuevo grupo en el menu
  if (activeGroupTitle !== prevActiveTitle) {
    setPrevActiveTitle(activeGroupTitle)
    setOpenGroup(activeGroupTitle ?? null)
  }

  return (
    <>
      <SidebarProvider>
        <Sidebar className="**:data-[slot=sidebar-inner]:bg-[#150AB4]! **:data-[slot=sidebar-inner]:text-white!">
          <SidebarHeader className="border-b border-blue-800">
            <Link
              href={'/contador/dashboard'}
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
                <SidebarMenu className="gap-1">
                  {contadorSidebar.map((item) =>
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
                  className="rounded-none pl-5 h-10 hover:bg-[#09267B] active:bg-[#09267B] border-l-3 border-transparent"
                  render={
                    <Link href={'/sign-in'}>
                      <LogOut color="white" />
                      <span className="text-white">Cerrar Sesión</span>
                    </Link>
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
