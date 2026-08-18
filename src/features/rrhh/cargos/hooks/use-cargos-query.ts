import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { cargoQueryKeys } from '../data/cargo-query-keys'
import { cargoService } from '../services/cargo.service'
import type { CargoQuery } from '../types/cargo.types'

/** Obtiene la página de cargos conservando la anterior durante la recarga. */
export function useCargosQuery(query: CargoQuery) {
  return useQuery({
    queryKey: cargoQueryKeys.list(query),
    queryFn: () => cargoService.list(query),
    placeholderData: keepPreviousData,
  })
}
