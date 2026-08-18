import type { Area } from '../types/area.types'
import { EntityRowActions } from '@/shared/components/rrhh/entity-row-actions'
import { StatusBadge } from '@/shared/components/rrhh/status-badge'
import { createDataTableColumnHelper } from '@/shared/lib/data-table/data-table-config'

const columnHelper = createDataTableColumnHelper<Area>()

type CreateAreaColumnsOptions = {
  onEdit: (area: Area) => void
  onStatusChange: (area: Area) => void
}

export function createAreaColumns({
  onEdit,
  onStatusChange,
}: CreateAreaColumnsOptions) {
  return columnHelper.columns([
    columnHelper.accessor('nombre', {
      header: 'Área',
      cell: ({ cell }) => (
        <span className="font-medium text-foreground">
          {cell.getValue<string>()}
        </span>
      ),
    }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: ({ cell }) => (
        <span className="block max-w-80 truncate text-muted-foreground">
          {cell.getValue<string | null>() || 'Sin descripción'}
        </span>
      ),
    }),
    columnHelper.accessor((area) => area._count?.cargo ?? 0, {
      id: 'cargos',
      header: 'Cargos',
    }),
    columnHelper.accessor('activo', {
      header: 'Estado',
      cell: ({ cell }) => (
        <StatusBadge
          isActive={cell.getValue<boolean>()}
          activeLabel="Activa"
          inactiveLabel="Inactiva"
        />
      ),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => (
        <EntityRowActions
          entity={row.original}
          name={row.original.nombre}
          isActive={row.original.activo}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ),
    }),
  ])
}
