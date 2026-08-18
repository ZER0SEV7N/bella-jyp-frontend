import type { CargoQuery } from '../types/cargo.types'

/** Claves de caché aisladas para consultas y mutaciones de cargos. */
export const cargoQueryKeys = {
  all: ['rrhh', 'cargos'] as const,
  areas: () => [...cargoQueryKeys.all, 'active-areas'] as const,
  list: (query: CargoQuery) => [...cargoQueryKeys.all, 'list', query] as const,
}
