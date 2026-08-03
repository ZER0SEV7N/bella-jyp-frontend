import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SignInForm } from '../sign-in-form'
import { SignInScreen } from '../sign-in-screen'

vi.mock('next/navigation', () => ({
  useRouter: () => ({ replace: vi.fn() }),
}))

describe('SignInForm', () => {
  it('muestra los mensajes del contrato compartido al enviar datos invalidos', async () => {
    render(<SignInForm />)

    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(
      await screen.findByText(/El DNI debe contener exactamente 8/),
    ).toBeInTheDocument()
    expect(screen.getByText(/Credenciales inv/)).toBeInTheDocument()
  })

  it('envia el LoginDTO validado', async () => {
    const onSubmit = vi.fn()
    render(<SignInForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByPlaceholderText('Numero de documento'), {
      target: { value: '12345678' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'secreto1' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        tipo_documento: 'DNI',
        nro_documento: '12345678',
        password: 'secreto1',
      })
    })
  })

  it('permite mostrar y ocultar la contraseña', () => {
    render(<SignInForm />)

    const password = screen.getByLabelText('Contraseña')
    expect(password).toHaveAttribute('type', 'password')

    fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }))
    expect(password).toHaveAttribute('type', 'text')
  })

  it('muestra el boton para recuperar la contraseña', () => {
    render(<SignInForm />)

    expect(
      screen.getByRole('button', { name: '¿Olvidaste tu contraseña?' }),
    ).toHaveAttribute('type', 'button')
  })

  it('no valida sign-in al enviar el documento del modal', async () => {
    render(<SignInForm />)

    fireEvent.click(
      screen.getByRole('button', { name: '¿Olvidaste tu contraseña?' }),
    )
    const dialog = await screen.findByRole('dialog')

    fireEvent.change(within(dialog).getByPlaceholderText('Numero de documento'), {
      target: { value: '12345678' },
    })
    fireEvent.click(
      within(dialog).getByRole('button', { name: 'Enviar solicitud' }),
    )

    expect(
      await screen.findByText('Instrucciones enviadas'),
    ).toBeInTheDocument()
    expect(screen.queryByText(/Credenciales inv/)).not.toBeInTheDocument()
  })
})

describe('SignInScreen', () => {
  it('muestra la pantalla de acceso', () => {
    render(<SignInScreen />)

    expect(
      screen.getByRole('heading', { name: 'Bienvenido' }),
    ).toBeInTheDocument()
    expect(
      screen.getByText('Ingresa tus credenciales para continuar'),
    ).toBeInTheDocument()
  })
})
