'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema, type LoginDTO } from '@jyp/shared-contracts'
import { Eye, EyeOff, LockKeyhole, UserRound } from 'lucide-react'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import { ForgotPasswordDialog } from '@/features/auth/components/forgot-password-dialog'
import {
  documentTypes,
  signInDefaultValues,
} from '@/features/auth/data/auth.mock'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

type SignInFormProps = {
  onSubmit?: (credentials: LoginDTO) => void | Promise<void>
}

type LoginFormValues = typeof LoginSchema._input

export function SignInForm({ onSubmit }: SignInFormProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues, unknown, LoginDTO>({
    resolver: zodResolver(LoginSchema),
    defaultValues: signInDefaultValues,
  })

  const submitForm = async (values: LoginDTO) => {
    await onSubmit?.(values)
  }

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit(submitForm)}>
      <div className="space-y-2">
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="tipo_documento"
        >
          Documento
        </label>
        <div className="flex">
          <Controller
            control={control}
            name="tipo_documento"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger
                  aria-label="Tipo de documento"
                  className="h-11! w-28 min-w-28 shrink-0 rounded-r-none border-r-0"
                  id="tipo_documento"
                >
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="start">
                  {documentTypes.map((documentType) => (
                    <SelectItem key={documentType} value={documentType}>
                      {documentType}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <div className="relative min-w-0 flex-1">
            <UserRound
              aria-hidden
              className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
            />
            <Input
              aria-invalid={Boolean(errors.nro_documento)}
              className="h-11 rounded-l-none pl-10"
              id="nro_documento"
              placeholder="Numero de documento"
              {...register('nro_documento')}
            />
          </div>
        </div>
        {errors.nro_documento && (
          <p className="text-sm text-destructive" role="alert">
            {errors.nro_documento.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          className="text-sm font-medium text-slate-700"
          htmlFor="password"
        >
          Contraseña
        </label>
        <div className="relative">
          <LockKeyhole
            aria-hidden
            className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400"
          />
          <Input
            aria-invalid={Boolean(errors.password)}
            className="h-11 pr-11 pl-10"
            id="password"
            placeholder="Ingresa tu contraseña"
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password')}
          />
          <button
            aria-label={
              isPasswordVisible ? 'Ocultar contraseña' : 'Mostrar contraseña'
            }
            className="absolute top-1/2 right-3 -translate-y-1/2 text-slate-400 transition-colors hover:text-slate-700"
            onClick={() => setIsPasswordVisible((isVisible) => !isVisible)}
            type="button"
          >
            {isPasswordVisible ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-destructive" role="alert">
            {errors.password.message}
          </p>
        )}
        <div className="flex justify-end">
          <ForgotPasswordDialog />
        </div>
      </div>

      <Button
        className="h-11 w-full rounded-lg"
        disabled={isSubmitting}
        type="submit"
      >
        {isSubmitting ? 'Ingresando...' : 'Ingresar'}
      </Button>
    </form>
  )
}
