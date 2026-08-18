'use client'

import type { Cargo } from '../types/cargo.types'
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

type CargoStatusDialogProps = {
  cargo: Cargo | null
  isSubmitting: boolean
  onConfirm: () => Promise<void>
  onOpenChange: (open: boolean) => void
  open: boolean
}

/** Confirma el cambio de estado del cargo seleccionado. */
export function CargoStatusDialog({
  cargo,
  isSubmitting,
  onConfirm,
  onOpenChange,
  open,
}: CargoStatusDialogProps) {
  const isActive = cargo?.activo ?? true
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isActive ? 'Desactivar cargo' : 'Reactivar cargo'}
          </DialogTitle>
          <DialogDescription>
            {isActive
              ? `¿Deseas desactivar “${cargo?.nombre}”? Sólo será posible si no tiene empleados activos asignados.`
              : `¿Deseas reactivar “${cargo?.nombre}” para volver a utilizarlo?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="-mx-6 -mb-6 px-6">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button
            disabled={isSubmitting}
            onClick={() => void onConfirm()}
            type="button"
            variant={isActive ? 'destructive' : 'default'}
          >
            {isSubmitting
              ? 'Procesando...'
              : isActive
                ? 'Desactivar cargo'
                : 'Reactivar cargo'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
