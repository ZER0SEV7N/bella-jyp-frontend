import type { AreaQuery } from '../types/area.types'

export const areaQueryKeys = {
  all: ['rrhh', 'areas'] as const,
  list: (query: AreaQuery) => [...areaQueryKeys.all, 'list', query] as const,
}
