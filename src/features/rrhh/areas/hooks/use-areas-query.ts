import { keepPreviousData, useQuery } from '@tanstack/react-query'

import { areaQueryKeys } from '../data/area-query-keys'
import { areaService } from '../services/area.service'
import type { AreaQuery } from '../types/area.types'

/**
 * Obtiene una pagina de areas y administra su cache con TanStack Query.
 *
 * Conserva temporalmente la pagina anterior mientras carga una nueva para
 * evitar que la tabla quede vacia durante cambios de filtros o paginacion.
 *
 * @param query - Paginacion y filtro de estado enviados como query params.
 * @returns Estado de la consulta, datos, errores y funcion de recarga.
 */
export function useAreasQuery(query: AreaQuery) {
  return useQuery({
    queryKey: areaQueryKeys.list(query),
    queryFn: () => areaService.list(query),
    placeholderData: keepPreviousData,
  })
}
