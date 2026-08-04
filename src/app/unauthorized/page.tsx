'use client'

import { Button } from '@/shared/components/ui/button'
import { useAuthContext } from '@/features/auth/context/auth-context'

// Informa que el rol inicio sesion pero aun no tiene una ruta disponible.
export default function UnauthorizedPage() {
  const { logout } = useAuthContext()

  return (
    <main className="grid min-h-screen place-items-center bg-slate-50 p-6">
      <section className="max-w-md space-y-4 rounded-xl bg-white p-8 text-center shadow-sm">
        <h1 className="text-xl font-semibold">Acceso no disponible</h1>
        <p className="text-sm text-slate-600">
          Tu rol no tiene un modulo disponible en esta version.
        </p>
        <Button onClick={logout} type="button">Cerrar sesion</Button>
      </section>
    </main>
  )
}
