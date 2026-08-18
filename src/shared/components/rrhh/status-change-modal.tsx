'use client'

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

type StatusChangeModalProps = {
  isOpen: boolean
  isActive: boolean
  isLoading: boolean
  recordName: string
  entityType: string
  deactivationNote: string
  onOpenChange: (isOpen: boolean) => void
  onConfirm: () => Promise<void>
}

/** Confirma el cambio de estado de un registro de RRHH. */
export function StatusChangeModal({
  isOpen,
  isActive,
  isLoading,
  recordName,
  entityType,
  deactivationNote,
  onOpenChange,
  onConfirm,
}: StatusChangeModalProps) {
  const actionLabel = isActive ? 'Desactivar' : 'Reactivar'

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="gap-5 p-6 sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>
            {actionLabel} {entityType}
          </DialogTitle>
          <DialogDescription>
            {isActive
              ? `¿Deseas desactivar “${recordName}”? ${deactivationNote}`
              : `¿Deseas reactivar “${recordName}” para volver a utilizarlo?`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="-mx-6 -mb-6 px-6">
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancelar
          </DialogClose>
          <Button
            disabled={isLoading}
            onClick={() => void onConfirm()}
            type="button"
            variant={isActive ? 'destructive' : 'default'}
          >
            {isLoading ? 'Procesando...' : `${actionLabel} ${entityType}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
