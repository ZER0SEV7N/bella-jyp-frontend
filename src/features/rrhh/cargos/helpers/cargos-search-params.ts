import {
  CARGO_PAGE_LIMIT_OPTIONS,
  DEFAULT_CARGO_PAGE_LIMIT,
} from '../data/cargo-pagination'
import type { CargoPageLimit, CargoStatusFilter } from '../types/cargo.types'
import type { CargosSearchParamsState } from '../types/cargos-page.types'
import {
  readPaginatedListParams,
  writePaginatedListParams,
} from '@/shared/lib/search-params/paginated-list'

type ReadableSearchParams = Pick<URLSearchParams, 'get'>

/** Convierte la URL en filtros seguros para la vista de cargos. */
export function parseCargosSearchParams(
  searchParams: ReadableSearchParams,
): CargosSearchParamsState {
  const commonParams = readPaginatedListParams(
    searchParams,
    CARGO_PAGE_LIMIT_OPTIONS,
    DEFAULT_CARGO_PAGE_LIMIT,
  ) as { limit: CargoPageLimit; page: number; status: CargoStatusFilter }

  return { ...commonParams, areaId: searchParams.get('area') || undefined }
}

/** Construye la query canónica y conserva parámetros ajenos a la feature. */
export function buildCargosSearchParams(
  currentSearchParams: string,
  state: CargosSearchParamsState,
) {
  const params = writePaginatedListParams(currentSearchParams, state)
  if (state.areaId) params.set('area', state.areaId)
  else params.delete('area')
  return params.toString()
}
