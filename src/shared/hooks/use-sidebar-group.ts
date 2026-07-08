// hook para manejar estado del despliegue de los collapsible
import { useState } from 'react'
import { SidebarNavItem } from '@/shared/types/sidebar'

export function useSidebarGroupState(
  items: SidebarNavItem[],
  pathname: string,
) {
  // Funcion para buscar el titulo del grupo padre al que pertence la ruta actual
  const activeGroupTitle = items.find(
    (item) =>
      item.type === 'group' &&
      item.items.some((subItem) => subItem.url === pathname),
  )?.title

  // Estado para el grupo actual desplegado
  const [openGroup, setOpenGroup] = useState<string | null>(
    activeGroupTitle ?? null,
  )
  // Estado que guarda el titulo de la ruta anterior
  const [prevActiveTitle, setPrevActiveTitle] = useState(activeGroupTitle)

  // Si el usuario cambio abre automaticamente el nuevo grupo en el menu
  if (activeGroupTitle !== prevActiveTitle) {
    setPrevActiveTitle(activeGroupTitle)
    setOpenGroup(activeGroupTitle ?? null)
  }

  return { openGroup, setOpenGroup }
}
