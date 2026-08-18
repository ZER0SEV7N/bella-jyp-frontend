import {
  CARGO_PAGE_LIMIT_OPTIONS,
  DEFAULT_CARGO_PAGE_LIMIT,
} from '../data/cargo-pagination'
import type { CargoPageLimit, CargoStatusFilter } from '../types/cargo.types'
import type { CargosSearchParamsState } from '../types/cargos-page.types'

type ReadableSearchParams = Pick<URLSearchParams, 'get'>

function parsePage(value: string | null) {
  const page = Number(value)
  return Number.isInteger(page) && page > 0 ? page : 1
}

function parseLimit(value: string | null): CargoPageLimit {
  const limit = Number(value)
  return CARGO_PAGE_LIMIT_OPTIONS.includes(limit as CargoPageLimit)
    ? (limit as CargoPageLimit)
    : DEFAULT_CARGO_PAGE_LIMIT
}

function parseStatus(value: string | null): CargoStatusFilter {
  if (value === 'true') return 'active'
  if (value === 'false') return 'inactive'
  return 'all'
}

/** Convierte la URL en filtros seguros para la vista de cargos. */
export function parseCargosSearchParams(
  searchParams: ReadableSearchParams,
): CargosSearchParamsState {
  const areaId = searchParams.get('area') || undefined
  return {
    areaId,
    limit: parseLimit(searchParams.get('limit')),
    page: parsePage(searchParams.get('page')),
    status: parseStatus(searchParams.get('active')),
  }
}

/** Construye la query canónica y conserva parámetros ajenos a la feature. */
export function buildCargosSearchParams(
  currentSearchParams: string,
  state: CargosSearchParamsState,
) {
  const params = new URLSearchParams(currentSearchParams)
  params.set('page', String(state.page))
  params.set('limit', String(state.limit))
  params.set(
    'active',
    state.status === 'all'
      ? 'all'
      : state.status === 'active'
        ? 'true'
        : 'false',
  )
  if (state.areaId) params.set('area', state.areaId)
  else params.delete('area')
  return params.toString()
}
