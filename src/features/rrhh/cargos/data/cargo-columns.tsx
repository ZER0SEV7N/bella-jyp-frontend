import type { Cargo } from '../types/cargo.types'
import { EntityRowActions } from '@/shared/components/rrhh/entity-row-actions'
import { StatusBadge } from '@/shared/components/rrhh/status-badge'
import { createDataTableColumnHelper } from '@/shared/lib/data-table/data-table-config'

const columnHelper = createDataTableColumnHelper<Cargo>()
type CreateCargoColumnsOptions = {
  onEdit: (cargo: Cargo) => void
  onStatusChange: (cargo: Cargo) => void
}

/** Define las columnas propias del directorio de cargos. */
export function createCargoColumns({
  onEdit,
  onStatusChange,
}: CreateCargoColumnsOptions) {
  return columnHelper.columns([
    columnHelper.accessor('nombre', {
      header: 'Cargo',
      cell: ({ cell }) => (
        <span className="font-medium text-foreground">
          {cell.getValue<string>()}
        </span>
      ),
    }),
    columnHelper.accessor((cargo) => cargo.area.nombre, {
      id: 'area',
      header: 'Área',
    }),
    columnHelper.accessor('descripcion', {
      header: 'Descripción',
      cell: ({ cell }) => (
        <span className="block max-w-80 truncate text-muted-foreground">
          {cell.getValue<string | null>() || 'Sin descripción'}
        </span>
      ),
    }),
    columnHelper.accessor('activo', {
      header: 'Estado',
      cell: ({ cell }) => <StatusBadge isActive={cell.getValue<boolean>()} />,
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
