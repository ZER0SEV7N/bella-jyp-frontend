import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { DataTable } from '../data-table'
import { createDataTableColumnHelper } from '@/shared/lib/data-table/data-table-config'

type Person = {
  id: string
  name: string
}

const columnHelper = createDataTableColumnHelper<Person>()
const columns = columnHelper.columns([
  columnHelper.accessor('name', { header: 'Nombre' }),
])

describe('DataTable', () => {
  it('renderiza encabezados y filas usando TanStack Table', () => {
    render(
      <DataTable
        columns={columns}
        data={[{ id: '1', name: 'Recursos Humanos' }]}
      />,
    )

    expect(screen.getByRole('columnheader', { name: 'Nombre' })).toBeInTheDocument()
    expect(screen.getByRole('cell', { name: 'Recursos Humanos' })).toBeInTheDocument()
  })

  it('delega el contenido del estado vacio', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        emptyState={<p>Sin resultados</p>}
      />,
    )

    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })

  it('muestra esqueletos mientras carga', () => {
    render(
      <DataTable
        columns={columns}
        data={[]}
        isLoading
        loadingRows={3}
      />,
    )

    expect(screen.getByLabelText('Cargando datos').children).toHaveLength(3)
  })
})
