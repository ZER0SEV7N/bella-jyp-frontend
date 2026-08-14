import { Pencil, Power, RotateCcw } from 'lucide-react'

import type { Area } from '../types/area.types'
import { Button } from '@/shared/components/ui/button'

type AreaTableActionsProps = {
  area: Area
  onEdit: (area: Area) => void
  onStatusChange: (area: Area) => void
}

export function AreaTableActions({
  area,
  onEdit,
  onStatusChange,
}: AreaTableActionsProps) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        aria-label={`Editar ${area.nombre}`}
        onClick={() => onEdit(area)}
        size="icon-sm"
        variant="ghost"
      >
        <Pencil aria-hidden />
      </Button>
      <Button
        aria-label={`${area.activo ? 'Desactivar' : 'Reactivar'} ${area.nombre}`}
        onClick={() => onStatusChange(area)}
        size="icon-sm"
        variant={area.activo ? 'destructive' : 'ghost'}
      >
        {area.activo ? <Power aria-hidden /> : <RotateCcw aria-hidden />}
      </Button>
    </div>
  )
}
