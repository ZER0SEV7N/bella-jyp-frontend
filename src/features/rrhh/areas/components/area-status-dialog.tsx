'use client'

import type { Area } from '../types/area.types'
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

type AreaStatusDialogProps = {
  area: Area | null
  isSubmitting: boolean
  onConfirm: () => Promise<void>
  onOpenChange: (open: boolean) => void
  open: boolean
}

/**
 * Confirma el cambio de estado del area seleccionada.
 *
 * El contenido y la accion visual cambian segun el area este activa o
 * inactiva. La mutacion permanece fuera del componente.
 */
export function AreaStatusDialog({
  area,
  isSubmitting,
  onConfirm,
  onOpenChange,
  open,
}: AreaStatusDialogProps) {
  const isActive = area?.activo ?? true

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {isActive ? 'Desactivar área' : 'Reactivar área'}
          </DialogTitle>
          <DialogDescription>
            {isActive
              ? `¿Deseas desactivar “${area?.nombre}”? Esta acción sólo estará disponible si no tiene cargos activos.`
              : `¿Deseas reactivar “${area?.nombre}” para volver a utilizarla?`}
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
                ? 'Desactivar área'
                : 'Reactivar área'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
