import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SignInForm } from '../sign-in-form'
import { SignInScreen } from '../sign-in-screen'

describe('SignInForm', () => {
  it('muestra mensajes cuando se envia sin credenciales', async () => {
    render(<SignInForm />)

    // verifica las reglas de zod antes de enviar el formulario.
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    expect(
      await screen.findByText('Ingresa tu numero de documento.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Ingresa tu contraseña.')).toBeInTheDocument()
  })

  it('envia las credenciales validadas', async () => {
    const onSubmit = vi.fn()
    render(<SignInForm onSubmit={onSubmit} />)
    fireEvent.change(screen.getByPlaceholderText('Numero de documento'), {
      target: { value: 'AB123456' },
    })
    fireEvent.change(screen.getByLabelText('Contraseña'), {
      target: { value: 'secreto' },
    })
    // envia las credenciales validas al callback.
    fireEvent.click(screen.getByRole('button', { name: 'Ingresar' }))

    // espera el envio asincrono para confirmar las credenciales recibidas.
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith({
        documentType: 'DNI',
        documentNumber: 'AB123456',
        password: 'secreto',
      })
    })
  })

  it('permite mostrar y ocultar la contraseña', () => {
    render(<SignInForm />)

    const password = screen.getByLabelText('Contraseña')
    expect(password).toHaveAttribute('type', 'password')

    // confirma el cambio de estado de visibilidad de la contraseña.
    fireEvent.click(screen.getByRole('button', { name: 'Mostrar contraseña' }))
    expect(password).toHaveAttribute('type', 'text')
  })
  it('muestra el boton para recuperar la contraseña', () => {
    render(<SignInForm />)

    expect(
      screen.getByRole('button', { name: '¿Olvidaste tu contraseña?' }),
    ).toHaveAttribute('type', 'button')
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


