// util para obtener los titulos del grupo de breadcrumb
import { SidebarNavItem } from '@/shared/types/sidebar'
import { BreadcrumbMatch } from '@/shared/types/navbar'

export function getBreadcrumbMatch(
  pathname: string,
  items: SidebarNavItem[],
): BreadcrumbMatch | undefined {
  for (const item of items) {
    // Obtener el titulo de los tipo link
    if (item.type === 'link' && item.url === pathname) {
      return { title: item.title }
    }
    // Obtener el titulo padre y titulo actual del tipo group
    if (item.type === 'group') {
      const subItem = item.items.find((subItem) => subItem.url === pathname)
      if (subItem) {
        return { groupTitle: item.title, title: subItem.title }
      }
    }
  }
  return undefined
}
