import { AREA_PAGE_LIMIT_OPTIONS, DEFAULT_AREA_PAGE_LIMIT } from '../data/area-pagination'
import type { AreaPageLimit, AreaStatusFilter } from '../types/area.types'
import type { AreasSearchParamsState } from '../types/areas-page.types'
import { readPaginatedListParams, writePaginatedListParams } from '@/shared/lib/search-params/paginated-list'

type ReadableSearchParams = Pick<URLSearchParams, 'get'>

/**
 * Convierte los query params de la ruta en valores seguros para la interfaz.
 *
 * @param searchParams - Parametros actuales de la URL.
 * @returns Filtros y paginacion normalizados con valores predeterminados.
 */
export function parseAreasSearchParams(
  searchParams: ReadableSearchParams,
): AreasSearchParamsState {
  return readPaginatedListParams(
    searchParams,
    AREA_PAGE_LIMIT_OPTIONS,
    DEFAULT_AREA_PAGE_LIMIT,
  ) as { limit: AreaPageLimit; page: number; status: AreaStatusFilter }
}

/**
 * Construye una URL canonica conservando parametros ajenos al modulo.
 *
 * @param currentSearchParams - Query string existente.
 * @param state - Valores normalizados que deben representarse en la URL.
 * @returns Query string actualizado sin el caracter inicial `?`.
 */
export function buildAreasSearchParams(
  currentSearchParams: string,
  state: AreasSearchParamsState,
) {
  return writePaginatedListParams(currentSearchParams, state).toString()
}
