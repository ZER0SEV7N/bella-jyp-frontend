import { AreaTableActions } from '../components/area-table-actions'
import type { Area } from '../types/area.types'
import { Badge } from '@/shared/components/ui/badge'
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
      cell: ({ cell }) => {
        const active = cell.getValue<boolean>()

        return (
          <Badge variant={active ? 'secondary' : 'outline'}>
            <span
              aria-hidden
              className={
                active
                  ? 'size-1.5 rounded-full bg-emerald-500'
                  : 'size-1.5 rounded-full bg-slate-400'
              }
            />
            {active ? 'Activa' : 'Inactiva'}
          </Badge>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => (
        <AreaTableActions
          area={row.original}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ),
    }),
  ])
}
