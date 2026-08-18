import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CARGO_PAGE_LIMIT_OPTIONS } from '../data/cargo-pagination'
import type { CargoPageLimit } from '../types/cargo.types'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

type CargosPaginationProps = {
  limit: CargoPageLimit
  page: number
  total: number
  totalPages: number
  onLimitChange: (limit: CargoPageLimit) => void
  onPageChange: (page: number) => void
}

/** Navegación controlada de la paginación resuelta en el servidor. */
export function CargosPagination({
  limit,
  page,
  total,
  totalPages,
  onLimitChange,
  onPageChange,
}: CargosPaginationProps) {
  return (
    <footer className="flex flex-col gap-3 border-t p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground">
        {total} {total === 1 ? 'cargo registrado' : 'cargos registrados'}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Filas por página
          </span>
          <Select
            value={String(limit)}
            onValueChange={(value) =>
              onLimitChange(Number(value) as CargoPageLimit)
            }
          >
            <SelectTrigger aria-label="Filas por página" className="h-8 w-20">
              <SelectValue>{limit}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              {CARGO_PAGE_LIMIT_OPTIONS.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          Página {Math.min(page, Math.max(totalPages, 1))} de{' '}
          {Math.max(totalPages, 1)}
        </span>
        <Button
          aria-label="Página anterior"
          disabled={page <= 1}
          onClick={() => onPageChange(page - 1)}
          size="icon-sm"
          variant="outline"
        >
          <ChevronLeft aria-hidden />
        </Button>
        <Button
          aria-label="Página siguiente"
          disabled={page >= totalPages || totalPages === 0}
          onClick={() => onPageChange(page + 1)}
          size="icon-sm"
          variant="outline"
        >
          <ChevronRight aria-hidden />
        </Button>
      </div>
    </footer>
  )
}
