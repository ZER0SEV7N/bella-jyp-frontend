import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cargoQueryKeys } from '../data/cargo-query-keys'
import { cargoService } from '../services/cargo.service'
import type { UpdateCargoPayload } from '../types/cargo.types'

/** Agrupa mutaciones de cargos e invalida todas sus vistas en caché. */
export function useCargoMutations() {
  const queryClient = useQueryClient()
  function refreshCargos() {
    return queryClient.invalidateQueries({ queryKey: cargoQueryKeys.all })
  }

  return {
    createCargo: useMutation({
      mutationFn: cargoService.create,
      onSuccess: refreshCargos,
    }),
    updateCargo: useMutation({
      mutationFn: ({
        id,
        payload,
      }: {
        id: string
        payload: UpdateCargoPayload
      }) => cargoService.update(id, payload),
      onSuccess: refreshCargos,
    }),
    deactivateCargo: useMutation({
      mutationFn: cargoService.deactivate,
      onSuccess: refreshCargos,
    }),
    reactivateCargo: useMutation({
      mutationFn: cargoService.reactivate,
      onSuccess: refreshCargos,
    }),
  }
}
