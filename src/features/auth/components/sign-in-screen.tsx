"use client"

import { Building2 } from 'lucide-react'

import { SignInForm } from '@/features/auth/components/sign-in-form'
import { useAuth } from '@/features/auth/hooks/use-auth'
import type { SignInCredentials } from '@/features/auth/types/auth.type'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/shared/components/ui/card'

type SignInScreenProps = {
  onSubmit?: (credentials: SignInCredentials) => void | Promise<void>
}

export function SignInScreen({ onSubmit }: SignInScreenProps) {
  const { redirectToDashboard } = useAuth()

  const handleSubmit = async (credentials: SignInCredentials) => {
    // redirige solo despues de completar el envio de las credenciales.
    await onSubmit?.(credentials)
    redirectToDashboard()
  }

  return (
    <main className="grid min-h-screen bg-slate-50 lg:grid-cols-[1.05fr_0.95fr]">
      <section className="hidden bg-primary p-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
        <div className="flex items-center gap-3 text-xl font-semibold">
          <span className="grid size-10 place-items-center rounded-xl bg-white/15">
            <Building2 className="size-5" />
          </span>
          Bella JYP
        </div>
        <div className="max-w-md">
          <p className="text-4xl leading-tight font-semibold">
            Tu gestion de planillas, en un solo lugar.
          </p>
          <p className="mt-5 text-base leading-7 text-white/75">
            Accede de forma segura a las herramientas que necesitas para
            gestionar tu trabajo.
          </p>
        </div>
        <p className="text-sm text-white/60">
          © 2026 Bella JYP. Todos los derechos reservados.
        </p>
      </section>

      <section className="flex items-center justify-center p-6 sm:p-10">
        <Card className="w-full max-w-md py-7 shadow-xl shadow-slate-200/50">
          <CardHeader className="px-7 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-xl bg-primary text-primary-foreground lg:hidden">
              <Building2 className="size-6" />
            </div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Bienvenido
            </h1>
            <CardDescription className="mt-1">
              Ingresa tus credenciales para continuar
            </CardDescription>
          </CardHeader>
          <CardContent className="px-7 pt-3">
            <SignInForm onSubmit={handleSubmit} />
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
