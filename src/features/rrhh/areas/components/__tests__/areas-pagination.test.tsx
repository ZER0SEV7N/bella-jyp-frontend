import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { ServerPagination } from '@/shared/components/rrhh/server-pagination'

describe('ServerPagination', () => {
  it('delega la navegacion entre paginas', () => {
    const onPageChange = vi.fn()

    render(
      <ServerPagination
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        page={2}
        total={40}
        totalPages={4}
        singularLabel="área registrada"
        pluralLabel="áreas registradas"
        onPageSizeChange={vi.fn()}
        onPageChange={onPageChange}
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
      <ServerPagination
        pageSize={10}
        pageSizeOptions={[10, 25, 50, 100]}
        page={1}
        total={40}
        totalPages={4}
        singularLabel="área registrada"
        pluralLabel="áreas registradas"
        onPageSizeChange={onLimitChange}
        onPageChange={vi.fn()}
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
