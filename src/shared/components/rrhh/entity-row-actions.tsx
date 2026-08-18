import { Pencil, Power, RotateCcw } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'

type EntityRowActionsProps<T> = {
  entity: T
  name: string
  isActive: boolean
  onEdit: (entity: T) => void
  onStatusChange: (entity: T) => void
}

/** Muestra las acciones de edición y estado para una fila de RRHH. */
export function EntityRowActions<T>({
  entity,
  name,
  isActive,
  onEdit,
  onStatusChange,
}: EntityRowActionsProps<T>) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        aria-label={`Editar ${name}`}
        onClick={() => onEdit(entity)}
        size="icon-sm"
        variant="ghost"
      >
        <Pencil aria-hidden />
      </Button>
      <Button
        aria-label={`${isActive ? 'Desactivar' : 'Reactivar'} ${name}`}
        onClick={() => onStatusChange(entity)}
        size="icon-sm"
        variant={isActive ? 'destructive' : 'ghost'}
      >
        {isActive ? <Power aria-hidden /> : <RotateCcw aria-hidden />}
      </Button>
    </div>
  )
}
