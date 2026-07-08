import { SidebarNavItem } from '@/shared/types/sidebar'
import { Clipboard, Gavel, LayoutDashboard } from 'lucide-react'

export const contadorSidebar: SidebarNavItem[] = [
  {
    type: 'link',
    title: 'Dashboard',
    url: '/contador/dashboard',
    icon: LayoutDashboard,
  },
  {
    type: 'group',
    title: 'Tareas de Asistentes',
    icon: Clipboard,
    items: [
      {
        title: 'Panel de Aprobaciones',
        url: '/contador/tareas/panel',
      },
      {
        title: 'Asignacion de Tareas',
        url: '/contador/tareas/asignacion',
      },
    ],
  },
  {
    type: 'group',
    title: 'Configuración Legal',
    icon: Gavel,
    items: [
      {
        title: 'Parámetros de Ley',
        url: '/contador/configuracion-legal/parametros',
      },
      {
        title: 'Matriz de Comisiones AFP',
        url: '/contador/configuracion-legal/afp',
      },
    ],
  },
  {
    type: 'group',
    title: 'Cierre de Planilla',
    icon: Gavel,
    items: [
      {
        title: 'Auditoría de Presupuesto',
        url: '/contador/cierre-planilla/auditoria',
      },
      {
        title: 'Congelar Periodo',
        url: '/contador/cierre-planilla/congelar',
      },
    ],
  },
]
