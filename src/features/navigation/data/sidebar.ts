import {
  CalendarCheck,
  CalendarClock,
  Clipboard,
  FileBadge,
  Gavel,
  LayoutDashboard,
  Users,
  WalletCards,
} from 'lucide-react'

import type { SidebarNavItem } from '@/shared/types/sidebar'

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
    icon: CalendarCheck,
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

// Navegacion temporal para validar el modulo de Recursos Humanos
export const rrhhSidebar: SidebarNavItem[] = [
  {
    type: 'link',
    title: 'Dashboard',
    url: '/rrhh/dashboard',
    icon: LayoutDashboard,
  },
  {
    type: 'group',
    title: 'Gestion de Personal',
    icon: Users,
    items: [
      { title: 'Empleados', url: '/rrhh/personal/empleados' },
      { title: 'Contratos', url: '/rrhh/personal/contratos' },
    ],
  },
  {
    type: 'group',
    title: 'Control de Asistencia',
    icon: CalendarClock,
    items: [
      { title: 'Marcaciones', url: '/rrhh/asistencia/marcaciones' },
      { title: 'Incidencias', url: '/rrhh/asistencia/incidencias' },
    ],
  },
  {
    type: 'group',
    title: 'Administracion',
    icon: FileBadge,
    items: [
      { title: 'Documentos', url: '/rrhh/administracion/documentos' },
      { title: 'Planillas', url: '/rrhh/administracion/planillas' },
    ],
  },
  {
    type: 'link',
    title: 'Resumen de Pagos',
    url: '/rrhh/pagos',
    icon: WalletCards,
  },
]
