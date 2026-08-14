import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AreasTable } from '../areas-table'
import type { Area } from '../../types/area.types'

const area: Area = {
  id: '018f4a7c-7777-7000-1111-000000000001',
  nombre: 'Recursos Humanos',
  descripcion: 'Gestión de personas',
  activo: true,
  deleted_at: null,
  _count: { cargo: 4 },
}

describe('AreasTable', () => {
  it('presenta los datos y delega sus acciones', () => {
    const onEdit = vi.fn()
    const onStatusChange = vi.fn()

    render(
      <AreasTable
        areas={[area]}
        isLoading={false}
        onEdit={onEdit}
        onStatusChange={onStatusChange}
      />,
    )

    expect(screen.getByText('Recursos Humanos')).toBeInTheDocument()
    expect(screen.getByText('Gestión de personas')).toBeInTheDocument()
    expect(screen.getByText('4')).toBeInTheDocument()
    expect(screen.getByText('Activa')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Editar Recursos Humanos' }))
    fireEvent.click(
      screen.getByRole('button', { name: 'Desactivar Recursos Humanos' }),
    )

    expect(onEdit).toHaveBeenCalledWith(area)
    expect(onStatusChange).toHaveBeenCalledWith(area)
  })

  it('muestra un estado vacío comprensible', () => {
    render(
      <AreasTable
        areas={[]}
        isLoading={false}
        onEdit={vi.fn()}
        onStatusChange={vi.fn()}
      />,
    )

    expect(screen.getByText('No hay áreas para mostrar')).toBeInTheDocument()
  })
})
