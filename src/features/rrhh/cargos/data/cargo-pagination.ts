import type { CargoPageLimit } from '../types/cargo.types'

export const CARGO_PAGE_LIMIT_OPTIONS: readonly CargoPageLimit[] = [
  10, 25, 50, 100,
]
export const DEFAULT_CARGO_PAGE_LIMIT: CargoPageLimit = 10
