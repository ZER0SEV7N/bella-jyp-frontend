import { RefreshCw } from 'lucide-react'
import type { CargoAreaOption, CargoStatusFilter } from '../types/cargo.types'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

type CargosToolbarProps = {
  areas: CargoAreaOption[]
  areaId?: string
  isRefreshing: boolean
  onAreaChange: (areaId?: string) => void
  onRefresh: () => void
  onStatusChange: (status: CargoStatusFilter) => void
  status: CargoStatusFilter
}
const statusLabels: Record<CargoStatusFilter, string> = {
  all: 'Todos los cargos',
  active: 'Cargos activos',
  inactive: 'Cargos inactivos',
}

/** Agrupa los filtros que se envían al endpoint de listado de cargos. */
export function CargosToolbar({
  areas,
  areaId,
  isRefreshing,
  onAreaChange,
  onRefresh,
  onStatusChange,
  status,
}: CargosToolbarProps) {
  return (
    <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className="font-medium">Directorio de cargos</h2>
        <p className="text-xs text-muted-foreground">
          Filtra y administra los puestos registrados.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Select
          value={areaId ?? 'all'}
          onValueChange={(value) =>
            onAreaChange(value === 'all' ? undefined : (value ?? undefined))
          }
        >
          <SelectTrigger aria-label="Filtrar por área" className="w-44">
            <SelectValue>
              {areaId
                ? (areas.find((area) => area.id === areaId)?.nombre ??
                  'Área seleccionada')
                : 'Todas las áreas'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent align="end">
            <SelectItem value="all">Todas las áreas</SelectItem>
            {areas.map((area) => (
              <SelectItem key={area.id} value={area.id}>
                {area.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={status}
          onValueChange={(value) => onStatusChange(value as CargoStatusFilter)}
        >
          <SelectTrigger aria-label="Filtrar por estado" className="w-44">
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
          aria-label="Actualizar cargos"
          disabled={isRefreshing}
          onClick={onRefresh}
          size="icon"
          variant="outline"
        >
          <RefreshCw
            aria-hidden
            className={isRefreshing ? 'animate-spin' : ''}
          />
        </Button>
      </div>
    </div>
  )
}
