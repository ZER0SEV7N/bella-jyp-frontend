import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

type ServerPaginationProps = {
  pageSize: number
  pageSizeOptions: readonly number[]
  page: number
  total: number
  totalPages: number
  singularLabel: string
  pluralLabel: string
  onPageSizeChange: (pageSize: number) => void
  onPageChange: (page: number) => void
}

/** Proporciona los controles para un listado paginado por el servidor. */
export function ServerPagination({
  pageSize,
  pageSizeOptions,
  page,
  total,
  totalPages,
  singularLabel,
  pluralLabel,
  onPageSizeChange,
  onPageChange,
}: ServerPaginationProps) {
  const visiblePage = Math.min(page, Math.max(totalPages, 1))
  const visibleTotalPages = Math.max(totalPages, 1)

  return (
    <footer className="flex flex-col gap-3 border-t p-4 text-sm sm:flex-row sm:items-center sm:justify-between">
      <p className="text-muted-foreground">
        {total} {total === 1 ? singularLabel : pluralLabel}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-3 sm:justify-end">
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">
            Filas por página
          </span>
          <Select
            value={String(pageSize)}
            onValueChange={(value) => onPageSizeChange(Number(value))}
          >
            <SelectTrigger aria-label="Filas por página" className="h-8 w-20">
              <SelectValue>{pageSize}</SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              {pageSizeOptions.map((option) => (
                <SelectItem key={option} value={String(option)}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <span className="text-xs text-muted-foreground">
          Página {visiblePage} de {visibleTotalPages}
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
