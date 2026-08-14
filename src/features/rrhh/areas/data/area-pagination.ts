import type { AreaPageLimit } from '../types/area.types'

/** Opciones de tamaño permitidas para una pagina de areas. */
export const AREA_PAGE_LIMIT_OPTIONS: readonly AreaPageLimit[] = [
  10,
  25,
  50,
  100,
]

export const DEFAULT_AREA_PAGE_LIMIT: AreaPageLimit = 10
