import { useQuery } from '@tanstack/react-query'
import { cargoQueryKeys } from '../data/cargo-query-keys'
import { cargoService } from '../services/cargo.service'

/** Carga las áreas activas requeridas para filtrar y registrar cargos. */
export function useCargoAreasQuery() {
  return useQuery({
    queryKey: cargoQueryKeys.areas(),
    queryFn: cargoService.listActiveAreas,
  })
}
