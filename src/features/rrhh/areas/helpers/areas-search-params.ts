import {
  AREA_PAGE_LIMIT_OPTIONS,
  DEFAULT_AREA_PAGE_LIMIT,
} from '../data/area-pagination'
import type { AreaPageLimit, AreaStatusFilter } from '../types/area.types'
import type { AreasSearchParamsState } from '../types/areas-page.types'

type ReadableSearchParams = Pick<URLSearchParams, 'get'>

function parsePage(value: string | null) {
  const page = Number(value)

  return Number.isInteger(page) && page > 0 ? page : 1
}

function parseLimit(value: string | null): AreaPageLimit {
  const limit = Number(value)

  return AREA_PAGE_LIMIT_OPTIONS.includes(limit as AreaPageLimit)
    ? (limit as AreaPageLimit)
    : DEFAULT_AREA_PAGE_LIMIT
}

function parseStatus(value: string | null): AreaStatusFilter {
  if (value === 'true') return 'active'
  if (value === 'false') return 'inactive'

  return 'all'
}

/**
 * Convierte los query params de la ruta en valores seguros para la interfaz.
 *
 * @param searchParams - Parametros actuales de la URL.
 * @returns Filtros y paginacion normalizados con valores predeterminados.
 */
export function parseAreasSearchParams(
  searchParams: ReadableSearchParams,
): AreasSearchParamsState {
  return {
    limit: parseLimit(searchParams.get('limit')),
    page: parsePage(searchParams.get('page')),
    status: parseStatus(searchParams.get('active')),
  }
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
  const params = new URLSearchParams(currentSearchParams)
  const active =
    state.status === 'all' ? 'all' : state.status === 'active' ? 'true' : 'false'

  params.set('page', String(state.page))
  params.set('active', active)
  params.set('limit', String(state.limit))

  return params.toString()
}
