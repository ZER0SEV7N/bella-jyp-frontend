import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AreasPagination } from '../areas-pagination'

describe('AreasPagination', () => {
  it('delega la navegacion entre paginas', () => {
    const onPageChange = vi.fn()

    render(
      <AreasPagination
        limit={10}
        onLimitChange={vi.fn()}
        onPageChange={onPageChange}
        page={2}
        total={40}
        totalPages={4}
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Página anterior' }))
    fireEvent.click(screen.getByRole('button', { name: 'Página siguiente' }))

    expect(onPageChange).toHaveBeenNthCalledWith(1, 1)
    expect(onPageChange).toHaveBeenNthCalledWith(2, 3)
  })

  it('permite seleccionar la cantidad de filas por pagina', async () => {
    const onLimitChange = vi.fn()

    render(
      <AreasPagination
        limit={10}
        onLimitChange={onLimitChange}
        onPageChange={vi.fn()}
        page={1}
        total={40}
        totalPages={4}
      />,
    )

    const trigger = screen.getByRole('combobox', { name: 'Filas por página' })
    fireEvent.pointerDown(trigger)
    fireEvent.click(trigger)

    const option = await screen.findByRole('option', { name: '25' })
    fireEvent.pointerDown(option)
    fireEvent.pointerUp(option)
    fireEvent.click(option)

    expect(onLimitChange).toHaveBeenCalledWith(25)
  })
})
