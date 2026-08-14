'use client'

import { useTable, type RowData } from '@tanstack/react-table'
import type { ReactNode } from 'react'

import type { DataTableColumnDef } from '@/shared/lib/data-table/data-table-config'
import { dataTableFeatures } from '@/shared/lib/data-table/data-table-config'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/ui/table'

export type DataTableProps<TData extends RowData> = {
  columns: DataTableColumnDef<TData>[]
  data: TData[]
  emptyState?: ReactNode
  isLoading?: boolean
  loadingRows?: number
}

export function DataTable<TData extends RowData>({
  columns,
  data,
  emptyState,
  isLoading = false,
  loadingRows = 5,
}: DataTableProps<TData>) {
  //TanStack administra el modelo de filas y el render de cada columna.
  const table = useTable({ columns, data, features: dataTableFeatures })

  if (isLoading) {
    return (
      <div className="space-y-3 p-4" aria-label="Cargando datos">
        {Array.from({ length: loadingRows }).map((_, index) => (
          <Skeleton className="h-12 w-full" key={index} />
        ))}
      </div>
    )
  }

  const rows = table.getRowModel().rows

  //Cada feature define su propio estado vacio sin acoplar la tabla al negocio.
  if (rows.length === 0) return emptyState ?? null

  return (
    <Table>
      <TableHeader className="bg-muted/40">
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder ? null : (
                  <table.FlexRender header={header} />
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            {row.getAllCells().map((cell) => (
              <TableCell key={cell.id}>
                <table.FlexRender cell={cell} />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
