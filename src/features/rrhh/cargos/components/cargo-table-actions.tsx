import { Pencil, Power, RotateCcw } from 'lucide-react'
import type { Cargo } from '../types/cargo.types'
import { Button } from '@/shared/components/ui/button'

type CargoTableActionsProps = {
  cargo: Cargo
  onEdit: (cargo: Cargo) => void
  onStatusChange: (cargo: Cargo) => void
}

/** Acciones de fila para modificar o cambiar el estado de un cargo. */
export function CargoTableActions({
  cargo,
  onEdit,
  onStatusChange,
}: CargoTableActionsProps) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        aria-label={`Editar ${cargo.nombre}`}
        onClick={() => onEdit(cargo)}
        size="icon-sm"
        variant="ghost"
      >
        <Pencil aria-hidden />
      </Button>
      <Button
        aria-label={`${cargo.activo ? 'Desactivar' : 'Reactivar'} ${cargo.nombre}`}
        onClick={() => onStatusChange(cargo)}
        size="icon-sm"
        variant={cargo.activo ? 'destructive' : 'ghost'}
      >
        {cargo.activo ? <Power aria-hidden /> : <RotateCcw aria-hidden />}
      </Button>
    </div>
  )
}
