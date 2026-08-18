import type { CargoPageLimit, CargoStatusFilter } from './cargo.types'

/** Estado serializado en la URL de la página. */
export type CargosSearchParamsState = {
  limit: CargoPageLimit
  page: number
  status: CargoStatusFilter
  areaId?: string
}
