import { RefreshCw } from 'lucide-react'

import type { AreaStatusFilter } from '../types/area.types'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

type AreasToolbarProps = {
  isRefreshing: boolean
  onRefresh: () => void
  onStatusChange: (status: AreaStatusFilter) => void
  status: AreaStatusFilter
}

const statusLabels: Record<AreaStatusFilter, string> = {
  all: 'Todas las áreas',
  active: 'Áreas activas',
  inactive: 'Áreas inactivas',
}

export function AreasToolbar({
  isRefreshing,
  onRefresh,
  onStatusChange,
  status,
}: AreasToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="font-medium">Directorio de áreas</h2>
        <p className="text-xs text-muted-foreground">
          Filtra y administra la estructura organizacional.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as AreaStatusFilter)}
        >
          <SelectTrigger className="w-44" aria-label="Filtrar por estado">
            <SelectValue>{statusLabels[status]}</SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            {Object.entries(statusLabels).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          aria-label="Actualizar áreas"
          disabled={isRefreshing}
          onClick={onRefresh}
          size="icon"
          variant="outline"
        >
          <RefreshCw aria-hidden className={isRefreshing ? 'animate-spin' : ''} />
        </Button>
      </div>
    </div>
  )
}
