import { LucideIcon } from 'lucide-react'
export type SidebarNavItem =
  | {
      type: 'link'
      title: string
      url: string
      icon?: LucideIcon
    }
  | {
      type: 'group'
      title: string
      icon: LucideIcon
      items: {
        title: string
        url: string
      }[]
    }
