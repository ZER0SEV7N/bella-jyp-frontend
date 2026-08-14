import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { AreaFormDialog } from '../area-form-dialog'

describe('AreaFormDialog', () => {
  it('muestra la validación del contrato compartido', async () => {
    render(
      <AreaFormDialog
        area={null}
        isSubmitting={false}
        onOpenChange={vi.fn()}
        onSubmit={vi.fn()}
        open
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Crear área' }))

    expect(
      await screen.findByText('El nombre debe tener al menos 2 caracteres'),
    ).toBeInTheDocument()
  })

  it('normaliza y envía los datos del formulario', async () => {
    const onSubmit = vi.fn().mockResolvedValue(undefined)
    render(
      <AreaFormDialog
        area={null}
        isSubmitting={false}
        onOpenChange={vi.fn()}
        onSubmit={onSubmit}
        open
      />,
    )

    fireEvent.change(screen.getByLabelText('Nombre del área'), {
      target: { value: '  Operaciones  ' },
    })
    fireEvent.change(screen.getByLabelText('Descripción'), {
      target: { value: '  Gestión operativa  ' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear área' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        nombre: 'Operaciones',
        descripcion: 'Gestión operativa',
      })
    })
  })
})
