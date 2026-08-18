'use client'

import { useMemo } from 'react'
import { BriefcaseBusiness } from 'lucide-react'
import { createCargoColumns } from '../data/cargo-columns'
import type { Cargo } from '../types/cargo.types'
import { DataTable } from '@/shared/components/data-table/data-table'

type CargosTableProps = {
  cargos: Cargo[]
  isLoading: boolean
  onEdit: (cargo: Cargo) => void
  onStatusChange: (cargo: Cargo) => void
}

/** Adapta los datos y acciones de cargos al DataTable compartido. */
export function CargosTable({
  cargos,
  isLoading,
  onEdit,
  onStatusChange,
}: CargosTableProps) {
  const columns = useMemo(
    () => createCargoColumns({ onEdit, onStatusChange }),
    [onEdit, onStatusChange],
  )
  return (
    <DataTable
      columns={columns}
      data={cargos}
      isLoading={isLoading}
      emptyState={
        <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
          <div>
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand-blue-50 text-brand-blue-700 dark:bg-brand-blue-900/40 dark:text-brand-blue-200">
              <BriefcaseBusiness aria-hidden className="size-5" />
            </div>
            <h3 className="mt-4 font-medium">No hay cargos para mostrar</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Registra un cargo o cambia los filtros seleccionados.
            </p>
          </div>
        </div>
      }
    />
  )
}
