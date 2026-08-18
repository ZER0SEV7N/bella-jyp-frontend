import { Badge } from '@/shared/components/ui/badge'

type StatusBadgeProps = {
  isActive: boolean
  activeLabel?: string
  inactiveLabel?: string
}

/** Muestra el estado operativo de un registro con un estilo visual consistente. */
export function StatusBadge({
  isActive,
  activeLabel = 'Activo',
  inactiveLabel = 'Inactivo',
}: StatusBadgeProps) {
  return (
    <Badge variant={isActive ? 'secondary' : 'outline'}>
      <span
        aria-hidden
        className={
          isActive
            ? 'size-1.5 rounded-full bg-emerald-500'
            : 'size-1.5 rounded-full bg-slate-400'
        }
      />
      {isActive ? activeLabel : inactiveLabel}
    </Badge>
  )
}
