'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CrearAreaSchema } from '@jyp/shared-contracts'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import type { Area, AreaFormValues } from '../types/area.types'
import { Button } from '@/shared/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'

type AreaFormDialogProps = {
  area: Area | null
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: AreaFormValues) => Promise<void>
  open: boolean
}

/**
 * Presenta el formulario validado para crear o actualizar un area.
 *
 * Cuando recibe un area carga sus valores para edicion. Sin seleccion inicia
 * un registro nuevo y delega la operacion asincrona mediante `onSubmit`.
 */
export function AreaFormDialog({
  area,
  isSubmitting,
  onOpenChange,
  onSubmit,
  open,
}: AreaFormDialogProps) {
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<AreaFormValues>({
    resolver: zodResolver(CrearAreaSchema),
    defaultValues: { nombre: '', descripcion: '' },
  })

  useEffect(() => {
    if (!open) return

    reset({
      nombre: area?.nombre ?? '',
      descripcion: area?.descripcion ?? '',
    })
  }, [area, open, reset])

  const submitForm = handleSubmit(async (values) => {
    await onSubmit({
      ...values,
      nombre: values.nombre.trim(),
      descripcion: values.descripcion?.trim() || null,
    })
  })

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 p-6 sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {area ? 'Editar área' : 'Registrar nueva área'}
          </DialogTitle>
          <DialogDescription>
            {area
              ? 'Actualiza el nombre o la descripción del área seleccionada.'
              : 'Crea una unidad organizacional para agrupar los cargos del equipo.'}
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5" id="area-form" noValidate onSubmit={submitForm}>
          <div className="space-y-2">
            <Label htmlFor="area-name">Nombre del área</Label>
            <Input
              aria-invalid={Boolean(errors.nombre)}
              autoFocus
              id="area-name"
              maxLength={100}
              placeholder="Ej. Recursos Humanos"
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive" role="alert">
                {errors.nombre.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="area-description">Descripción</Label>
            <Textarea
              aria-invalid={Boolean(errors.descripcion)}
              id="area-description"
              maxLength={255}
              placeholder="Describe brevemente la responsabilidad del área"
              {...register('descripcion')}
            />
            {errors.descripcion && (
              <p className="text-sm text-destructive" role="alert">
                {errors.descripcion.message}
              </p>
            )}
          </div>
        </form>

        <DialogFooter className="-mx-6 -mb-6 px-6">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button disabled={isSubmitting} form="area-form" type="submit">
            {isSubmitting ? 'Guardando...' : area ? 'Guardar cambios' : 'Crear área'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
