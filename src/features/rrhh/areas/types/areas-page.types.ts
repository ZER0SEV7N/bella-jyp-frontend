import type { AreaPageLimit, AreaStatusFilter } from './area.types'

/**
 * Filtros y paginacion representados en la URL de la pagina.
 */
export type AreasSearchParamsState = {
  limit: AreaPageLimit
  page: number
  status: AreaStatusFilter
}
