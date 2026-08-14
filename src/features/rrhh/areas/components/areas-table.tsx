'use client'

import { useMemo } from 'react'
import { Building2 } from 'lucide-react'

import { createAreaColumns } from '../data/area-columns'
import type { Area } from '../types/area.types'
import { DataTable } from '@/shared/components/data-table/data-table'

type AreasTableProps = {
  areas: Area[]
  isLoading: boolean
  onEdit: (area: Area) => void
  onStatusChange: (area: Area) => void
}

/**
 * Adapta los datos y acciones de areas al DataTable compartido.
 *
 * Mantiene dentro de la feature las columnas y el estado vacio porque ambos
 * contienen presentacion especifica del dominio de RRHH.
 */
export function AreasTable({
  areas,
  isLoading,
  onEdit,
  onStatusChange,
}: AreasTableProps) {
  const columns = useMemo(
    () => createAreaColumns({ onEdit, onStatusChange }),
    [onEdit, onStatusChange],
  )

  return (
    <DataTable
      columns={columns}
      data={areas}
      emptyState={
        <div className="grid min-h-72 place-items-center px-6 py-12 text-center">
          <div>
            <div className="mx-auto grid size-12 place-items-center rounded-full bg-brand-blue-50 text-brand-blue-700 dark:bg-brand-blue-900/40 dark:text-brand-blue-200">
              <Building2 aria-hidden className="size-5" />
            </div>
            <h3 className="mt-4 font-medium">No hay áreas para mostrar</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Crea una nueva área o cambia el filtro seleccionado.
            </p>
          </div>
        </div>
      }
      isLoading={isLoading}
    />
  )
}
