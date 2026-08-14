import {
  createColumnHelper,
  tableFeatures,
  type CellData,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table'

export const dataTableFeatures = tableFeatures({})

export type DataTableColumnDef<TData extends RowData> = ColumnDef<
  typeof dataTableFeatures,
  TData,
  CellData
>

export function createDataTableColumnHelper<TData extends RowData>() {
  return createColumnHelper<typeof dataTableFeatures, TData>()
}
