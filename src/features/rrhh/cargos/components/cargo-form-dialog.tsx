'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { CrearCargoSchema } from '@jyp/shared-contracts'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import type {
  Cargo,
  CargoAreaOption,
  CargoFormValues,
} from '../types/cargo.types'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Textarea } from '@/shared/components/ui/textarea'

type CargoFormDialogProps = {
  areas: CargoAreaOption[]
  cargo: Cargo | null
  isSubmitting: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (values: CargoFormValues) => Promise<void>
  open: boolean
}

/** Presenta el formulario validado para crear o actualizar un cargo. */
export function CargoFormDialog({
  areas,
  cargo,
  isSubmitting,
  onOpenChange,
  onSubmit,
  open,
}: CargoFormDialogProps) {
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<CargoFormValues>({
    resolver: zodResolver(CrearCargoSchema),
    defaultValues: { descripcion: '', id_area: '', nombre: '' },
  })
  useEffect(() => {
    if (open)
      reset({
        descripcion: cargo?.descripcion ?? '',
        id_area: cargo?.id_area ?? '',
        nombre: cargo?.nombre ?? '',
      })
  }, [cargo, open, reset])
  const submitForm = handleSubmit(async (values) => {
    await onSubmit({
      ...values,
      descripcion: values.descripcion?.trim() || null,
      nombre: values.nombre.trim(),
    })
  })
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-6 p-6 sm:max-w-lg" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-xl">
            {cargo ? 'Editar cargo' : 'Registrar nuevo cargo'}
          </DialogTitle>
          <DialogDescription>
            {cargo
              ? 'Actualiza los datos y el área asignada al cargo.'
              : 'Crea un puesto de trabajo dentro de un área activa.'}
          </DialogDescription>
        </DialogHeader>
        <form
          className="space-y-5"
          id="cargo-form"
          noValidate
          onSubmit={submitForm}
        >
          <div className="space-y-2">
            <Label htmlFor="cargo-area">Área</Label>
            <Controller
              control={control}
              name="id_area"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger
                    aria-invalid={Boolean(errors.id_area)}
                    id="cargo-area"
                    className="w-full"
                  >
                    <SelectValue>
                      {areas.find((area) => area.id === field.value)?.nombre ??
                        'Selecciona un área'}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {areas.map((area) => (
                      <SelectItem key={area.id} value={area.id}>
                        {area.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.id_area && (
              <p className="text-sm text-destructive" role="alert">
                {errors.id_area.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargo-name">Nombre del cargo</Label>
            <Input
              aria-invalid={Boolean(errors.nombre)}
              autoFocus
              id="cargo-name"
              maxLength={100}
              placeholder="Ej. Analista de selección"
              {...register('nombre')}
            />
            {errors.nombre && (
              <p className="text-sm text-destructive" role="alert">
                {errors.nombre.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="cargo-description">Descripción</Label>
            <Textarea
              aria-invalid={Boolean(errors.descripcion)}
              id="cargo-description"
              maxLength={255}
              placeholder="Describe brevemente las responsabilidades del cargo"
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
          <Button
            disabled={isSubmitting || areas.length === 0}
            form="cargo-form"
            type="submit"
          >
            {isSubmitting
              ? 'Guardando...'
              : cargo
                ? 'Guardar cambios'
                : 'Crear cargo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
