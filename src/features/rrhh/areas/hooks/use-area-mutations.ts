import { useMutation, useQueryClient } from '@tanstack/react-query'

import { areaQueryKeys } from '../data/area-query-keys'
import { areaService } from '../services/area.service'
import type { UpdateAreaPayload } from '../types/area.types'

/**
 * Agrupa las operaciones que modifican areas mediante TanStack Query.
 *
 * Cada mutacion invalida el listado completo para sincronizar todas las
 * combinaciones de filtros y paginacion almacenadas en cache.
 *
 * @returns Mutaciones para crear, actualizar, desactivar y reactivar areas.
 */
export function useAreaMutations() {
  const queryClient = useQueryClient()

  //Sincroniza todas las variantes de filtros y paginacion despues de mutar.
  function refreshAreas() {
    return queryClient.invalidateQueries({ queryKey: areaQueryKeys.all })
  }

  const createArea = useMutation({
    mutationFn: areaService.create,
    onSuccess: refreshAreas,
  })

  const updateArea = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAreaPayload }) =>
      areaService.update(id, payload),
    onSuccess: refreshAreas,
  })

  const deactivateArea = useMutation({
    mutationFn: areaService.deactivate,
    onSuccess: refreshAreas,
  })

  const reactivateArea = useMutation({
    mutationFn: areaService.reactivate,
    onSuccess: refreshAreas,
  })

  return {
    createArea,
    updateArea,
    deactivateArea,
    reactivateArea,
  }
}
