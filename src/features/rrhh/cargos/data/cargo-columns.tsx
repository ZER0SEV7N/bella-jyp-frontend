import { CargoTableActions } from '../components/cargo-table-actions'
import type { Cargo } from '../types/cargo.types'
import { Badge } from '@/shared/components/ui/badge'
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
            {active ? 'Activo' : 'Inactivo'}
          </Badge>
        )
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: () => <span className="block text-right">Acciones</span>,
      cell: ({ row }) => (
        <CargoTableActions
          cargo={row.original}
          onEdit={onEdit}
          onStatusChange={onStatusChange}
        />
      ),
    }),
  ])
}
